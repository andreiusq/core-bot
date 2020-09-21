const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    message.delete()

    let fetched = client.active.get(message.guild.id)

    let noMusicPlayingMSG = new Discord.MessageEmbed()
        .setTitle(client.l.music.queue.noMusic)
        .setColor(client.config.colour)
        .setFooter(client.l.music.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

    if(!fetched) return message.channel.send(noMusicPlayingMSG)

    let queue = fetched.queue
    let nowPlaying = queue[0]

    let queueMsg = new Discord.MessageEmbed()
        .setTitle(client.l.music.queue.queue)
        .setColor(client.config.colour)
        .setDescription(`**${client.l.music.queue.nowPlaying}** [${nowPlaying.songTitle}](${nowPlaying.url})\n**${client.l.music.queue.requestedBy}** ${nowPlaying.requester}`)
        .setFooter(client.l.music.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))  

    for(var i = 1; i < queue.length; i++){
        queueMsg.addField(`[**${i}**] **${client.l.music.queue.requestedBy}** ${queue[i].requester}`, `[${queue[i].songTitle}](${queue[i].url})`)
    }

    message.channel.send(queueMsg)
 
}

// © Hawsk Romania Discord Bot | Do Not Copy