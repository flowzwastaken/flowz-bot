const discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const fs = require('fs').promises;
const jsdom = require('jsdom');
const { count } = require('console');
const { JSDOM } = jsdom;
const dom = new JSDOM();
const document = dom.window.document;
const Command = require('../../handler/Command');
const Discord = require('discord.js');
const cfg = require('../../config')
const client = new Discord.Client()
const mysql = require('mysql2/promise');
const { createPool } = require('mysql');

var transcripts = cfg.database

module.exports = {
    name: "close",
    aliases: [],
    category: "Tickets",
    description: "Closes a Ticket",
    run: async (bot, message, args) => {

        if(message.author.bot) return;
        
        if (cfg.tickets == true) {

        if(transcripts == true) {
            try {
                const channelname = message.channel.id
                  let messageCollection = new discord.Collection();
                  let channelMessages = await message.channel.messages.fetch({
                      limit: 100
                  }).catch(err => console.log(err));
            
                  messageCollection = messageCollection.concat(channelMessages);
            
                  while(channelMessages.size === 100) {
                      let lastMessageId = channelMessages.lastKey();
                      channelMessages = await message.channel.messages.fetch({ limit: 100, before: lastMessageId }).catch(err => console.log(err));
                      if(channelMessages)
                          messageCollection = messageCollection.concat(channelMessages);
                  }
                  let msgs = messageCollection.array().reverse();
                  let data = await fs.readFile('./template.html', 'utf8').catch(err => console.log(err));
                  if(data) {
                      await fs.writeFile(`./transcripts/${channelname}`, data).catch(err => console.log(err));
                      let guildElement = document.createElement('div');
                      let guildText = document.createTextNode('');
                      guildElement.appendChild(guildText);
                      await fs.appendFile(`./transcripts/${channelname}.html`, guildElement.outerHTML).catch(err => console.log(err));
            
                      msgs.forEach(async msg => {
                          let parentContainer = document.createElement("div");
                          parentContainer.className = "parent-container";
            
                          let avatarDiv = document.createElement("div");
                          avatarDiv.className = "avatar-container";
                          let img = document.createElement('img');
                          img.setAttribute('src', msg.author.displayAvatarURL({ dynamic: true }));
                          img.className = "avatar";
                          avatarDiv.appendChild(img);
            
                          parentContainer.appendChild(avatarDiv);
            
                          let messageContainer = document.createElement('div');
                          messageContainer.className = "message-container";
            
                          let nameElement = document.createElement("span");
                          let name = document.createTextNode(msg.author.tag + " " + msg.createdAt.toLocaleTimeString() + " EST");
                          nameElement.appendChild(name);
                          messageContainer.append(nameElement);
            
                          if(msg.content.startsWith("```")) {
                              let m = msg.content.replace(/```/g, "");
                              let codeNode = document.createElement("code");
                              let textNode =  document.createTextNode(m);
                              codeNode.appendChild(textNode);
                              messageContainer.appendChild(codeNode);
                          }
                          else {
                              let msgNode = document.createElement('span');
                              let textNode = document.createTextNode(msg.content);
                              msgNode.append(textNode);
                              messageContainer.appendChild(msgNode);
                          }
                          parentContainer.appendChild(messageContainer);
                          await fs.appendFile(`./transcripts/${channelname}.html`, parentContainer.outerHTML).catch(err => console.log(err));          
            
                        })
                  }
              } catch (error) {
                console.log(error);
              }
            
    
              const channelname = message.channel.id
    
              const attachment = new discord.MessageAttachment(`./transcripts/${channelname}.html`);
              
    
              const pool = createPool({
                host: cfg.db_host,
                user: cfg.db_user,
                database: 'flowz_bot'
            })
            pool.query(`SELECT * FROM ticketcreator WHERE channelID = ?`, [message.channel.id], (err, rows, fields) => {
                const formatBans = rows.map((row) => {
                    const logembed = new Discord.MessageEmbed()
                    .setAuthor(`Closed By: ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true}))
                    .setDescription(`**${message.author.username} Closed <@${row.author}>'s Ticket**
                    
                    Link To Transcript is attached.`)
                    .setFooter('Time Closed')
                    .setTimestamp()
                    .setColor(cfg.colour)
    
                    const dmembed = new Discord.MessageEmbed()
                    .setAuthor(cfg.name)
                    .setTitle('**Ticket Closed**')
                    .setDescription(`Your ticket has been closed by ${message.author},
    
                    You can find a transcript of your ticket attached to this message.`)
                    .setFooter('Time Closed')
                    .setTimestamp()
                    .setColor(cfg.colour)
    
                    message.guild.members.cache.get(row.author).send(dmembed);
                    message.guild.members.cache.get(row.author).send(attachment);
                    if(cfg.logs === true) {
                    message.client.channels.cache.get(cfg.logchannel).send(logembed);
                    message.client.channels.cache.get(cfg.logchannel).send(attachment);
                    } else {console.log('Logs are disabled')}
                })
            })
    
            mysql.createConnection({
                host: cfg.db_host,
                user: cfg.db_user,
                database: 'flowz_bot'
            }).then((connection) => {connection.query(`DELETE FROM \`ticketcreator\` WHERE \`channelID\` ="${message.channel.id}"`)
        }).catch(err => console.log(err));
        message.channel.delete()
        }
    

    if(transcripts == false) {
        message.channel.delete()
    }
        } else {
            message.channel.send('Tickets are not enabled in the config.js file, please enable them to use this command.')
        }

    }};