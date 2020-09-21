const Discord = require("discord.js");

module.exports = (client, oldMessage, newMessage) => {
    try{
        if (oldMessage.author.bot) return;
    }
    catch{
        return
    } 

    var logChannel = newMessage.guild.channels.cache.find(x => x.name === client.config.logChannel)
    if(!logChannel){var logChannel = newMessage.guild.channels.cache.find(x => x.id === client.config.logChannel)}

    const log = new Discord.MessageEmbed()
        .setColor(client.config.colour)
        .setTitle(client.l.events.message.update)
        .setTimestamp(newMessage.createdAt)
    try{
        log.setDescription(`${client.l.gen.logs.user} ${newMessage.author}\n${client.l.gen.logs.channel} ${newMessage.channel}\n${client.l.events.message.msgID} ${newMessage.id}\n${client.l.events.message.oldMsg} ${oldMessage}\n${client.l.events.message.newMsg} ${newMessage}`)
        logChannel.send(log)
    }
    catch{
        log.setDescription(`${client.l.gen.logs.user} ${newMessage.author}\n${client.l.gen.logs.channel} ${newMessage.channel}\n${client.l.events.message.msgID} ${newMessage.id}\n${client.l.events.message.oldMsg} ${client.l.events.message.tooLong}\n${client.l.events.message.newMsg} ${client.l.events.message.tooLong}`)
        logChannel.send(log)
    }

}

// © Hawsk Romania Discord Bot | Do Not Copy