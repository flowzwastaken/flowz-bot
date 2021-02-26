const { MessageEmbed } = require('discord.js');
const Command = require('../../handler/Command');
const cfg = require('../../config')

module.exports = {
  name: "rename",
  aliases: [],
  category: "Tickets",
  description: "renames a Ticket",
  run: async (bot, message, args) => {
        if(cfg.tickets == true) {
        if(!message.member.roles.cache.some(r=>[cfg.support_role, cfg.moderator_role, cfg.owner_role].includes(r.id)))
        return message.reply("You do not have permisson to use this command.");
        const renamemessage = args.join(" ");    
        const renameembed = new MessageEmbed()
          .setColor(cfg.colour)
          .setAuthor(`Changed By ${message.author.username}`, message.author.displayAvatarURL( {dynamic: true } ))
          .setDescription(`Your ticket has been renamed to ticket-${renamemessage}`)
          .setFooter("Ticket System By Flowz")
          .setTitle(cfg.name)
          message.channel.setName(`ticket-${renamemessage}`)
          message.channel.send(renameembed).then(m => m.delete({timeout :4000}))
          message.delete().catch(O_o=>{});
        } else {
          message.channel.send('Tickets are not enabled in the config.js file, please enable them to use this command.')
        }
        }}