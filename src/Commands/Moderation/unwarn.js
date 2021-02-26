const Command = require('../../handler/Command');
const Discord = require('discord.js');
const cfg = require('../../config')

var moderation = cfg.moderation
var database = cfg.database
const mysql = require('mysql2/promise');
const { createPool } = require('mysql');

module.exports = {
    name: "unwarn",
    aliases: [],
    category: "moderation",
    description: "displays someones warning record",
    run: async (bot, message, args) => {
        message.delete()
            if(database == true) {
            const warnID = args.join(" ");
            const warnembed = new Discord.MessageEmbed()
            .setAuthor(cfg.name)
            .setTitle(`Warning Removed By: ${message.author.username}`, message.author.displayAvatarURL({ dymamic: true }))
            .setColor(cfg.colour)
            .setDescription(`${warnID} has been unwarned by ${message.author}.`)
            .setFooter('© Created by Flowz#4864')
            message.channel.send(warnembed)
            console.log(`Warn ID: ${warnID} has been unwarned by ${message.author.username}.`)

            mysql.createConnection({
                host: cfg.db_host,
                user: cfg.db_user,
                database: "flowz_bot"
            }).then((connection) => {connection.query(`DELETE FROM \`warnings\` WHERE \`warnID\` ="${warnID}"`)
        }).catch(err => console.log(err));
            }
            if(database == false) {
                message.channel.send('You have the database disabled in the config.js please enable to use this command.')
            }
            

    }
}