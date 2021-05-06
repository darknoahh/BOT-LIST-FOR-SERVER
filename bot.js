const Discord = require("discord.js");
const darknoah = new Discord.Client();
const dark = require('./dark.json');
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const fs = require("fs");
require("./util/eventLoader.js")(darknoah);
const db = require("quick.db");
const queue = new Map();
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");

//-----------------------------------------------\\
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log("Trix Development pinged.");
  response.sendStatus(200);
});
//app.listen(8000);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
//-----------------------------------------------\\

var prefix = dark.prefix;

const log = message => {
  console.log(`${message}`);
};

darknoah.commands = new Discord.Collection();
darknoah.aliases = new Discord.Collection();
fs.readdir("./darknoahs/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./darknoahs/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    darknoah.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      darknoah.aliases.set(alias, props.help.name);
    });
  });
});

darknoah.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./darknoahs/${command}`)];
      let cmd = require(`./darknoahs/${command}`);
      darknoah.commands.delete(command);
      darknoah.aliases.forEach((cmd, alias) => {
        if (cmd === command) darknoah.aliases.delete(alias);
      });
      darknoah.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        darknoah.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

darknoah.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./darknoahs/${command}`);
      darknoah.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        darknoah.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

darknoah.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./darknoahs/${command}`)];
      let cmd = require(`./darknoahs/${command}`);
      darknoah.commands.delete(command);
      darknoah.aliases.forEach((cmd, alias) => {
        if (cmd === command) darknoah.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

darknoah.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === dark.ownar) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// darknoah.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

darknoah.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

darknoah.on('ready', ()=>{
  darknoah.channels.cache.get('837668038596755486').join()
  })

darknoah.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

darknoah.login(process.env.token)

///==========darknoahs==========\\\

darknoah.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  return permlvl;
};




darknoah.on('ready', () => {
    darknoah.user.setPresence({
        game: {
            name: `alone`,
            type: 'WATCHING'
          
        },
        status: 'online'
    
    })
})

darknoah.on("guildMemberAdd", member => {
   let hg = db.fetch(`${member.guild.id}_hg`)
  if(!hg) return;
  if(hg) 
    member.send(hg)


});

darknoah.on("guildMemberRemove", member => {
   let bb = db.fetch(`${member.guild.id}_bb`)
  if(!bb) return;
  if(bb) 
    member.send(bb)

});

darknoah.on('message', async message => {
  let prefix = dark.prefix || db.fetch(`prefix_${message.guild.id}`) 
  const ms = require('ms');
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "botlist-server-setup") {
  if (message.guild.channels.find(channel => channel.name === "🧽︲bot-application-log")) return message.channel.send("Botlist server is already set up.")
  if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send("You are not authorized to use this command.");
    
      message.channel.awaitMessages(response => response.content === 'evet', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
    .then((collected) => {
   message.guild.createChannel('↢╴╴╴╴╴⤙👑⤚╴╴╴╴╴↣', 'category', [{
  id: message.guild.id,
  deny: ['SEND_MESSAGES']
}])



        
 message.guild.createChannel('🧽︲add-bot', 'text', [{
  id: message.guild.id,
 
}])
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "↢╴╴╴╴╴⤙👑⤚╴╴╴╴╴↣")));
 message.guild.createChannel('🧽︲bot-rules', 'text', [{
  id: message.guild.id,
  deny: ['SEND_MESSAGES']
}])
               .then(channel =>
       channel.setParent(message.guild.channels.find(channel => channel.name === "↢╴╴╴╴╴⤙👑⤚╴╴╴╴╴↣")));
       message.guild.createChannel('Everything-ready', 'text', [{
        id: message.guild.id,
        deny: ['SEND_MESSAGES']
       
      }])
      
    
  
             message.guild.createChannel('🧽︲bot-application-log', 'text', [{
              id: message.guild.id,
              deny: ['SEND_MESSAGES']
               
            }])
            .then(channel => channel.setParent(message.guild.channels.find(channel => channel.name === "↢╴╴╴╴╴⤙👑⤚╴╴╴╴╴↣")));
        
        message.guild.createChannel('🧽︲bot-log', 'text', [{
              id: message.guild.id,
              deny: ['SEND_MESSAGES']
               
            }])
            .then(channel => channel.setParent(message.guild.channels.find(channel => channel.name === "↢╴╴╴╴╴⤙👑⤚╴╴╴╴╴↣")));
          
       }) 
       .then((collected) => {
        message.guild.createChannel('↢╴╴╴╴╴⤙👑⤚╴╴╴╴↣', 'category', [{
       id: message.guild.id,
     }]);
             
      message.guild.createChannel(`📩︲partner-close`, 'text')
     .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "↢╴╴╴╴╴⤙👑⤚╴╴╴╴↣")));
     message.guild.createChannel(`📩︲partner-condition`, 'text')
     .then(channel =>
            channel.setParent(message.guild.channels.find(channel => channel.name === "↢╴╴╴╴╴⤙👑⤚╴╴╴╴↣")));
     message.guild.createChannel(`📩︲partner-text`, 'text')
     .then(channel =>
                  channel.setParent(message.guild.channels.find(channel => channel.name === "↢╴╴╴╴╴⤙👑⤚╴╴╴╴↣")));
     message.guild.createChannel(`📩︲partners`, 'text')
     .then(channel =>
                  channel.setParent(message.guild.channels.find(channel => channel.name === "↢╴╴╴╴╴⤙👑⤚╴╴╴╴↣")));
   
  
    message.guild.createChannel(`🧽︲Bot Test 1`, "voice")
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "↢╴╴╴╴╴⤙👑⤚╴╴╴╴╴↣")))
        
         message.guild.createChannel(`🧽︲Bot Test 2`, "voice")
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "↢╴╴╴╴╴⤙👑⤚╴╴╴╴╴↣")))
        
         message.guild.createChannel(`🧽︲test`, "text")
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "↢╴╴╴╴╴⤙👑⤚╴╴╴╴╴↣")))
        
         message.guild.createChannel(`🧽︲bot-announcement`, "text")
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "↢╴╴╴╴╴⤙👑⤚╴╴╴╴╴↣")))
    
 message.guild.createRole({
        name: '💜 | Bot Verifier',
        color: '7f007f',
      })
        
      message.guild.createRole({
        name: '💛 | Developers',
        color: 'ffff00',
      })

      message.guild.createRole({
        name: '💙 | Bots',
        color: '56aaff',
      })


       message.channel.send("Everything ok!")
     
            })   
    
}
});

darknoah.on('message', async message => {
  let prefix = dark.prefix || db.fetch(`prefix_${message.guild.id}`) 
  const ms = require('ms');
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "botlist-server-create") {
  if (message.guild.channels.find(channel => channel.name === "🧽︲bot-app-log")) return message.channel.send(" Botlist server already created.")
  if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(" You do not have permissions to use this command.");
    message.channel.send(`Started.`)
      message.channel.awaitMessages(response => response.content === 'evet', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
    .then((collected) => {
   message.guild.createChannel('↢╴╴╴╴╴⤙👑⤚╴╴╴╴╴↣', 'category', [{
  id: message.guild.id,
  deny: ['SEND_MESSAGES']
}])



        
 message.guild.createChannel('🧽︲bot-add', 'text', [{
  id: message.guild.id,
 
}])
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "↢╴╴╴╴╴⤙👑⤚╴╴╴╴╴↣")));
 message.guild.createChannel('🧽︲bot-rules', 'text', [{
  id: message.guild.id,
  deny: ['SEND_MESSAGES']
}])
               .then(channel =>
       channel.setParent(message.guild.channels.find(channel => channel.name === "↢╴╴╴╴╴⤙👑⤚╴╴╴╴╴↣")));
       message.guild.createChannel('channels-ready', 'text', [{
        id: message.guild.id,
        deny: ['SEND_MESSAGES']
       
      }])
      
    
  
             message.guild.createChannel('🧽︲bot-app-log', 'text', [{
              id: message.guild.id,
              deny: ['SEND_MESSAGES']
               
            }])
            .then(channel => channel.setParent(message.guild.channels.find(channel => channel.name === "↢╴╴╴╴╴⤙👑⤚╴╴╴╴╴↣")));
          
       }) 
       .then((collected) => {
        message.guild.createChannel('↢╴╴╴╴╴⤙👑⤚╴╴╴╴↣', 'category', [{
       id: message.guild.id,
     }]);
             
      message.guild.createChannel(`📩︲partner-close`, 'text')
     .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "↢╴╴╴╴╴⤙👑⤚╴╴╴╴↣")));
     message.guild.createChannel(`📩︲partner-rules`, 'text')
     .then(channel =>
            channel.setParent(message.guild.channels.find(channel => channel.name === "↢╴╴╴╴╴⤙👑⤚╴╴╴╴↣")));
     message.guild.createChannel(`📩︲partner-text`, 'text')
     .then(channel =>
                  channel.setParent(message.guild.channels.find(channel => channel.name === "↢╴╴╴╴╴⤙👑⤚╴╴╴╴↣")));
     message.guild.createChannel(`📩︲partners`, 'text')
     .then(channel =>
                  channel.setParent(message.guild.channels.find(channel => channel.name === "↢╴╴╴╴╴⤙👑⤚╴╴╴╴↣")));
   
  
    message.guild.createChannel(`🧽︲Bot Testing 1`, "voice")
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "↢╴╴╴╴╴⤙👑⤚╴╴╴╴╴↣")))
        
         message.guild.createChannel(`🧽︲Bot Testing 2`, "voice")
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "↢╴╴╴╴╴⤙👑⤚╴╴╴╴╴↣")))
        
         message.guild.createChannel(`🧽︲testing`, "text")
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "↢╴╴╴╴╴⤙👑⤚╴╴╴╴╴↣")))
        
        
         message.guild.createChannel(`🧽︲bot-annoucements`, "text")
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "↢╴╴╴╴╴⤙👑⤚╴╴╴╴╴↣")))
    
 message.guild.createRole({
        name: '💜 | Bot Verifier',
        color: '7f007f',
      })
        
      message.guild.createRole({
        name: '💛 | Developers',
        color: 'ffff00',
      })

      message.guild.createRole({
        name: '💙 | Bots',
        color: '56aaff',
      })


       message.channel.send("Everything ok!")
     
            })   
    
}
});

 
