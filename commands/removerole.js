const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("MANAGE_ROLES")) return errors.noPerms(message, "MANAGE_ROLES");
  if(args[0] == "help"){
    message.channel.send("> • Foloseste: !removerole <user> <role>");
    return;
  }
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("• :no_entry:Nu pot gasi membrul");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Spune un grad");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("• :no_entry:Nu pot gasi acest grad");

  if(!rMember.roles.has(gRole.id)) return message.reply("• :no_entry:Membrul nu are acest grad");
  await(rMember.removeRole(gRole.id));

  try{
    await rMember.send(`• ✅ Am scos gradul de ${gRole.name}`)
  }catch(e){
    message.channel.send(`• ✅ Am scos gradul lui <@${rMember.id}>, de ${gRole.name}`)
  }
}

module.exports.help = {
  name: "removerole"
}
