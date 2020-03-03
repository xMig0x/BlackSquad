const Discord = module.require('discord.js');
const moment = require('moment');

module.exports.run = async (bot, message, args) => {

    let member = message.mentions.members.first() || message.member,
        user = member.user;
    const joinDiscord = moment(user.createdAt).format('llll');
    const joinServer = moment(user.joinedAt).format('llll');
    let embed = new Discord.RichEmbed()
        .setAuthor(user.username + '#' + user.discriminator, user.displayAvatarURL)
        .setDescription(`${user}`)
        .setColor(`#E2F6F7`)
        .setThumbnail(`${user.displayAvatarURL}`)
        .addField('• Data intrari:', `${moment.utc(user.joinedAt).format('``d/M/Y, HH:mm:ss``')}`, true)
        .addField('• Status:', user.presence.status, true)
        .addField('• Data creari:', `${moment.utc(user.createdAt).format('``d/M/Y, HH:mm:ss``')}`, true)
        .addField('• Grade:', member.roles.map(r => `${r}`).join(' | '), true)
        .setFooter(`• ID: ${user.id}`)
        .setTimestamp();

    message.channel.send({ embed: embed });
    return;
}

module.exports.help = {
    name: 'userinfo'
}
