const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    if(client.config.ticketSystem === "off") return;
    message.delete()

    async function doCloseEvent(){

        const closed = new Discord.MessageEmbed()
            .setColor(client.config.colour)
            .setTitle(client.l.tick.close.closed)
            .setDescription(`${client.l.tick.close.managementView}
                        \n${client.l.tick.close.delete.replace('%DELETE%', `\`${client.config.prefix}delete\``)}.`)
            .setFooter(`${client.l.tick.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username)}`, client.user.avatarURL())

        message.channel.send(closed)

        client.log(client.l.tick.close.log, `${client.l.gen.logs.user} ${message.author}\n${client.l.gen.logs.channel} ${message.channel.name}`)

        username = client.users.cache.get(`${message.channel.topic.split("-")[0]}`)

        const dm = new Discord.MessageEmbed()
            .setColor(client.config.colour)
            .setTitle(client.l.tick.close.dm.closed.replace('%SERVERNAME%', client.config.serverName))
            .setDescription(`${client.l.tick.close.dm.message}\n\n${client.l.tick.close.dm.transcript}`)
            .setTimestamp(message.createdAt)

        if(username){
            message.channel.setName(`closed-${username.username}`)

            username.send(dm)

            username.send({
                files: [`${client.root}/commands/tickets/transcripts/transcript-${message.channel.id}.html`]
            })
        }
        else{
            message.channel.setName(`closed-unknown`)
        }

        let everyone = message.guild.roles.cache.find(x => x.name === "@everyone");

        const notATicketChannel = new Discord.MessageEmbed()
            .setColor(client.config.colour)
            .setTitle(client.l.tick.onlyInTicketChannel)
            .setFooter(client.l.tick.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

        if (!message.channel.name.startsWith(`ticket-`)) {const fail = await message.channel.send(notATicketChannel);setTimeout(() => {fail.delete()}, 6000);return}

        let roles = []
        client.config.canSeeTicket.forEach(role => roles.push(client.findRole(role)))

        flag = false
        roles.forEach(role => {message.channel.createOverwrite(role, {VIEW_CHANNEL:false, SEND_MESSAGES:false})})

        let roles1 = []
        client.config.canSeeClosedTicket.forEach(role => roles1.push(client.findRole(role)))

        flag = false
        roles1.forEach(role => {message.channel.createOverwrite(role, {VIEW_CHANNEL:true, SEND_MESSAGES:true})})

        message.channel.createOverwrite(everyone, {SEND_MESSAGES: false, VIEW_CHANNEL: false})

        message.channel.topic.split("-").forEach(element => {
            user = client.users.cache.get(element)
            message.channel.createOverwrite(user, {SEND_MESSAGES: false, VIEW_CHANNEL: false})
        })
    }

    var c = message.guild.channels.cache.find(x => x.name === `v${message.channel.name}`)
    if(c){

        const whatToClose = new Discord.MessageEmbed()
            .setColor(client.config.colour)
            .setTitle(client.l.tick.close.whichTicket)
            .setDescription(`${client.l.tick.close.voice} \n${client.l.tick.close.both}`)
            .setFooter(client.l.tick.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
    
        const filter = (reaction, user) => {
            return ['🎟️', '🔊'].includes(reaction.emoji.name) && user.id === message.author.id;
        };
        message.channel.send(whatToClose).then((m) => {
        m.react("🎟️").then(() => m.react("🔊")
        .then(() => {
        m.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
            .then(collected => {
                const reaction = collected.first()
        
                if (reaction.emoji.name === '🎟️') {
                    m.delete()
                    c.delete()
                    doCloseEvent()
                }
                else if (reaction.emoji.name === '🔊'){
                    whatToClose.setTitle(`${client.l.tick.close.voiceTicketClose}`)
                    whatToClose.setDescription("")
                    c.delete()
                    m.reactions.removeAll()
                    m.edit(whatToClose)
                }

        }).catch(() => {message.channel.send(embed(client.l.fun.rps.title,client.l.fun.rps.tooSlow))} )

        }))})
    
    }
    else{
        doCloseEvent()
    }       

}

// © Hawsk Romania Discord Bot | Do Not Copy