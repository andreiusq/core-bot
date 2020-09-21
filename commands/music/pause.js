const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    message.delete()

    let noMusicMsg = new Discord.MessageEmbed()
        .setTitle(client.l.music.pause.noMusic)
        .setColor(client.config.colour)
        .setFooter(client.l.music.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

    let notConnectedMsg = new Discord.MessageEmbed()
        .setTitle(client.l.music.pause.notConnected)
        .setColor(client.config.colour)
        .setFooter(client.l.music.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

    let alreadyPausedMsg = new Discord.MessageEmbed()
        .setTitle(client.l.music.pause.alreadyPaused)
        .setColor(client.config.colour)
        .setFooter(client.l.music.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

    let fetched = client.active.get(message.guild.id)

    if(!fetched) return message.channel.send(noMusicMsg)

    if(message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send(notConnectedMsg)

    if(fetched.dispatcher.paused) return message.channel.send(alreadyPausedMsg)

    fetched.dispatcher.pause(true)

    let pausedMsg = new Discord.MessageEmbed()
        .setTitle(client.l.music.pause.paused.replace('%SONG%', fetched.queue[0].songTitle))
        .setColor(client.config.colour)
        .setFooter(client.l.music.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
    message.channel.send(pausedMsg)
    
}

// © Hawsk Romania Discord Bot | Do Not Copy