const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const dark = require('../dark.json');
var prefix = dark.prefix;

module.exports = dark => {
 setInterval(function() {
}, 8000);
  var msgArray = [

"!add is active",

];

 setInterval(() => {
  var rastgeleOyun = Math.floor(Math.random() * msgArray.length);
  dark.user.setActivity(`${msgArray[rastgeleOyun]}`, { type: 'STREAMING' ,  url: 'https://www.twitch.tv/pqueen' })
}, 5000);
    console.log(`Botlist has successfully logged in.`);
}