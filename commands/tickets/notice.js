const Discord = require("discord.js");

exports.run = (client, message, args) => {
    if(client.config.ticketSystem === "off") return;
    message.delete()

    const notATicketChannel = new Discord.MessageEmbed()
        .setColor(client.config.colour)
        .setTitle(`🚫 ${client.l.tick.onlyInTicketChannel}`)    
        .setFooter(client.l.tick.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

    if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(notATicketChannel)
    
    message.channel.send(`<@${message.channel.topic.split("-")[0]}>`)
    
    var notice = new Discord.MessageEmbed()
        .setTitle(client.l.tick.notice.title)
        .setDescription(`${client.l.tick.notice.message}
                         ${client.l.tick.notice.close.replace('%CLOSE%', `\`${client.config.prefix}close\``)}
                         \n${client.l.tick.notice.noResponse}`)
        .setColor(client.config.colour)
        .setFooter(client.l.tick.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))              

    message.channel.send(notice)

}

// © Hawsk Romania Discord Bot | Do Not Copy