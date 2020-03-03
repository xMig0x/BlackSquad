const { RichEmbed } = require('discord.js');
const Discord = require('discord.js');
exports.run = (client, message, args) => {
  if (message.channel.type === "dm") return
  const ce = new Discord.RichEmbed()
  ce.setDescription('• Vezi cu cine te potrivesti!')
  ce.setColor(`#E2F6F7`);
  ce.setTimestamp()
  if (!args.join(' ')) return message.channel.send(ce)
  const ship = [
' 5% slab rau :cry:',
' 15% slabut',
' 25% binee..',
' 40% super bine',
' 50% :yum:',
' 70% Foarte bine',
' 99,99% :point_right::ok_hand: '

  ];

  ce.setColor('#' + ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6))
    .setTimestamp()
  ce.setDescription(`${message.author.username} + ` + args.join(" ") + ` = ` + ship[Math.floor(Math.random() * ship.length)])
  message.channel.send(ce)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ship',
};
