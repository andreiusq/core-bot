const Discord = require("discord.js");

module.exports = (client, channel, time) => {
    
    var logChannel = channel.guild.channels.cache.find(x => x.name === client.config.logChannel)
    if(!logChannel){var logChannel = channel.guild.channels.cache.find(x => x.id === client.config.logChannel)}

    const log = new Discord.MessageEmbed()
        .setColor(client.config.colour)
        .setTitle(client.l.events.pins.update)
        .setDescription(`${client.l.gen.logs.channel} ${channel}\n${client.l.events.pins.changed}\n${client.l.events.pins.checkPins}`)
        .setTimestamp(time)
    logChannel.send(log)

}

// © Hawsk Romania Discord Bot | Do Not Copy