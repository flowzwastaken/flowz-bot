const Command = require('../../handler/Command');
const Discord = require('discord.js');
const cfg = require('../../config')

var moderation = cfg.moderation

module.exports = {
    name: "ann",
    aliases: [],
    category: "moderation",
    description: "Announcement Command",
    run: async (bot, message, args) => {
    message.delete()
    if(moderation == true) {
    const annmsg = args.join(' ')
    const announceemned = new Discord.MessageEmbed()
    .setAuthor(`From: ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(annmsg)
    .setFooter('© Created by Flowz#4864')
    .setThumbnail(cfg.logo_url)
    .setTimestamp()
    .setColor(cfg.colour)
    message.channel.send(announceemned)
    }

    if (moderation == false) {
        message.channel.send('You do not have moderation enabled in the config.js please enable to use this command.')
    }

    }
}