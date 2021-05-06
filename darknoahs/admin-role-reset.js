const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');
module.exports.run = async (dark, message, args) => {
  if(message.author.id !== message.guild.owner.user.id) return message.reply('❌ You must be ** Server Owner ** to use this command!')
  let prefix = "!"
 db.delete(`westrabotlistyetkilirol_${message.guild.id}`);
  message.channel.send(`✅ Botlist officer role successfully reset!`)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'botlist-authority-role-reset', 
  description: "Refuses the bot added to the server.",
  usage: 'botreddet <bot name> - <reason>'
};