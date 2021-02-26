const Command = require('../../handler/Command');
const Discord = require('discord.js');
const cfg = require('../../config')

const mysql = require('mysql2/promise');
const { createPool } = require('mysql');

var moderation = true

module.exports = {
    name: "ban",
    aliases: [],
    category: "moderation",
    description: "bans a member",
    run: async (bot, message, args) => {
        message.delete()
        if(moderation == true) {
            
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Invalid Permissions")
        
        let User = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0])
        if (!User) return message.channel.send("Invalid User")
        if (User.hasPermission("BAN_MEMBERS")) return message.reply("Invalid Permissions")
        var banReason = args.join(" ").slice(22);
        if (!banReason) {
            banReason = "None"
          }
        
        const banembed = new Discord.MessageEmbed()
        .setAuthor(`Banned By: ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true}))
        .setTitle(cfg.name)
        .setDescription(`${User} was banned by ${message.author} for ${banReason}`)
        .setFooter('Banned At')
        .setTimestamp()
        .setColor(cfg.colour)
        message.channel.send(banembed).then(User.ban({reason: banReason}))

        }
    
        if (moderation == false) {
            message.channel.send('You do not have moderation enabled in the config.js please enable to use this command.')
        }
    

    }
}