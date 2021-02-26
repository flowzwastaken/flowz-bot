const discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const Command = require('../../handler/Command');
const Discord = require('discord.js');
const cfg = require('../../config')

module.exports = {
    name: "remove",
    aliases: [],
    category: "Tickets",
    description: "Removes a user from a ticket",
    run: async (bot, message, args) => {
		
		if (cfg.tickets == true) {

		

		if (!message.member.roles.cache.some(r=>[cfg.support_role, cfg.moderator_role, cfg.owner_role].includes(r.id))) {
			return message.channel.send(
				new MessageEmbed()
					.setColor(cfg.err_colour)
					.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true}))
					.setTitle('❌ **No permission**')
					.setDescription(`You don't have permission to remove users as you are not support team.`)
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
			);
		}

		try {
			message.channel.updateOverwrite(member.user, {
				VIEW_CHANNEL: false,
				SEND_MESSAGES: false,
				ATTACH_FILES: false,
				READ_MESSAGE_HISTORY: false,
				EMBED_LINKS: false
			});

			if (channel.id !== message.channel.id) {
				channel.send(
					new MessageEmbed()
						.setColor(cfg.colour)
						.setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true}))
						.setTitle('**Member Removed**')
						.setDescription(`${member} has been removed by ${message.author}`)
				);
			}

			message.channel.send(
				new MessageEmbed()
					.setColor(cfg.colour)
					.setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true}))
					.setTitle('**Member removed**')
					.setDescription(`${member} has been removed from the ticket by ${message.author}`)
			);

			log.info(`${message.author.tag} removed a user from the ticket (#${message.channel.id})`);
		} catch (error) {
			log.error(error);
		}
		// command ends here
 	} else {
		message.channel.send('Tickets are not enabled in the config.js file, please enable them to use this command.')
	 }
	}
};
    