const botconfig = require("./botconfig.json");
const config = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
let coins = require("./coins.json");
let xp = require("./xp.json");
let purple = botconfig.purple;
let cooldown = new Set();
let cdseconds = 5;

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {

  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity("on BlackSquad", {type: "WATCHING"});

});

bot.on("guildMemberAdd", async member => {
  console.log(`${member.id} a intrat pe server.`);

  let welcomechannel = member.guild.channels.find(`name`, "welcome");
  welcomechannel.send(`> • Bun venit ${member} pe BlackSquad. Cu tine suntem ${member.guild.memberCount} membri.`);
});

bot.on("guildMemberRemove", async member => {

  console.log(`${member.id} a iesit de pe server`);

  let welcomechannel = member.guild.channels.find(`name`, "welcome");
  welcomechannel.send(`> • Ne pare rau pentru ca ai plecat ${member}.Fara tine am mai ramas ${member.guild.memberCount} membri.`);
});



bot.on("message", async message => {

if (message.content.includes("https://")) {
  if (!message.member.hasPermission("KICK_MEMBERS")) {
    console.log("deleted " + message.content + " from " + message.author)
    message.delete(1);
    message.channel.sendMessage("Fara reclama, " + message.author)
  }
}
  if (message.content.includes("http://")) {
    if (!message.member.hasPermission("KICK_MEMBERS")) {
    console.log("deleted " + message.content + " from " + message.author)
    message.delete(1);
    message.channel.sendMessage("Fara reclama, " + message.author)
  }
}
  if (message.content.includes("www.")) {
    if (!message.member.hasPermission("KICK_MEMBERS")) {
    console.log("deleted " + message.content + " from " + message.author)
    message.delete(1);
    message.channel.sendMessage("Fara reclama, " + message.author)
  }
}
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    }
  }
  let prefix = prefixes[message.guild.id].prefixes;
  if(!message.content.startsWith(prefix)) return;
  if(cooldown.has(message.author.id)){
    message.delete();
    return message.reply("> • Trebuie sa astepti 5 secunde pt urmatoarea comanda")
    message.delete();
  }
  if(!message.member.hasPermission("ADMINISTRATOR")){
    cooldown.add(message.author.id);
  }
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)

});
bot.on('error', err => {
  console.log(err);
});

bot.login(config.token);