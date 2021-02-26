const Command = require('../../handler/Command');
const Discord = require('discord.js');
const client = new Discord.Client();
const cfg = require('../../config');
const mysql = require('mysql2/promise');
const { createPool } = require('mysql');
const { moderatoronly_reaction, moderator_option, owneronly_option, option1reaction, option3reaction, option4reaction, option2reaction } = require('../../config');

var transcripts = cfg.database;

module.exports = {
    name: "new",
    aliases: [],
    category: "Tickets",
    description: "Creates a Ticket",
    run: async (bot, message, args) => {
        message.delete();
        
        let everyoneid = message.guild.roles.everyone.id;

        if (cfg.tickets == true) {

        if (transcripts == true) {
            const user = message.author
            message.guild.channels.create(`ticket-${message.author.username}`, {
                parent: cfg.category_id,
                permissionOverwrites: [{
                        id: user.id,
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                    },
                    {
                        id: everyoneid,
                        deny: ["VIEW_CHANNEL"]
                    }
                ],
                type: 'text'
            }).then(async channel => {
    
                const ticketChannel = channel
                const notifyembed = new Discord.MessageEmbed()
                    .setTitle('**Ticket Created!**')
                    .setAuthor(cfg.name)
                    .setColor(cfg.colour)
                    .setFooter('© Created by Flowz#4864')
                    .setThumbnail(cfg.logo_url)
                    .setDescription(`${message.author}, A ticket has been opened for you, you can find it at ${channel}`)
                message.channel.send(notifyembed).then(m => m.delete({
                    timeout: 4000
                }))
                let ticketembed = new Discord.MessageEmbed()
                    .setAuthor(cfg.name)
                    .setColor(cfg.colour)
                    .setTitle(`${user.username}'s Ticket`)
                    .setDescription(`Please choose an option below to continue.`)
                    .setThumbnail(cfg.logo_url)
                    .addField(`For ${cfg.option1} React With`, `${cfg.option1reaction}`)
                    .addField(`For ${cfg.option2} React With`, `${cfg.option2reaction}`)
                    .addField(`For ${cfg.option3} React With`, `${cfg.option3reaction}`)
                    .addField(`For ${cfg.option4} React With`, `${cfg.option4reaction}`)
                    .setFooter('© Created by Flowz#4864')
                    .setTimestamp()
                channel.send(`${message.author}`).then(m => m.delete({
                    timeout: 50
                }))
    
                mysql.createConnection({
                    host: cfg.db_host,
                    user: cfg.db_user,
                    database: "flowz_bot"
                }).then((connection) => {connection.query(
                    `INSERT INTO ticketcreator (author, channelID) VALUES ('${message.author.id}', '${channel.id}')`
                )})
                
                try {
    
                await channel.send(ticketembed).then(async message => {
                    
                    await message.react(cfg.option1reaction)
                    await message.react(cfg.option2reaction)
                    await message.react(cfg.option3reaction)
                    await message.react(cfg.option4reaction)
                    
    
                    let reactionFilter = (reaction, user) => {
                        return [cfg.option1reaction, cfg.option2reaction, cfg.option3reaction, cfg.option4reaction].includes(reaction.emoji.name) && user.id != message.author.id
                    }
                    await message.awaitReactions(reactionFilter, {
                        max: 1
                    }).then(async collected => {
                        let reaction = collected.first()
                        if (reaction.emoji.name === cfg.option1reaction) {
                            const oneembed = new Discord.MessageEmbed()
                                .setAuthor(cfg.name)
                                .setColor(cfg.colour)
                                .setTitle(`${user.username}'s Ticket`)
                                .setDescription(`You Chose ${cfg.option1} A member of our <@&${cfg.option1role}> will be with you shortly.`)
                                .setThumbnail(cfg.logo_url)
                                .setFooter('© Created by Flowz#4864')
    
                            message.edit(ticketembed).then((sentmessage) => message.edit(oneembed)).then(message.reactions.removeAll())
                           
                            channel.overwritePermissions([{
                                    id: cfg.option1role,
                                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                                },
                                {
                                    id: user.id,
                                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                                },
                                {
                                    id: everyoneid,
                                    deny: ["VIEW_CHANNEL"]
                                }
                            ], 'Updated Ticket to Support Team Only').then(ticketChannel.send(`<@&${cfg.option1role}>`).then(m => m.delete({
                                timeout: 50
                            })))
    
                        } else if (reaction.emoji.name === cfg.option2reaction) {
                            const twoembed = new Discord.MessageEmbed()
                                .setAuthor(cfg.name)
                                .setColor(cfg.colour)
                                .setTitle(`${user.username}'s Ticket`)
                                .setDescription(`You Chose ${cfg.option2} A member of our <@&${cfg.option2role}> will be with you shortly.`)
                                .setThumbnail(cfg.logo_url)
                                .setFooter('© Created by Flowz#4864')
    
                            message.edit(ticketembed).then((sentmessage) => message.edit(twoembed)).then(message.reactions.removeAll())
    
                            channel.overwritePermissions([{
                                    id: cfg.option2role,
                                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                                },
                                {
                                    id: user.id,
                                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                                },
                                {
                                    id: everyoneid,
                                    deny: ["VIEW_CHANNEL"]
                                }
                            ], 'Updated Ticket to Support Team Only').then(ticketChannel.send(`<@&${cfg.option2role}>`).then(m => m.delete({
                                timeout: 50
                            })))
                        } else if (reaction.emoji.name === cfg.option3reaction) {
                            const threeembed = new Discord.MessageEmbed()
                                .setAuthor(cfg.name)
                                .setColor(cfg.colour)
                                .setTitle(`${user.username}'s Ticket`)
                                .setDescription(`You Chose ${cfg.option3} A <@&${cfg.option3role}> will be with you shortly.`)
                                .setThumbnail(cfg.logo_url)
                                .setFooter('© Created by Flowz#4864')
    
                            message.edit(ticketembed).then((sentmessage) => message.edit(threeembed)).then(message.reactions.removeAll())
                            
                            channel.overwritePermissions([{
                                    id: cfg.option3role,
                                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                                },
                                {
                                    id: user.id,
                                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                                },
                                {
                                    id: everyoneid,
                                    deny: ["VIEW_CHANNEL"]
                                }
                            ], 'Updated Ticket to Moderator Only').then(ticketChannel.send(`<@&${cfg.option3role}>`).then(m => m.delete({
                                timeout: 50
                            })))
                        } else if (reaction.emoji.name === cfg.option4reaction) {
                            const fourembed = new Discord.MessageEmbed()
                                .setAuthor(cfg.name)
                                .setColor(cfg.colour)
                                .setTitle(`${user.username}'s Ticket`)
                                .setDescription(`You Chose ${cfg.option4} A <@&${cfg.option4role}> will be with you shortly.`)
                                .setThumbnail(cfg.logo_url)
                                .setFooter('© Created by Flowz#4864')
    
                            message.edit(ticketembed).then((sentmessage) => message.edit(fourembed)).then(message.reactions.removeAll())
                          
                            channel.overwritePermissions([{
                                    id: cfg.option4role,
                                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                                },
                                {
                                    id: user.id,
                                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                                },
                                {
                                    id: everyoneid,
                                    deny: ["VIEW_CHANNEL"]
                                }
                            ], 'Updated Ticket to Owner Only').then(  ticketChannel.send(`<@&${cfg.option4role}>`).then(m => m.delete({
                                timeout: 50
                            })))
                        }
                    });
                });
            } catch (e) {console.log(e)}
    
            });
        }

        if(transcripts == false) {
            const user = message.author
            message.guild.channels.create(`ticket-${message.author.username}`, {
                parent: cfg.category_id,
                permissionOverwrites: [{
                        id: user.id,
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                    },
                    {
                        id: everyoneid,
                        deny: ["VIEW_CHANNEL"]
                    }
                ],
                type: 'text'
            }).then(async channel => {
    
                const ticketChannel = channel
                const notifyembed = new Discord.MessageEmbed()
                    .setTitle('**Ticket Created!**')
                    .setAuthor(cfg.name)
                    .setColor(cfg.colour)
                    .setFooter('© Created by Flowz#4864')
                    .setThumbnail(cfg.logo_url)
                    .setDescription(`${message.author}, A ticket has been opened for you, you can find it at ${channel}`)
                message.channel.send(notifyembed).then(m => m.delete({
                    timeout: 4000
                }))
                let ticketembed = new Discord.MessageEmbed()
                    .setAuthor(cfg.name)
                    .setColor(cfg.colour)
                    .setTitle(`${user.username}'s Ticket`)
                    .setDescription(`A member of our <@&${cfg.support_role}> Team will be with you shortly.`)
                    .setThumbnail(cfg.logo_url)
                    .addField(`For ${cfg.option1} React With`, `${cfg.option1reaction}`)
                    .addField(`For ${cfg.option2} React With`, `${cfg.option2reaction}`)
                    .addField(`For ${cfg.option3} React With`, `${cfg.option3reaction}`)
                    .addField(`For ${cfg.option4} React With`, `${cfg.option4reaction}`)
                    .setFooter('© Created by Flowz#4864')
                    .setTimestamp()
                channel.send(`${message.author}`).then(m => m.delete({
                    timeout: 50
                }))
                
                try {
    
                await channel.send(ticketembed).then(async message => {
                    
                    await message.react(cfg.option1reaction)
                    await message.react(cfg.option2reaction)
                    await message.react(cfg.option3reaction)
                    await message.react(cfg.option4reaction)
                    
    
                    let reactionFilter = (reaction, user) => {
                        return [cfg.option1reaction, cfg.option2reaction, cfg.option3reaction, cfg.option4reaction].includes(reaction.emoji.name) && user.id != message.author.id
                    }
                    await message.awaitReactions(reactionFilter, {
                        max: 1
                    }).then(async collected => {
                        let reaction = collected.first()
                        if (reaction.emoji.name === cfg.option1reaction) {
                            const oneembed = new Discord.MessageEmbed()
                                .setAuthor(cfg.name)
                                .setColor(cfg.colour)
                                .setTitle(`${user.username}'s Ticket`)
                                .setDescription(`You Chose ${cfg.option1} A member of our <@&${cfg.option1role}> will be with you shortly.`)
                                .setThumbnail(cfg.logo_url)
                                .setFooter('© Created by Flowz#4864')
    
                            message.edit(ticketembed).then((sentmessage) => message.edit(oneembed)).then(message.reactions.removeAll())
                           
                            channel.overwritePermissions([{
                                    id: cfg.option1role,
                                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                                },
                                {
                                    id: user.id,
                                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                                },
                                {
                                    id: everyoneid,
                                    deny: ["VIEW_CHANNEL"]
                                }
                            ], 'Updated Ticket to Support Team Only').then(ticketChannel.send(`<@&${cfg.option1role}>`).then(m => m.delete({
                                timeout: 50
                            })))
    
                        } else if (reaction.emoji.name === cfg.option2reaction) {
                            const twoembed = new Discord.MessageEmbed()
                                .setAuthor(cfg.name)
                                .setColor(cfg.colour)
                                .setTitle(`${user.username}'s Ticket`)
                                .setDescription(`You Chose ${cfg.option2} A member of our <@&${cfg.option2role}> will be with you shortly.`)
                                .setThumbnail(cfg.logo_url)
                                .setFooter('© Created by Flowz#4864')
    
                            message.edit(ticketembed).then((sentmessage) => message.edit(twoembed)).then(message.reactions.removeAll())
    
                            channel.overwritePermissions([{
                                    id: cfg.option2role,
                                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                                },
                                {
                                    id: user.id,
                                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                                },
                                {
                                    id: everyoneid,
                                    deny: ["VIEW_CHANNEL"]
                                }
                            ], 'Updated Ticket to Support Team Only').then(ticketChannel.send(`<@&${cfg.option2role}>`).then(m => m.delete({
                                timeout: 50
                            })))
                        } else if (reaction.emoji.name === cfg.option3reaction) {
                            const threeembed = new Discord.MessageEmbed()
                                .setAuthor(cfg.name)
                                .setColor(cfg.colour)
                                .setTitle(`${user.username}'s Ticket`)
                                .setDescription(`You Chose ${cfg.option3} A <@&${cfg.option3role}> will be with you shortly.`)
                                .setThumbnail(cfg.logo_url)
                                .setFooter('© Created by Flowz#4864')
    
                            message.edit(ticketembed).then((sentmessage) => message.edit(threeembed)).then(message.reactions.removeAll())
                            
                            channel.overwritePermissions([{
                                    id: cfg.option3role,
                                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                                },
                                {
                                    id: user.id,
                                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                                },
                                {
                                    id: everyoneid,
                                    deny: ["VIEW_CHANNEL"]
                                }
                            ], 'Updated Ticket to Moderator Only').then(ticketChannel.send(`<@&${cfg.option3role}>`).then(m => m.delete({
                                timeout: 50
                            })))
                        } else if (reaction.emoji.name === cfg.option4reaction) {
                            const fourembed = new Discord.MessageEmbed()
                                .setAuthor(cfg.name)
                                .setColor(cfg.colour)
                                .setTitle(`${user.username}'s Ticket`)
                                .setDescription(`You Chose ${cfg.option4} A <@&${cfg.option4role}> will be with you shortly.`)
                                .setThumbnail(cfg.logo_url)
                                .setFooter('© Created by Flowz#4864')
    
                            message.edit(ticketembed).then((sentmessage) => message.edit(fourembed)).then(message.reactions.removeAll())
                          
                            channel.overwritePermissions([{
                                    id: cfg.option4role,
                                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                                },
                                {
                                    id: user.id,
                                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                                },
                                {
                                    id: everyoneid,
                                    deny: ["VIEW_CHANNEL"]
                                }
                            ], 'Updated Ticket to Owner Only').then(  ticketChannel.send(`<@&${cfg.option4role}>`).then(m => m.delete({
                                timeout: 50
                            })))
                        }
                    });
                });
            } catch (e) {console.log(e)}
    
            });
        }
    } else {
        message.channel.send('Tickets are not enabled in the config.js file, please enable them to use this command.')
    }
    }
}
