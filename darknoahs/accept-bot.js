const Discord = require('discord.js');
const db = require('quick.db');


module.exports.run = async (dark, message, args) => {
  let kanal = await db.fetch(`westrabasvuruyapılacakkanal_${message.guild.id}`);
  let kanal2 = await db.fetch(`westrabasvurugidecekkanal_${message.guild.id}`);
  let kanal3 = await db.fetch(`westralogkanal_${message.guild.id}`);
  let westrabasvuruyapılacakkanal = await db.fetch(`westrabasvuruyapılacakkanal_${message.guild.id}`, kanal.id);
  let westrabasvurugidecekkanal = await db.fetch(`westrabasvurugidecekkanal_${message.guild.id}`, kanal2.id);
let westralogkanal = await db.fetch(`westralogkanal_${message.guild.id}`, kanal3.id);
 let westrabotlistyetkilisi = db.fetch(`westrabotlistyetkilirol_${message.guild.id}`)
   if(!message.member.roles.cache.has(westrabotlistyetkilisi)) return message.channel.send(`❌ To use this command <@&${westrabotlistyetkilisi}> You must have the role!`)
	let botisim = args[0]
  let sahip = args[1]
	let log = westralogkanal //  Bot Eklendi / Onaylandı / Rededildi Kanalı
	
	if (!botisim) return message.channel.send(`❌ You must type in the bot's ID.`).then(x => x.delete({timeout: 3000}))
  	if (!sahip) return message.channel.send(`❌ You must write the ID of the bot owner.`).then(x => x.delete({timeout: 3000}))
  message.delete()
   const westrabumbeyyyy = new Discord.MessageEmbed()
    .setColor(`GREEN`)
    .setFooter(`Trix Development`)
    .setTimestamp()
    .setDescription(`✅ <@${sahip}> named person <@${botisim}> The bot named is approved. Approving authority: ${message.author}`)
		dark.channels.cache.get(log).send(westrabumbeyyyy);
		message.channel.send(`✅ You have approved the bot.`).then(x => x.delete({timeout: 3000}))
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'accept', 
  description: "Refuses the bot added to the server.",
  usage: 'botreddet <bot name> - <reason>'
};