const Command = require('../../handler/Command');
const Discord = require('discord.js');
const cfg = require('../../config')

var moderation = cfg.moderation

module.exports = {
    name: "clear",
    aliases: [],
    category: "moderation",
    description: "Deletes Specified Amount of messages in a channel",
    run: async (bot, message, args) => {
        message.delete()
        if(moderation === true) {
        
        var messagedelcount = args.join(' ');
        if(!messagedelcount) return message.channel.send('Please Specify How Many Messages To Clear.')
            message.channel.bulkDelete(messagedelcount).catch(err => console.log(err));
            message.channel.send(`Successfully Cleared ${messagedelcount} messages!`).then(m => m.delete({timeout :4000})).catch(err => console.log(err));

        } else {
            message.channel.send('You do not have moderation enabled in the config.js please enable to use this command.')
        }
    }

}