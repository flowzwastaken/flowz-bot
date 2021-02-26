const pagination = require('discord.js-pagination');
const Discord = require('discord.js');
const cfg = require('../../config')

module.exports = {
    name: "help",
    description: "Shows the Help Page of the bot.",
    async run (client, message, args){

        // Embeds of Help Pages
        const page1 = new Discord.MessageEmbed()
        .setTitle('Page 1')
        .setAuthor(`Help Page Requested By: ${message.author.username}`, message.author.displayAvatarURL( {dynamic: true }))
        .setThumbnail(cfg.logo_url)
        .addField(`**!ann**`, `!ann (announcment)`)
        .addField(`**!ban**`, `!ban (user)`)
        .addField(`**!kick**`, `!kick (user)`)
        .addField(`**!mute**`, `!mute (user)`)
        .addField(`**!unmute**`, `!unmute (user)`)
        .addField(`**!warn**`, `!warn (user)`)
        .setColor(cfg.colour)
        .setFooter('© Created by Flowz#4864 | Help Page: 1')
        .setTimestamp()

        const page2 = new Discord.MessageEmbed()
        .setTitle('Page 2')
        .setAuthor(`Help Page Requested By: ${message.author.username}`, message.author.displayAvatarURL( {dynamic: true }))
        .setThumbnail(cfg.logo_url)
        .addField(`**!record**`, `!record (user)`)
        .addField(`**!8ball**`, `!8ball (question)`)
        .addField(`**!flip**`, `Flips a coin`)
        .addField(`**!meme**`, `Gets a meme from r/memes`)
        .addField(`**!roast**`, `!roast (user)`)
        .addField(`**!new**`, `If enabled creates a new ticket`)
        .setColor(cfg.colour)
        .setFooter('© Created by Flowz#4864 | Help Page: 2')
        .setTimestamp()

        const page3 = new Discord.MessageEmbed()
        .setTitle('Page 3')
        .setAuthor(`Help Page Requested By: ${message.author.username}`, message.author.displayAvatarURL( {dynamic: true }))
        .setThumbnail(cfg.logo_url)
        .addField(`**!add**`, `!add (user)`)
        .addField(`**!close**`, `If enabled closes a ticket.`)
        .addField(`**!remove**`, `!remove user`)
        .addField(`**!add**`, `!add (user)`)
        .addField(`**!rename**`, `!rename (name)`)
        .addField(`**!clear**`, `!clear (messagecount)`)
        .setColor(cfg.colour)
        .setFooter('© Created by Flowz#4864 | Help Page: 3')
        .setTimestamp()

        const page4 = new Discord.MessageEmbed()
        .setTitle('Page 4')
        .setAuthor(`Help Page Requested By: ${message.author.username}`, message.author.displayAvatarURL( {dynamic: true }))
        .setThumbnail(cfg.logo_url)
        .addField(`**!userinfo**`, `!userinfo (user)`)
        .addField(`**!serverinfo**`, `Displays Server Info`)
        .addField(`!help`, `Brings up this help menu.`)
        .setColor(cfg.colour)
        .setFooter('© Created by Flowz#4864 | Help Page: 4')

        // Defining Pages
        const pages = [
                page1,
                page2,
                page3,
                page4
        ]
        
        // Emojis To Switch Pages
        const emojiList = ["👈", "👉"];

        // Time before Help Page TimesOut
        const timeout = '120000';

        pagination(message, pages, emojiList, timeout)
    }
}