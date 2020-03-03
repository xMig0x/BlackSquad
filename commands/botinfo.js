const Discord = require("discord.js");
const moment = require('moment');

module.exports.run = async (bot, message, args) => {
	let bicon = bot.user.displayAvatarURL;
    const ce = new Discord.RichEmbed()
    ce.setTitle("Informatii despre mine")
    ce.setColor("#E2F6F7")
    ce.setThumbnail(bicon)
    ce.addField("• Numele meu:", bot.user.username)
    ce.addField('• Data creari:', `${moment.utc(bot.user.createdAt).format('``d/M/Y, HH:mm:ss``')}`, true)
    ce.addField("• Creatorul meu:", "pain#0510");
    ce.setTimestamp()

      message.channel.send(ce)
    return;
  }


module.exports.help = {
	name: "botinfo"
}
