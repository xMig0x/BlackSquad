const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let member = message.mentions.members.first() || message.member,
      user = member.user;
  let helpembed = new Discord.RichEmbed()
  .setColor("#E2F6F7")
  .setDescription(" • Help comenzi")
  .addField("• Comenzi membru 1/2 ", "help, serverinfo, botinfo, 8ball, cat, hug, slap")
  .addField("• Comenzi membru 2/2 " , " kiss , meme, dog, report, avatar, userinfo, ship")
  .addField("Informatii", "Foloseste <comanda> help")
  .setFooter(` » © BlackSquad `)
  .setTimestamp();

  message.channel.send(helpembed);
  if(message.member.hasPermission("MANAGE_MESSAGES")){
  let modembed = new Discord.RichEmbed()
  .setColor("#E2F6F7")
  .setDescription("Meniu comenzi moderator")
  .addField("Comenzi moderator", "ban, kick, tempmute, say, addrole, removerole, clear")
  .setFooter(`» © BlackSquad`)
  .setTimestamp();

  try{
    await message.author.send(modembed);
    message.react("🛡️");
  }catch(e){
    message.reply("Mesajele tale sunt blocate , nu iti pot trimite comenzile");
  }
}



}

module.exports.help = {
	name: "help"
}
