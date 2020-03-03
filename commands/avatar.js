const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    const user = message.mentions.users.first() || message.author;
    const avatarEmbed = new Discord.RichEmbed()
        .setColor("#E2F6F7")
        .setAuthor(user.username + '#' + user.discriminator)
        .setImage(user.avatarURL);
    message.channel.send(avatarEmbed);
}
module.exports.help = {
	name: "avatar"
}
