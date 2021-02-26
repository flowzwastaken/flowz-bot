const Command = require('../../handler/Command');
const Discord = require('discord.js');
const cfg = require('../../config')

var fun = cfg.fun

module.exports = {
    name: "meme",
    aliases: [],
    category: "fun",
    description: "gets a meme from r/memes",
    run: async (bot, message, args) => {
        message.delete()
        if(fun == true) {

        }
    
        if (fun == false) {
            message.channel.send('You do not have fun enabled in the config.js please enable to use this command.')
        }

    }
}