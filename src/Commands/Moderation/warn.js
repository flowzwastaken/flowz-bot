const Command = require('../../handler/Command');
const Discord = require('discord.js');
const cfg = require('../../config')

var database = cfg.database

const mysql = require('mysql2/promise');
const { createPool } = require('mysql');
const ms = require('ms');

module.exports = {
    name: "warn",
    aliases: [],
    category: "moderation",
    description: "warns a user",
    run: async (bot, message, args) => {
        message.delete()
        if(database == true) {
            const warneduser = message.mentions.users.first();
            const warnreason = args.join(" ").slice(22);
            const warnID = Math.floor(Math.random() * 900);
            const warnembed = new Discord.MessageEmbed()
            .setAuthor(cfg.name)
            .setTitle(`Warned By: ${message.author.username}`, message.author.displayAvatarURL({ dymamic: true }))
            .setColor(cfg.colour)
            .setDescription(`${warneduser} has been warned by ${message.author} for ${warnreason}.`)
            .setFooter(`Warn ID: ${warnID}`)
            message.channel.send(warnembed)
            console.log(`${warneduser.username} has been warned by ${message.author.username} for ${warnreason}. Warn ID: ${warnID}`)

            mysql.createConnection({
                host: cfg.db_host,
                user: cfg.db_user,
                database: "flowz_bot"
            }).then((connection) => {connection.query(
                `INSERT INTO warnings (warnreason, warner, warneduser, warnID) VALUES ('${warnreason}', '${message.author.id}', '${warneduser.id}', '${warnID}')`
            )})
        }
        if(database == false) {
            message.channel.send('You have the database disabled in the config.js please enable to use this command.')
        }
    

    }
}