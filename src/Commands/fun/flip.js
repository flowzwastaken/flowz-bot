const Command = require('../../handler/Command');
const Discord = require('discord.js');
const cfg = require('../../config')

module.exports = {
    name: "flip",
    aliases: [],
    category: "fun",
    description: "Flips a coin",
    run: async (bot, message, args) => {
        message.delete()
        if(cfg.fun == true) {
        let outcomes = ["Heads", "Tails"];
        let outcomesIndex = Math.round(Math.random() * outcomes.length);
        console.log(outcomes[outcomesIndex])
        let embed = new Discord.MessageEmbed()
        .setAuthor(`Coin Flip Requested By: ${message.author.username}`, message.author.displayAvatarURL( {dynamic: true }))
        .setDescription(`You Got ${outcomes[outcomesIndex]}`)
        .setColor(cfg.colour)
        .setTitle(cfg.name)
        message.channel.send(embed)
        }
    
        if (cfg.fun == false) {
            message.channel.send('You do not have fun enabled in the config.js please enable to use this command.')
        }

    }
}