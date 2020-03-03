const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot,message,args) => {

  let {body} = await superagent
  .get(`https://random.dog/woof.json`);

  let dogembed = new Discord.RichEmbed()
  .setColor("#E2F6F7")
  .setTitle("Doggo :dog:")
  .setImage(body.url);

  message.channel.send(dogembed)

}

module.exports.help = {
  name: "dog"
}
