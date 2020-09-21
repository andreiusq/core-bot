const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    if(client.config.ticketSystem === "off") return;
    message.delete()

    const notATicketChannel = new Discord.MessageEmbed()
        .setColor(client.config.colour)
        .setTitle(client.l.tick.onlyInTicketChannel)    
        .setFooter(client.l.tick.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
    if (!message.channel.name.startsWith(`ticket-`)) {const fail = await message.channel.send(notATicketChannel); wait(3000); fail.delete()}
    
    const lowered = new Discord.MessageEmbed()
        .setColor(client.config.colour)
        .setDescription(client.l.tick.lower.lowered)
        .setFooter(client.l.tick.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
    message.channel.send(lowered)

    let roles = []
    client.config.canSeeTicket.forEach(role => roles.push(client.findRole(role)))
    roles.forEach(role => {message.channel.createOverwrite(role, {SEND_MESSAGES: true, VIEW_CHANNEL: true, EMBED_LINKS: true, ATTACH_FILES: true})})

}

// © Hawsk Romania Discord Bot | Do Not Copy