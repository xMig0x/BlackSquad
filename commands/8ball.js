const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


  if(!args[2]) return message.channel.send("Te rog pune o intrebare!");
  let replies = ["Da.", "Nu.", "Poate", "Habar nu am"];

  let result = Math.floor((Math.random() * replies.length));
  let question = args.slice(0).join(" ");

  let ballembed = new Discord.RichEmbed()
  .setAuthor(message.author.tag)
  .setColor("#E2F6F7")
  .addField("Intrebare", question)
  .addField("Raspuns", replies[result])

  message.channel.send(ballembed);



}

module.exports.help = {
  name: "8ball"
}
