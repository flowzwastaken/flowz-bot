const Command = require('../../handler/Command');
const Discord = require('discord.js');
const cfg = require('../../config')

var fun = cfg.fun

module.exports = {
    name: "8ball",
    aliases: [],
    category: "fun",
    description: "8ball",
    run: async (bot, message, args) => {
        message.delete()
        if(fun == true) {
            let question = message.content.slice(cfg.prefix.length + 6);
            if (!question)
              return message.channel.send(`You did not specify your question!`);
            else {
              let responses = [
                "As I see it, yes",
                "Ask again later",
                "Better not tell you now",
                "Cannot predict now",
                "Concentrate and ask again",
                "Don’t count on it",
                "It is certain",
                "It is decidedly so",
                "Most likely",
                "My reply is no",
                "My sources say no",
                "Outlook not so good",
                "Outlook good",
                "Reply hazy, try again",
                "Signs point to yes",
                "Very doubtful",
                "Without a doubt",
                "Yes",
                "Yes – definitely",
                "You may rely on it"
              ];
              let response =
                responses[Math.floor(Math.random() * responses.length - 1)];
              const Embed = new Discord.MessageEmbed()
                .setTitle(`8Ball | 🎱`)
                .setAuthor(`8Ball From ${message.author.username}`,  message.author.displayAvatarURL( {dynamic: true } ))
                .setDescription(`**Your question:** ${question}\n**My reply:** ${response}`)
                .setColor(cfg.colour);
                
              message.channel.send(Embed);
        }
    
        if (fun == false) {
            message.channel.send('You do not have fun enabled in the config.js please enable to use this command.')
        }

    }
}

}
