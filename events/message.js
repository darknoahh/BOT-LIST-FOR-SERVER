const Discord = require("discord.js")
const dark = require("../dark.json")
const db = require("quick.db")
module.exports = message => {
  let darknoah = message.darknoah;
  if (message.author.bot) return;
  if(!message.member) return;
  if(!message.guild) return;
  if (!message.content.startsWith(dark.prefix)) return;
  let command = message.content.split(' ')[0].slice(dark.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = darknoah.elevation(message);
  let cmd;
  if (darknoah.commands.has(command)) {
    cmd = darknoah.commands.get(command);
  } else if (darknoah.aliases.has(command)) {
    cmd = darknoah.commands.get(darknoah.aliases.get(command));
  }
  if (cmd) {

    if (cmd.conf.permLevel === 1) {
			if (!message.member.hasPermission("MANAGE_MESSAGES")) {
				const embed = new Discord.MessageEmbed()
					.setDescription(`🔴 You must have the ** Manage Messages ** permission to use this command!`)
          .setColor("RED")
				message.channel.send({embed})
				return
			}
		}
		if (cmd.conf.permLevel === 2) {
			if (!message.member.hasPermission("KICK_MEMBERS")) {
				const embed = new Discord.MessageEmbed()
					.setDescription(`🔴 You must have the ** Discard Members ** permission to use this command!`)
					.setColor("RED")
				message.channel.send({embed})
				return
			}
		}
    if (cmd.conf.permLevel === 3) {
			if (!message.member.hasPermission("BAN_MEMBERS")) {
				const embed = new Discord.MessageEmbed()
					.setDescription(`🔴 You must have the ** Ban Members ** permission to use this command!`)
					.setColor("RED")
				message.channel.send({embed})
				return
			}
		}

		if (cmd.conf.permLevel === 4) {
			if (!message.member.hasPermission("ADMINISTRATOR")) {
				const embed = new Discord.MessageEmbed()
					.setDescription(`🔴 You must have the ** Administrator ** permission to use this command!`)
					.setColor("RED")
				message.channel.send({embed})
				return
			}
		}
		if (cmd.conf.permLevel === 5) {
			if (!dark.sahip.includes(message.author.id)) {
				const embed = new Discord.MessageEmbed()
					.setDescription(`🔴 Only ** I have ** can use this command!`)
					.setColor("RED")
				message.channel.send({embed})
				return
			}
		}
  if (perms < cmd.conf.permLevel) return;
    cmd.run(darknoah, message, params, perms);
    }

};
