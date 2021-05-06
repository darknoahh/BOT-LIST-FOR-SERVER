const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');
module.exports.run = async (dark, message, args) => {
  if(message.author.id !== message.guild.owner.user.id) return message.reply('❌ You must be ** Server Owner ** to use this command!')
  let prefix = "!"
 db.delete(`westrabasvurugidecekkanal_${message.guild.id}`);
  message.channel.send(`✅ The channel to which the application will go has been successfully reset!`)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'reference-go-channel-reset', 
  description: "Refuses the bot added to the server.",
  usage: 'botreddet <bot name> - <reason>'
};