const Discord = require('discord.js');
const db = require('quick.db');


module.exports.run = async (dark, message, args) => {
  let kanal = await db.fetch(`westrabasvuruyapılacakkanal_${message.guild.id}`);
  let kanal2 = await db.fetch(`westrabasvurugidecekkanal_${message.guild.id}`);
  let kanal3 = await db.fetch(`westralogkanal_${message.guild.id}`);
  let westrabasvuruyapılacakkanal = await db.fetch(`westrabasvuruyapılacakkanal_${message.guild.id}`, kanal.id);
  let westrabasvurugidecekkanal = await db.fetch(`westrabasvurugidecekkanal_${message.guild.id}`, kanal2.id);
let westralogkanal = await db.fetch(`westralogkanal_${message.guild.id}`, kanal3.id);

	let botid = args[0]
	let prefix = args[1]
  let onaylımı = args[2]
  let basvuru = westrabasvurugidecekkanal
	let kanald = westrabasvuruyapılacakkanal 
  let log = westralogkanal 
	
  if (message.channel.id !== kanald) return message.channel.send(`✅ This command only <#${kanald}> This command only.`).then(x => x.delete({timeout: 3000}))
	if (message.channel.id == kanald) {
  if (!botid) return message.channel.send(`✅ You have to type in the ID of your bot.`).then(x => x.delete({timeout: 3000}))
  if (!prefix) return message.channel.send(`✅ You have to type in the prefix of your bot.`).then(x => x.delete({timeout: 3000}))
  if (!onaylımı) return message.channel.send(`✅ You should write if your bot is DBL certified.`).then(x => x.delete({timeout: 3000}))
  message.delete()
  const embed = new Discord.MessageEmbed()
  .setColor("Yellow")
  .setDescription(`Trix Botlist New Bot Application!

** -----------------------------------**
**🌟 Bot Owner :**   \`${message.author.tag}\`    ${message.author}   
**-----------------------------------**
**🛠 Bot Owner ID :** \`${message.author.id}\`
** -----------------------------------**
**⚙ Bot ID :** \`${botid}\`
** -----------------------------------**
**✨Prefix :** \`${prefix}\`
** -----------------------------------**
**✅ Is the Bot Approved ? : ** \`${onaylımı}\`
**-----------------------------------**
**🔗 Bot Invite Link :** [**Add**](https://discordapp.com/oauth2/authorize?client_id=${botid}&scope=bot&permissions=0)
** -----------------------------------**
 `)
  dark.channels.cache.get(basvuru).send(embed)
    const westrabumbeyyyy = new Discord.MessageEmbed()
    .setColor(`BLUE`)
    .setFooter(`Trix Development`)
    .setTimestamp()
    .setDescription(`🌌 ${message.author} name of the user <@${botid}> The bot named was added to the queue. His bot is waiting to be approved.`)
  dark.channels.cache.get(log).send(westrabumbeyyyy)
  message.channel.send(`✅ Your request to add a bot has been received.`).then(x => x.delete({timeout: 3000}))
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'add', 
  description: "Refuses the bot added to the server.",
  usage: 'botreddet <bot name> - <reason>'
};