const Discord = require("discord.js");

module.exports = (client, role) => {
    
    var d = new Date,
    dformat = [d.getMonth()+1,
       d.getDate(),
       d.getFullYear()].join('/')+' '+
      [d.getHours(),
       d.getMinutes(),
       d.getSeconds()].join(':');

    var logChannel = role.guild.channels.cache.find(x => x.name === client.config.logChannel)
    if(!logChannel){var logChannel = role.guild.channels.cache.find(x => x.id === client.config.logChannel)}

    const log = new Discord.MessageEmbed()
        .setColor(client.config.colour)
        .setTitle(client.l.events.role.deleted)
        .setDescription(`${client.l.events.role.role} @${role.name}`)
        .setTimestamp(dformat)
    logChannel.send(log)
  
}

// © Hawsk Romania Discord Bot | Do Not Copy