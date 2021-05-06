const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');
module.exports.run = async (dark, message, args) => {
  if(message.author.id !== message.guild.owner.user.id) return message.reply('❌ You must be ** Server Owner ** to use this command!')
  let prefix = "!"
  let rol = message.mentions.roles.first();   
    if (!rol) {
      message.channel.send(`❌ You have to tag a role!`);
      return;
    }
 db.set(`westrabotlistyetkilirol_${message.guild.id}`, rol.id);
  message.channel.send(`✅ Botlist officer role has been successfully set to ${rol} !`)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'set-botlist-authority-role', 
  description: "Refuses the bot added to the server.",
  usage: 'botreddet <bot name> - <reason>'
};