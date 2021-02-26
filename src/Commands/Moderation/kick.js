const Command = require('../../handler/Command');
const Discord = require('discord.js');
const cfg = require('../../config')

var moderation = cfg.moderation

module.exports = {
    name: "kick",
    aliases: [],
    category: "moderation",
    description: "kicks a user",
    run: async (bot, message, args) => {
        message.delete()
        if(moderation == true) {
            if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Invalid Permissions")
        
            let User = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0])
            if (!User) return message.channel.send("Invalid User")
            if (User.hasPermission("KICK_MEMBERS")) return message.reply("Invalid Permissions")
            var banReason = args.join(" ").slice(22);
            if (!banReason) {
                banReason = "None"
              }
            
            const banembed = new Discord.MessageEmbed()
            .setAuthor(`Kicked By: ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true}))
            .setTitle('**New Kick!**')
            .setDescription(`${User} was kicked by ${message.author} for ${banReason}`)
            .setFooter('Kicked At')
            .setTimestamp()
            .setColor(cfg.colour)
            .setThumbnail(cfg.logo_url)
            message.channel.send(banembed).then(User.kick({reason: banReason}))
        }
    
        if (moderation == false) {
            message.channel.send('You do not have moderation enabled in the config.js please enable to use this command.')
        }
    

    }
}