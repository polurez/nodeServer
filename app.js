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


    /*if (data.type == "desktop_notification") {

        if (data.subtitle == "#general") {

            console.log(data.content.replace(/(.*): @(\w)+( )+/g, ""));
            //console.log(data.subtitle);
            
            let name =data.content.match(/(\w).+(?=:)/i);
            console.log(name[0]);
        } else {

            console.log(data.content);
        }
    }*/

    if (data.type == "desktop_notification") {
        if (data.subtitle == "#general") {

            let content = data.content.replace(/(.*): @(\w)+( )+/g, "");
            let name = data.content.match(/.*(?=:)/);
            var messageForBot = {
                content: content,
                from: name[0]
            }
        } else {

            var messageForBot = {
                content: data.content,
                from: data.subtitle
            }
        }

        mongoClient.connect(url, function (err, db) {

            db.collection("messagesForBot").insertOne(messageForBot, function (err, results) {

                console.log(results);
                db.close();
            });
        });
    }
});