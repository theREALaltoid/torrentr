const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");
const withAuth = require("./middleware");
var fs = require("fs");
const app = express();
var urls = require("../jsonData/urls");
const secret = "mysecretsshhh";
var cookie = require("cookie");
const cookieConfig = {
  httpOnly: true, // to disable accessing cookie via client side js
  //secure: true, // to force https (if you use it)
  maxAge: 1000000000, // ttl in ms (remove this option and cookie will die when browser is closed)
  signed: true, // if you use the secret with cookieParser
  secret: "secret"
};
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser("your-secret"));

const mongo_uri = "mongodb://localhost/react-auth";
mongoose.connect(mongo_uri, { useNewUrlParser: true }, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static(path.join("..", "frontend", "dist")));

app.get("/", function(req, res) {
  res.sendFile(path.join("..", "frontend", "index.html"));
});

app.get("/api/urls", withAuth, function(req, res) {
  res.json(urls.urls[0]);
});

app.patch("/api/urls", withAuth, function(req, res) {
  fs.writeFile("../jsonData/urls.json", req.body.urlArr, "utf8", function(err) {
    if (err) {
      return console.log(err);
    } else {
      res.status(200).send("We're Good");
      console.log("The file was saved!");
    }
  });
});

app.post("/api/register", function(req, res) {
  const { username, password } = req.body;
  console.log(req.body);
  const user = new User({ username, password });
  user.save(function(err) {
    if (err) {
      //  console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).send("Welcome to the club!");
    }
  });
});

app.get("/api/settings", withAuth, function(req, res) {
  User.findById(req.signedCookies.userID).then(user => {
    res.send(user);
  });
});

app.put("/api/settings", function(req, res) {
  User.findByIdAndUpdate(req.signedCookies.userID, { $set: req.body }, function(
    err,
    result
  ) {
    if (err) {
      console.log(err);
    }
  });
  res.sendStatus(200);

  fs.writeFileSync("../jsonData/settings.json", JSON.stringify(req.body));
});

app.post("/api/authenticate", function(req, res) {
  const { username, password } = req.body;
  User.findOne({ username }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal error please try again"
      });
    } else if (!user) {
      res.status(401).json({
        error: "Incorrect username or password"
      });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500).json({
            error: "Internal error please try again"
          });
        } else if (!same) {
          res.status(401).json({
            error: "Incorrect username or password"
          });
        } else {
          // Issue token
          const payload = { username };
          const token = jwt.sign(payload, secret, {
            expiresIn: "1h"
          });

          res.cookie("userID", user._id, cookieConfig);
          res.cookie("token", token, cookieConfig);
          res.sendStatus(200);
        }
      });
    }
  });
});

app.get("/checkToken", withAuth, function(req, res) {
  res.sendStatus(200);
});

app.listen(process.env.PORT || 8080);
