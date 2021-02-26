const Command = require('../../handler/Command');
const Discord = require('discord.js');
const cfg = require('../../config');
const xpfile = require('../../xp.json');

module.exports = {
    name: "level",
    aliases: [],
    category: "fun",
    description: "Flips a coin",
    run: async (bot, message, args) => {
        message.delete()
        if(cfg.xpsystem == true) {
        let user = message.mentions.users.first() || message.author
        let embed = new Discord.MessageEmbed()
        .setTitle(`${user.username}'s Level Card`)
        .setColor(cfg.colour)
        .addField("Level: ", xpfile[user.id].level)
        .addField("XP: ", xpfile[user.id].xp+"/"+xpfile[user.id].reqxp)
        .addField("XP Required: ",xpfile[user.id].reqxp)
        message.channel.send(embed)
        }
    
        if (cfg.xpsystem == false) {
            message.channel.send('You do not have the XP system enabled in the config.js please enable to use this command.')
        }

    }
}