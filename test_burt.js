var os = require('os');
if(os.platform()==='win32'){
	process.env.token = "xoxb-48233867618-qWWB0rScKHF6JCL4A0xay3Tt"	
}

if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

var Botkit = require('./lib/Botkit.js');
var users_willing = new Array();
var controller = Botkit.slackbot({
    debug: true,
});

var bot = controller.spawn({
    token: process.env.token
}).startRTM();
var options = {"token":"xoxp-39289615190-48212099589-48228313555-5cc7c4a171"};

console.log(controller.trigger);

//bot.api.users.list;
//console.log(bot.api);
controller.on("presence_change", function(err, message){
	if(message.presence === 'active'){
		bot.startPrivateConversation(message, function(err, convo){
			if(!err){
				convo.ask("Souhaiteriez vous aller prendre une marche aujourd'hui?", [
				{
					pattern : "oui",
					callback : function(response, convo){
						users_willing[response.user] = "oui";
						convo.next();
					}
				},
				{
					pattern : "non",
					callback : function(response,convo){
						
						users_willing[response.user] = "non";
						convo.next();
					}
				},
				{
					default : true,
					callback : function(response, convo){
						convo.repeat();
						convo.next();
					}
				}
				]);
				console.log(users_willing);
			}
		});
	}
});
controller.hears('(.*)prendre une marche avec(.*)', 'direct_message,direct_mention,mention', function(bot, message){
    // Get le user qui envoie la demande pour marcher 
    var userSender = message.user;

    // Get le user qui se fait demander d'aller marcher 
    var userReceiver = message.match[2];

    // Change le user à recevoir un message 
    message.user=userReceiver.replace(/<|\ |@|>/g,"");



    bot.startConversation(message, function(err, convo) {
        if (!err) {
            //TODO : Envoyer un message privé à l'utilisateur pour lui demander s'il est disponible 
                bot.startPrivateConversation(message, function(err, convo) {
                if (!err) {
                    convo.ask("Veux-tu aller prendre une marche avec <@" + userSender + "> ?" , [
                    {
                        pattern : 'oui',
                        callback : function(response, convo){
                            // Robot confirme le match au sender : receiver a accepté la marche
							console.log(response);
                            var message2 = message; 
                            message2.user = userSender;
                            bot.startPrivateConversation(message,function(err,convo) {
                                convo.say( + userReceiver + " a dit oui. :)");
                                convo.next();
                            });
                        }
                    },
                    {
                        pattern: 'non',
                        callback: function(response, convo) {
                            // Robot confirme le match au sender : receiver a refusé la marche
                            message.user=userSender;
                            bot.startPrivateConversation(message,function(err,convo) {
                                convo.say("<@" + userReceiver + "> a dit non. :(");
                                convo.next();
                            });
                        }
                    },
                    {
                        default: true,
                        callback: function(response, convo) {
                            //TODO : CallBack si quelqu'un dit de quoi qui n'a pas rapport
                            convo.say("Je n'ai pas compris.");
                            //convo.repeat();
                            convo.next();
                        }
                    }

                    ]);
					convo.next();
                }
            });
        };
    });
});

controller.hears('(.*)prendre une marche', 'direct_message', function(bot, message){
	bot.startConversation(message, function(err, convo) {
        console.log(" aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
		if (!err) {
			//TODO : pick a random user
			convo.ask("Voulez-vous prendre une marche avec quelqu'un?", [
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
					convo.next();
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