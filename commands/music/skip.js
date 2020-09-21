const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    message.delete()

    let fetched = client.active.get(message.guild.id)

    let noQueueMsg = new Discord.MessageEmbed()
        .setTitle(client.l.music.skip.noQueue)
        .setColor(client.config.colour)
        .setFooter(client.l.music.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

    let noMusicMsg = new Discord.MessageEmbed()
        .setTitle(client.l.music.skip.noMusic)
        .setColor(client.config.colour)
        .setFooter(client.l.music.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

    let notConnectedMsg = new Discord.MessageEmbed()
        .setTitle(client.l.music.skip.notConnected)
        .setColor(client.config.colour)
        .setFooter(client.l.music.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

    if (!fetched.queue[1]) return message.channel.send(noQueueMsg)

    if(!fetched) return message.channel.send(noMusicMsg)

    if(message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send(notConnectedMsg)

    let skippedMsg = new Discord.MessageEmbed()
        .setTitle(client.l.music.skip.skipped)
        .setColor(client.config.colour)
        .setFooter(client.l.music.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

    message.channel.send(skippedMsg)

    fetched.dispatcher.emit('finish')
 
}

// © Hawsk Romania Discord Bot | Do Not Copy