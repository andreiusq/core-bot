const Discord = require("discord.js");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

exports.run = async (client, message, args) => {
    if(client.config.ticketSystem === "off") return;
    message.delete()

    const notATicketChannel = new Discord.MessageEmbed()
        .setColor(client.config.colour)
        .setTitle(client.l.tick.onlyInClosedTicketChannel)
        .setFooter(client.l.tick.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
        
    if (!message.channel.name.startsWith(`closed-`)) {const fail = await message.channel.send(notATicketChannel);setTimeout(() => {fail.delete()}, 6000);return}
    
    const confirm = new Discord.MessageEmbed()
        .setColor(client.config.colour)
        .setTitle(client.l.tick.delete.areYouSure)
        .setDescription(`${client.l.tick.delete.willBeDeleted}
        \n${client.l.tick.delete.react}
        *${client.l.tick.delete.voidTime}*`)
        .setFooter(client.l.tick.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username), client.user.avatarURL())
        
    const not = new Discord.MessageEmbed()
        .setColor(client.config.colour)
        .setTitle(client.l.tick.delete.notDeleted)
        .setFooter(client.l.tick.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
        
    const failed = new Discord.MessageEmbed()
        .setColor(client.config.colour)
        .setTitle(client.l.tick.delete.failed)
        .setFooter(client.l.tick.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

    let pos = ["no", "yes"]
    let n = getRandomInt(3);
    result = pos[n]
    const filter = (reaction, user) => {
        return ['❌', '✅'].includes(reaction.emoji.name) && user.id === message.author.id;
    };
    message.channel.send(confirm).then((m) => {
        m.react("❌").then(() => m.react("✅"))
        .then(() => {
            m.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first()
                    n = getRandomInt(3);
                    result = undefined
                    result = pos[n]
            
                    if (reaction.emoji.name === '❌') {
                        message.channel.send(not)
                    }
                    else if (reaction.emoji.name === '✅'){
                        client.log(client.l.tick.delete.log, `${client.l.gen.logs.user} ${message.author}\n${client.l.gen.logs.channel} ${message.channel.name}`)

                        client.logChannel.send({
                            files: [`${client.root}/commands/tickets/transcripts/transcript-${message.channel.id}.html`]
                        })
                        
                        setTimeout(() => {
                            message.channel.delete()
                        }, 2000)
                    }
                    
                    m.reactions.removeAll()
                }).catch(() => {message.channel.send(failed)} )
        })
    })

}

// © Hawsk Romania Discord Bot | Do Not Copy