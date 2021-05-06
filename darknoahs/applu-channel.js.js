const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');
module.exports.run = async (dark, message, args) => {
  if(message.author.id !== message.guild.owner.user.id) return message.reply('❌ You must be ** Server Owner ** to use this command!')
  let prefix = "!"
  let kanal = message.mentions.channels.first();
    if (!kanal) {
      message.channel.send(`❌ You have to tag a channel!`);
      return;
    }
 db.set(`westrabasvuruyapılacakkanal_${message.guild.id}`, kanal.id);
  message.channel.send(`✅ The channel to apply is successfully ${kanal} set to!`)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'set-apply-to-channel', 
  description: "Refuses the bot added to the server.",
  usage: 'botreddet <bot name> - <reason>'
};