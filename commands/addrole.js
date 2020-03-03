const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

  //!addrole @andrew Dog Person
  if (!message.member.hasPermission("MANAGE_ROLES")) return errors.noPerms(message, "MANAGE_ROLES");
  if (args[0] == "help") {
    message.reply("> • Foloseste: !addrole <user> <role>");
    return;
  }
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!rMember) return errors.cantfindUser(message.channel);
  let role = args.join(" ").slice(22);
  if (!role) return message.reply("• Pune un role");
  let gRole = message.guild.roles.find(`name`, role);
  if (!gRole) return message.reply("• Acest grad nu exista");

  if (rMember.roles.has(gRole.id)) return message.reply("Membrul are deja acest grad");
  await (rMember.addRole(gRole.id));

  try {
    await rMember.send(`• Felicitari , ai primit gradul ${gRole.name}`)
  } catch (e) {
    console.log(e.stack);
    message.channel.send(`• Felicitari <@${rMember.id}>, ai primit gradul de ${gRole.name}`)
  }
}

module.exports.help = {
  name: "addrole"
}
