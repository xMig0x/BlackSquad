const Discord = require("discord.js");
const ms = require("ms");
const botconfig = require("../botconfig.json");
const red = botconfig.red;
const green = botconfig.green;
const orange = botconfig.orange;
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {


  if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
  if(args[0] == "help"){
    message.channel.send(" > • Foloseste: !mute <user>  <1s/m/h/d>");
    return;
  }
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply(" • Nu pot gasi membrul");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("**• Nu pot acorda mute acestui membru**");
  let reason = args.slice(2).join(" ");
  if(!reason) return message.reply("• Nu poti acorda mute fara un motiv.");

  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "BlackSquadMuted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("• Nu ai specificat un timp!");

  message.delete().catch(O_o=>{});

  try{
    await tomute.send(`Salut ai primit mute ${mutetime}. Scuze.`)
  }catch(e){
    message.channel.send( ` > • ${tomute} a primit mute ${mutetime}.`)
  }

  let muteembed = new Discord.RichEmbed()
  .setDescription(`• Acordat de ${message.author}`)
  .setColor(orange)
  .addField("• Muted User", tomute)
  .addField("• Muted in", message.channel)
  .addField("• Time", message.createdAt)
  .addField("• Length", mutetime)
  .addField("• Reason", reason);

  let incidentschannel = message.guild.channels.find(`name`, "logs");
  if(!incidentschannel) return message.reply("Please create a incidents channel first!");
  incidentschannel.send(muteembed);

  await(tomute.addRole(muterole.id));

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> a primit unmute`);
  }, ms(mutetime));


//end of module
}

module.exports.help = {
  name: "mute"
}
