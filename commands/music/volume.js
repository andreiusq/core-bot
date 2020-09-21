const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    message.delete()

    let noMusicMsg = new Discord.MessageEmbed()
        .setTitle(client.l.music.volume.noMusic)
        .setColor(client.config.colour)
        .setFooter(client.l.music.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

    let notConnectedMsg = new Discord.MessageEmbed()
        .setTitle(client.l.music.volume.notConnected)
        .setColor(client.config.colour)
        .setFooter(client.l.music.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

    let fetched = client.active.get(message.guild.id)

    if(!fetched) return message.channel.send(noMusicMsg)

    if(message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send(notConnectedMsg)

    let selectANumberMsg = new Discord.MessageEmbed()
        .setTitle(client.l.music.volume.selectANumber)
        .setColor(client.config.colour)
        .setFooter(client.l.music.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

    if(isNaN(args[0]) || args[0] > 200 || args[0] < 0) return message.channel.send(selectANumberMsg)

    fetched.dispatcher.setVolume(args[0]/100)

    let volumeMsg = new Discord.MessageEmbed()
        .setTitle(client.l.music.volume.volume.replace('%SONG%', fetched.queue[0].songTitle).replace('%VOLUME%', args[0]))
        .setColor(client.config.colour)
        .setFooter(client.l.music.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

    message.channel.send(volumeMsg)

}