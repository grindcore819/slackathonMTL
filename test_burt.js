var os = require('os');
if(os.platform()==='win32'){
	process.env.token = "xoxb-48233867618-qWWB0rScKHF6JCL4A0xay3Tt"	
}

if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

var Botkit = require('./lib/Botkit.js');

var controller = Botkit.slackbot({
    debug: true,
});

var bot = controller.spawn({
    token: process.env.token
}).startRTM();

controller.hears('(.*)prendre une marche avec(.*)', 'direct_message', function(bot, message){
    //Définir ce que l'on fait si 
    bot.startConversation(message, function(err, convo) {
        if (!err) {
            //TODO : pick a random user
            convo.ask("VPRENDRE UNE MARCHE AVEC !!! YEAH", [
            {
                pattern : 'oui',
                callback : function(response, convo){
                    //TODO : Call back si quelqu'un dit oui
                    controller.storage.users.get(message.user, function(err, user) {
                        bot.user.list[0];
                    });
                    convo.next();
                }
            },
            {
                pattern: 'non',
                callback: function(response, convo) {
                    //TODO : Callback si quelqu'un dit non
                    convoo.next();
                }
            },
            {
                default: true,
                callback: function(response, convo) {
                    //TODO : CallBack si quelqu'un dit de quoi qui n'a pas rapport
                }
            }
            ]);
        };
    });
});

controller.hears('hey', 'direct_message', function(bot, message){
	bot.startConversation(message, function(err, convo) {
        console.log("haha");
		if (!err) {
			//TODO : pick a random user
			convo.ask("Voullez-vous choisir avec qui prendre une marche?", [
			{
				pattern : 'oui',
				callback : function(response, convo){
					//TODO : Call back si quelqu'un dit oui
					controller.storage.users.get(message.user, function(err, user) {
						if (user && user.name) {
							bot.reply(message, 'Hello ' + user.name + '!!');
						} else{
							bot.reply(message, 'Hello.');
						}
					});
					convo.next();
				}
			},
			{
				pattern: 'non',
				callback: function(response, convo) {
					//TODO : Callback si quelqu'un dit non
					convoo.next();
				}
			},
			{
				default: true,
				callback: function(response, convo) {
					//TODO : CallBack si quelqu'un dit de quoi qui n'a pas rapport
				}
			}
			]);
		};
	});
});




controller.hears(['shutdown'], 'direct_message,direct_mention,mention', function(bot, message) {

    bot.startConversation(message, function(err, convo) {

        convo.ask('Are you sure you want me to shutdown?', [
            {
                pattern: bot.utterances.yes,
                callback: function(response, convo) {
                    convo.say('Bye!');
                    convo.next();
                    setTimeout(function() {
                        process.exit();
                    }, 3000);
                }
            },
        {
            pattern: bot.utterances.no,
            default: true,
            callback: function(response, convo) {
                convo.say('*Phew!*');
                convo.next();
            }
        }
        ]);
    });
});

controller.hears(['uptime', 'identify yourself', 'who are you', 'what is your name'],'direct_message,direct_mention,mention', function(bot, message) {
	var hostname = os.hostname();
	var uptime = formatUptime(process.uptime());

	bot.reply(message,':robot_face: I am a bot named <@' + bot.identity.name +'>. I have been running for ' + uptime + ' on ' + hostname + '.');
});

function formatUptime(uptime) {
    var unit = 'second';
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'minute';
    }
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'hour';
    }
    if (uptime != 1) {
        unit = unit + 's';
    }

    uptime = uptime + ' ' + unit;
    return uptime;
}