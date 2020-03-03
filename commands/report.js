const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const red = botconfig.red;
const green = botconfig.green;
const orange = botconfig.orange;
const errors = require("../utils/errors.js");
const moment = require('moment');

module.exports.run = async (bot, message, args) => {
    message.delete();
    if(args[0] == "help"){
      message.channel.send("> • Foloseste: !report <user> <reason>");
    return;
    }
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return errors.cantfindUser(message.channel);
    let rreason = args.join(" ").slice(22);
    if(!rreason) return errors.noReason(message.channel);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor(orange)
    .addField("• Player raportat", `${rUser}`)
    .addField("• Raportat de", `${message.author}`)
    .addField("• Camera", message.channel)
    .addField("• Time", message.createdAt)
    .addField("• Motiv", rreason);

    let reportschannel = message.guild.channels.find(`name`, "logs");
    if(!reportschannel) return message.channel.send("Couldn't find reports channel.");
    reportschannel.send(reportEmbed);

}

module.exports.help = {
  name: "report"
}
