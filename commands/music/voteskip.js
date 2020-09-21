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

    let required = 2

    if(!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = []

    let alreadyVotedMsg = new Discord.MessageEmbed()
        .setTitle(client.l.music.skip.alreadyVoted.replace('%VOTES%', fetched.queue[0].voteSkips.length).replace('%REQUIRED%', required))
        .setColor(client.config.colour)
        .setFooter(client.l.music.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

    if (fetched.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(alreadyVotedMsg)

    fetched.queue[0].voteSkips.push(message.member.id)

    client.active.set(message.guild.id, fetched)

    if (fetched.queue[0].voteSkips.length >= required){

        let skippedMsg = new Discord.MessageEmbed()
            .setTitle(client.l.music.skip.skipped)
            .setColor(client.config.colour)
            .setFooter(client.l.music.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

        message.channel.send(skippedMsg)

        return fetched.dispatcher.emit('finish')
    }

    let votedMsg = new Discord.MessageEmbed()
        .setTitle(client.l.music.skip.voted.replace('%VOTES%', fetched.queue[0].voteSkips.length).replace('%REQUIRED%', required))
        .setColor(client.config.colour)
        .setFooter(client.l.music.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

    message.channel.send(votedMsg)

}

// © Hawsk Romania Discord Bot | Do Not Copy