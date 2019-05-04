const request = require("request-promise");
const XmlReader = require("xml-reader");
const xmlQuery = require("xml-query");
var parseString = require("xml2js").parseString;
var schedule = require("node-schedule");
var fs = require("fs");
var urls = require("./../jsonData/urls.json");
var config = require('../jsonData/settings');

schedule.scheduleJob("1 * * * * *", function() {
  var newRelease = [];
  var oldRelease = fs.readFileSync("../jsonData/values.json");
  oldRelease = JSON.parse(oldRelease);
  var textRelease = [];
  const promises = urls.map((url) => request(url));

  Promise.all(promises).then((data) => {
    mainFunction(data);
  });

  var mainFunction = function mainFunction(data) {
    for (var i = 0; i < data.length; i++) {
      parseString(data[i], function(err, result) {
        result = JSON.stringify(result);
        result = JSON.parse(result);
        var foundReleaseInfo = 0;
        var k = 0;
        while (foundReleaseInfo < 1) {
            //Find the New Release Info in the XML Pull
          if (
            result.rss.channel[0].item[k].title[0].includes("Release") ||
            result.rss.channel[0].item[k].title[0].includes("release")
          ) {
            newRelease.push(result.rss.channel[0].item[k].title[0]);
            foundReleaseInfo = 1;
          }
          k++;
        }
      });
    }
    //Send the Text with the New Release Info
    const accountSid = config.AuthID;
    const authToken = config.authToken;

    for (var j = 0; j < newRelease.length; j++) {
      if (oldRelease[j] !== newRelease[j]) {
        const client = require("twilio")(accountSid, authToken, newRelease);
        client.messages
          .create({
            body: newRelease[j],
            from: config.Twilionumber,
            to: config.phoneNumber
          })
          .then((message) => console.log(message.sid));
      }
    }

console.log(config);
    oldRelease = newRelease;
    //Write Our New Values to the Values File
    fs.writeFile("../jsonData/values.json", JSON.stringify(newRelease), (data) => {
      console.log("File has been created");
    });
    newRelease = [];
  };
});
