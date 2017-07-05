var slackbot = require('slackbots');
var mongoClient = require("mongodb").MongoClient;

var bot_token = require('./config').bot.bot_token;
var bot_name = require('./config').bot.bot_name;
var url = require('./config').url;

// create a bot 
var bot = new slackbot({
    token: bot_token,
    name: bot_name
});
// event message
bot.on('message', function (data) {

    if ((data.type == "desktop_notification") && (data.channel == "D64FK5YQ7")) {
        var messageForBot = {
            content: data.content,
            from: data.subtitle
        }

        mongoClient.connect(url, function (err, db) {

            db.collection("messagesForBot").insertOne(messageForBot, function (err, results) {

                console.log(results);
                db.close();
            });
        });
    }
});