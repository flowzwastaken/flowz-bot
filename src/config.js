/**
 * ###############################################################################################
 * 
 *
 * ███████╗██╗░░░░░░█████╗░░██╗░░░░░░░██╗███████╗  ██████╗░░█████╗░████████╗
 * ██╔════╝██║░░░░░██╔══██╗░██║░░██╗░░██║╚════██║  ██╔══██╗██╔══██╗╚══██╔══╝
 * █████╗░░██║░░░░░██║░░██║░╚██╗████╗██╔╝░░███╔═╝  ██████╦╝██║░░██║░░░██║░░░
 * ██╔══╝░░██║░░░░░██║░░██║░░████╔═████║░██╔══╝░░  ██╔══██╗██║░░██║░░░██║░░░
 * ██║░░░░░███████╗╚█████╔╝░░╚██╔╝░╚██╔╝░███████╗  ██████╦╝╚█████╔╝░░░██║░░░
 * ╚═╝░░░░░╚══════╝░╚════╝░░░░╚═╝░░░╚═╝░░╚══════╝  ╚═════╝░░╚════╝░░░░╚═╝░░░
 *
 * ---------------------
 *      Quick Start
 * ---------------------
 *
 * 	> For detailed instructions, visit the GitHub repository and read the documentation:
 * 	
 *
 * 	> https://github.com/flowzwastaken/flowz-bot
 *
 * ---------------------
 *       Support
 * ---------------------
 *  >  For Support Setting up the bot join my discord at the link below
 * 
 * 
 *  > https://discord.gg/SdWw3F7WM5
 * 
 * ###############################################################################################
 */

module.exports = {
    // General Configuration
    prefix: "!",
    token: 'NzkxMDYxNTYxMjIxMTg1NTM2.X-JrfQ.2HisnTD5K29TlyrNKQWAqxw1Ewc', //Token of your bot.
    name: 'Flowz Bot', // Name Of your Bot (if left blank it will cause an error.)
	status: '!help', // Bot Status
    statustype: 'LISTENING', // Bot Status Type Options: WATCHING, STREAMING, LISTENING, PLAYING
    guildID: '', // ID Of your bots guild
    presence: 'dnd', // Changes Presence of bot Options: dnd, idle, online
    mutedrole: "", // Muted Role ID 
    database: false, // If true transcripts and warn system are enabled.
    moderation: false, // If true moderation commands are enabled.
    fun: false, // If true fun commands are enabled.
    misc: false, // If true the misc category of commands are enabled.
    tickets: false, // If true the ticket system is enabled
    captcha: false, // If true you must pass a captcha to join the server.
    captcharole: "", // If Captcha is enabled put the role you want to give for completeing captcha here
    captchatime: 60000, // Maximum Captcha Time In MS
    xpsystem: false, // If true enables chat XP system
    membercount: false, // If true creates a channel displaying member count.
    welcomechannel: true, // If true sends a welcome message to a channel you can customize it below.
    welcomechannelmessage: 'Welcome to Our Server', // Message you want to be sent to the welcome channel defined below.
    welcomechannelID: '815796524977750086', // ID of your welcome channel
    welcomeDM: true, // If true sends a welcome message to a users DM you can customize it below.
    welcomeDMmessage: 'Welcome To Our Server', // Message you want to be sent to the users DM.
    autorole: true, // If true automatically assigns a role when joining the server.
    autoroleID: '810662682293960724', // Role ID you want to be automatically assigned to members.
    membercountchannelID: '', // If membercount is true put the channel ID of your member count channel
    ticket_category: '', // Category where you would like your tickets to send to
	colour: '#009999', // Color of your embeds
	err_colour: 'RED', // Color of your error embeds
    logo_url: '', // Logo URL For your Bot System
    db_host: 'localhost', // Database Host Name (if database false leave blank)
    db_user: 'root', // Database username (if database false leave blank)
    option1role: '', // Put the role ID that you want to have access to option 1 listed below
    option2role: '', 
    option3role: '', 
    option4role: '',
    option1: 'General Support', // Option 1 for support
    option2: 'Questions', 
    option3: 'Player Reports', 
    option4: 'Owner Inquiries', 
    option1reaction: '📩', // Reaction for option 1
    option2reaction: '❓',
    option3reaction: '⚠', 
    option4reaction: '🚨' 
    
};