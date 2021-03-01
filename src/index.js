const Discord = require('discord.js');
const cfg = require('./config');
const bot = new Discord.Client();
const createCaptcha = require('./captcha');
const fs = require('fs').promises;
const { createPool } = require('mysql');
const mysql = require('mysql2/promise');
const xpfile = require('./xp.json');
const client = new Discord.Client({
    disableEveryone: true
});

require("./util/eventHandler")(client)

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});
const memberCount = require('./membercount')
client.on("ready", () =>{
    console.log('\x1b[36m', `Flowz Bot Created by Flowz#4864 
    ███████╗██╗░░░░░░█████╗░░██╗░░░░░░░██╗███████╗  ██████╗░░█████╗░████████╗
    ██╔════╝██║░░░░░██╔══██╗░██║░░██╗░░██║╚════██║  ██╔══██╗██╔══██╗╚══██╔══╝
    █████╗░░██║░░░░░██║░░██║░╚██╗████╗██╔╝░░███╔═╝  ██████╦╝██║░░██║░░░██║░░░
    ██╔══╝░░██║░░░░░██║░░██║░░████╔═████║░██╔══╝░░  ██╔══██╗██║░░██║░░░██║░░░
    ██║░░░░░███████╗╚█████╔╝░░╚██╔╝░╚██╔╝░███████╗  ██████╦╝╚█████╔╝░░░██║░░░
    ╚═╝░░░░░╚══════╝░╚════╝░░░░╚═╝░░░╚═╝░░╚══════╝  ╚═════╝░░╚════╝░░░░╚═╝░░░`)
    console.log('\x1b[0m', `Logged in as ${client.user.tag}!`);
    client.user.setPresence({ activity: { name: cfg.status, type: cfg.statustype }, status: cfg.presence })
    if (cfg.membercount == true) {
        memberCount(client) 
    }
});
client.on('guildMemberAdd', member => {
    if (cfg.autorole == true) {
    const role = member.guild.roles.cache.find(role => role.id === cfg.autoroleID);
    member.roles.add(role);
    }
    if (cfg.welcomechannel == true) {
    const channel = member.guild.channels.cache.find(
            (ch) => ch.id === cfg.welcomechannelID
          );
    channel.send(`${cfg.welcomechannelmessage} ${member}`);
    if(cfg.welcomeDM == true) {
        member.send(cfg.welcomeDMmessage)
    }};
});

1==cfg.xpsystem&&client.on("message",async e=>{var t=Math.floor(10*Math.random());xpfile[e.author.id]||(xpfile[e.author.id]={xp:0,level:1,reqxp:100},fs.writeFile("./xp.json",JSON.stringify(xpfile),function(e){e&&console.log(e)})),xpfile[e.author.id].xp+=t,xpfile[e.author.id].xp>xpfile[e.author.id].reqxp&&(xpfile[e.author.id].xp-=xpfile[e.author.id].reqxp,xpfile[e.author.id].reqxp*=2,xpfile[e.author.id].reqxp=Math.floor(xpfile[e.author.id].reqxp),xpfile[e.author.id].level+=1,e.reply("You Are Now Level **"+xpfile[e.author.id].level+"**!").then(e=>e.delete({timeout:"10000"}))),fs.writeFile("./xp.json",JSON.stringify(xpfile),function(e){e&&(console,log(e))})}),1==cfg.captcha&&client.on("guildMemberAdd",async e=>{const t=await createCaptcha();var a=function(e){var t=Math.floor(e/6e4),a=(e%6e4/1e3).toFixed(0);return t+":"+(a<10?"0":"")+a}(cfg.captchatime);try{const i=await e.send(`You have ${a} to solve the captcha provided below, if you fail to complete this task you will be kicked from the server.`,{files:[{attachment:`${__dirname}/captchas/${t}.png`,name:`${t}.png`}]});try{const a=a=>{if(!a.author.bot)return a.author.id===e.id&&a.content===t||(a.channel.send("You entered the captcha incorrectly."),!1)};await i.channel.awaitMessages(a,{max:1,time:cfg.captchatime,errors:["time"]})&&(await i.channel.send("Captcha Completed Successfully!"),await e.roles.add(cfg.captcharole),await fs.unlink(`${__dirname}/captchas/${t}.png`).catch(e=>console.log(e)))}catch(a){console.log(a),await i.channel.send("You did not solve the captcha correctly in time."),await e.kick(),await fs.unlink(`${__dirname}/captchas/${t}.png`).catch(e=>console.log(e))}}catch(e){console.log(e)}}),client.on("message",async e=>{if(e.author.bot)return;if(!e.guild)return;if(!e.content.startsWith(cfg.prefix))return;e.member||(e.member=e.guild.fetchMember(e));const t=e.content.slice(cfg.prefix.length).trim().split(/ +/g),a=t.shift().toLowerCase();if(0===a.length)return;let i=client.commands.get(a);i||(i=client.commands.get(client.aliases.get(a))),i&&i.run(client,e,t)}),client.login(cfg.token);