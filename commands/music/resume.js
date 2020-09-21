const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    message.delete()
    
    let noMusicMsg = new Discord.MessageEmbed()
        .setTitle(client.l.music.resume.noMusic)
        .setColor(client.config.colour)
        .setFooter(client.l.music.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

    let notConnectedMsg = new Discord.MessageEmbed()
        .setTitle(client.l.music.resume.notConnected)
        .setColor(client.config.colour)
        .setFooter(client.l.music.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

    let notPausedMsg = new Discord.MessageEmbed()
        .setTitle(client.l.music.resume.notPaused)
        .setColor(client.config.colour)
        .setFooter(client.l.music.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

    let fetched = client.active.get(message.guild.id)

    let resume = "%%__TIMESTAMP__%%"

    if(!fetched) return message.channel.send(noMusicMsg)

    if(message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send(notConnectedMsg)

    if(!fetched.dispatcher.paused) return message.channel.send(notPausedMsg)

    fetched.dispatcher.resume()

    let resumedMsg = new Discord.MessageEmbed()
        .setTitle(client.l.music.resume.resumed.replace('%SONG%', fetched.queue[0].songTitle))
        .setColor(client.config.colour)
        .setFooter(client.l.music.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

    message.channel.send(resumedMsg)

}

// © Hawsk Romania Discord Bot | Do Not Copy