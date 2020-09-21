const Discord = require("discord.js");

module.exports = (client, message) => {
    try{
        if (oldMessage.author.bot) return;
    }
    catch{
        return
    } 
    
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command)

    if(cmd){
        return
    }

    var logChannel = message.guild.channels.cache.find(x => x.name === client.config.logChannel)
    if(!logChannel){var logChannel = message.guild.channels.cache.find(x => x.id === client.config.logChannel)}

    const log = new Discord.MessageEmbed()
        .setColor(client.config.colour)
        .setTitle(client.l.events.message.delete)
        .setTimestamp(message.createdAt)
    try {
        log.setDescription(`${client.l.gen.logs.user} ${message.author}\n${client.l.gen.logs.channel} ${message.channel}\n${client.l.gen.logs.message} ${message}`)
        logChannel.send(log)
    }
    catch {
        log.setDescription(`${client.l.gen.logs.user} ${message.author}\n${client.l.gen.logs.channel} ${message.channel}\n${client.l.gen.logs.message} ${client.l.events.message.tooLong}`)
        logChannel.send(log)
    }

}

// © Hawsk Romania Discord Bot | Do Not Copy