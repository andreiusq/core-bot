const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    message.delete()

    let notConnectedMsg = new Discord.MessageEmbed()
        .setTitle(client.l.music.leave.notConnected)
        .setColor(client.config.colour)
        .setFooter(client.l.music.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

    let botNotConnectedMsg = new Discord.MessageEmbed()
        .setTitle(client.l.music.leave.botNotConnected)
        .setColor(client.config.colour)
        .setFooter(client.l.music.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

    if(!message.member.voice.channel) return message.channel.send(notConnectedMsg)
    if(!message.guild.me.voice.channel) return message.channel.send(botNotConnectedMsg)

    if(message.guild.me.voice.channelID !== message.member.voice.channelID) return message.channel.send(notConnectedMsg)

    message.guild.me.voice.channel.leave()
    client.active = new Map()

    let leaveChannelMsg = new Discord.MessageEmbed()
        .setTitle(client.l.music.leave.leavingChannel)
        .setColor(client.config.colour)
        .setFooter(client.l.music.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

    message.channel.send(leaveChannelMsg)

}

// © Hawsk Romania Discord Bot | Do Not Copy