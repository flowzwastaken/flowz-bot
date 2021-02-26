const cfg = require('./config')
module.exports = (client) => {
    const channelId = cfg.membercountchannelID
  
    const updateMembers = (guild) => {
      const channel = guild.channels.cache.get(channelId)
      channel.setName(`Members: ${guild.memberCount.toLocaleString()}`)
    }
  
    client.on('guildMemberAdd', (member) => updateMembers(member.guild))
    client.on('guildMemberRemove', (member) => updateMembers(member.guild))
  
    const guild = client.guilds.cache.get(cfg.guildID)
    updateMembers(guild)
  }