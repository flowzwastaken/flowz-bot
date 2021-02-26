const discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const Command = require('../../handler/Command');
const Discord = require('discord.js');
const cfg = require('../../config')

module.exports = {
    name: "add",
    aliases: [],
    category: "Tickets",
    description: "Adds a User to a Ticket",
    run: async (bot, message, args) => {
		message.delete();
		
		if(cfg.tickets === true) {
		
		if (!message.member.roles.cache.some(r=>[cfg.support_role, cfg.moderator_role, cfg.owner_role].includes(r.id))) {
			return message.channel.send(
				new MessageEmbed()
					.setColor(cfg.err_colour)
					.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true}))
					.setTitle('❌ **No permission**')
					.setDescription(`You don't have permission to add users as you are not support team.`)
					.setFooter('© Created by Flowz#4864')
			);
		}

		let member = message.mentions.members.first();
		let channel = message.channel

		if (!member) {
			return message.channel.send(
				new MessageEmbed()
					.setColor(cfg.err_colour)
					.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true}))
					.setTitle('❌ **Unknown member**')
					.setDescription('Please mention a valid member.')
					.setFooter('© Created by Flowz#4864')
			);
		}

		try {
			message.channel.updateOverwrite(member.user, {
				VIEW_CHANNEL: true,
				SEND_MESSAGES: true,
				ATTACH_FILES: true,
				READ_MESSAGE_HISTORY: true,
				EMBED_LINKS: true
			});

			if (channel.id !== message.channel.id) {
				channel.send(
					new MessageEmbed()
						.setColor(cfg.colour)
						.setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true}))
						.setTitle('**Member added**')
						.setDescription(`${member} has been added by ${message.author}`)
						.setFooter('© Created by Flowz#4864')
				);
			}

			message.channel.send(
				new MessageEmbed()
					.setColor(cfg.colour)
					.setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true}))
					.setTitle('**Member added**')
					.setDescription(`${member} has been added to the ticket by ${message.author}`)
					.setFooter('© Created by Flowz#4864')
			);

			log.info(`${message.author.tag} added a user to the ticket (#${message.channel.id})`);
		} catch (error) {
			log.error(error);
		}
		// command ends here
	} else {
		message.channel.send('Tickets are not enabled in the config.js file, please enable them to use this command.')
	}
}
};
    