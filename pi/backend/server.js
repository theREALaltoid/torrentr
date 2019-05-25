const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
var fs = require("fs");
const app = express();
var urls = require("../jsonData/urls");

var settings = require("../jsonData/settings");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.get("/api/urls", function(req, res) {
  res.json(urls);
});

app.patch("/api/urls", function(req, res) {
  fs.writeFile("../jsonData/urls.json", req.body.urlArr, "utf8", function(err) {
    if (err) {
      return console.log(err);
    } else {
      res.status(200);
      console.log("The file was saved!");
    }
  });
});

/*
app.get('/api/settings', function(req, res) {
res.json(settings);
});
*/

app.put("/api/settings", function(req, res) {
  fs.writeFileSync("../jsonData/settings.json", JSON.stringify(req.body));
  res.status(200);
});

app.listen(process.env.PORT || 8080);
