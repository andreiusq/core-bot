const Discord = require("discord.js");
const ytdl = require('ytdl-core')

exports.run = async (client, message, args) => {

    let myChannel = message.channel

    let connectMsg = new Discord.MessageEmbed()
        .setTitle(client.l.music.play.connectToVC)
        .setColor(client.config.colour)
        .setFooter(client.l.music.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

    if(!message.member.voice.channel) return message.channel.send(connectMsg)

    if(!args[0]) return client.missingArguments(client.command, client.l.music.play.usage)

    let validate = await ytdl.validateURL(args[0])

    if(!validate) {
        let commandFile = require('./search.js')
        return commandFile.run(client, message, args)
    }

    let info = await ytdl.getInfo(args[0])

    let data = client.active.get(message.guild.id) || {}

    if(!data.connection) data.connection = await message.member.voice.channel.join()
    if(!data.queue) data.queue = []
    data.guildID = message.guild.id

    data.queue.push({
        songTitle: info.title,
        requester: message.author.tag,
        url:  args[0],
        announceChannel: message.channel.id
    })

    message.delete()

    if (!data.dispatcher) play(client, data)
    
    else {
        
        let addedSongMsg = new Discord.MessageEmbed()
            .setTitle(client.l.music.play.addedSong)
            .setColor(client.config.colour)
            .setDescription(`**${client.l.music.play.songName}** [${info.title}](${info.url})\n**${client.l.music.play.requestedBy}** ${message.author.tag}`)
            .setFooter(client.l.music.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
        myChannel.send(addedSongMsg)
    }
    
    client.active.set(message.guild.id, data)
}

async function play(client, data){
    
    let nowPlayingMsg = new Discord.MessageEmbed()
        .setTitle(client.l.music.play.nowPlayingTitle)
        .setColor(client.config.colour)
        .setDescription(`**${client.l.music.play.nowPlaying}** [${data.queue[0].songTitle}](${data.queue[0].url})\n**${client.l.music.play.requestedBy}** ${data.queue[0].requester}`)
        .setFooter(`${client.l.music.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', data.queue[0].requester)}`)
    client.channels.cache.get(data.queue[0].announceChannel).send(nowPlayingMsg)
    
    data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, {filter: 'audioonly'}))
    data.dispatcher.guildID = data.guildID

    data.dispatcher.once('finish', function() {

        finish(client, this)
    })
}

function finish(client, dispatcher){
    let fetched = client.active.get(dispatcher.guildID)

    fetched.queue.shift()

    if(fetched.queue.length > 0) {
        client.active.set(dispatcher.guildID, fetched)
        play(client, fetched)
    }
    else{
        client.active.delete(dispatcher.guildID)
        let vc = client.guilds.cache.get(dispatcher.guildID).me.voice.channel
        if(vc) vc.leave()
    }
}


// © Hawsk Romania Discord Bot | Do Not Copy