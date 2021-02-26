const Command = require('../../handler/Command');
const Discord = require('discord.js');
const cfg = require('../../config')

var moderation = cfg.moderation

module.exports = {
    name: "unmute",
    aliases: [],
    category: "moderation",
    description: "unmutes a muted user",
    run: async (bot, message, args) => {
        message.delete()
        if(moderation == true) {
            const role = message.guild.roles.cache.find(role => role.id === cfg.mutedrole);
            const member = message.mentions.members.first();
            member.roles.remove(role);
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Unmuted By: ${message.author.username}`, message.author.displayAvatarURL( {dynamic: true }))
            .setColor(cfg.colour)
            .setTitle('User Unmuted')
            .setDescription(`${member} Has Been Unmuted By ${message.author}`)
            .setFooter('© Created by Flowz#4864')
            message.channel.send(embed)
        }
    
        if (moderation == false) {
            message.channel.send('You do not have moderation enabled in the config.js please enable to use this command.')
        }
    

    }
}