Helps Remind You When New Versions of Linux Distributions are Released to Torrent.

****The Values in JSON Files are Placeholders. Do NOT delete these values. They will be automatically Replaced.****  

****SETUP****

Get Your Number, AuthID, and authToken from Twilio here: https://www.twilio.com/

Instructions for the Usage of the Twilio NPM Package can be found here: https://www.twilio.com/docs/libraries/node

If using the full version you MUST install mongoDB. You can install it here: https://www.mongodb.com/what-is-mongodb

****RUNNING IT****

To use Torrentr just run `npm install pm2@latest -g`, `npm install` and then, depending on which version you are using, run `pm2 start app.config.json` or `pm2 start pi.config.json` in the project directory.

There are two versions of torrentr. The main version uses mongoDB and the pi version just uses a JSON file to store values. The difference between the two versions is the pi version's webserver isn't password protected and the webserver doesn't fetch stored credentials to be served to the user. 


****EXAMPLE TEXT****

![alt text](https://raw.githubusercontent.com/theREALaltoid/torrentr/master/MSG-EXAMPLE.jpeg)

****CONTRIBUTING****

Just make a fork with the changes. :) 
Torrentr uses Parcel to bundle code.  
