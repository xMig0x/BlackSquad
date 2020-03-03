const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	let online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
  let day = message.guild.createdAt.getDate()
  let month = 1 + message.guild.createdAt.getMonth()
  let year = message.guild.createdAt.getFullYear()
   let sicon = message.guild.iconURL;
   let serverembed = new Discord.RichEmbed()
   .setAuthor(message.guild.name, sicon)
   .setFooter(`• Serverul creat pe data de : ${day}.${month}.${year}`)
   .setColor("#E2F6F7")
   .setThumbnail(sicon)
   .addField("• Nume", message.guild.name, true)
   .addField("• Owner", message.guild.owner.user.tag, true)
   .addField("• Regiune", message.guild.region, true)
   .addField("• Camere", message.guild.channels.size, true)
   .addField("• Membri", message.guild.memberCount, true)
   .addField("• Oameni", message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size, true)
   .addField("• Boti", message.guild.members.filter(m => m.user.bot).size, true)
   .addField("• Online", online.size, true)
   message.channel.send(serverembed);

   }



module.exports.help = {
	name: "serverinfo"
}
