const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    if(client.config.ticketSystem === "off") return;
    message.delete()

    const notATicketChannel = new Discord.MessageEmbed()
        .setColor(client.config.colour)
        .setTitle(client.l.tick.onlyInTicketChannel)    
        .setFooter(client.l.tick.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
    
    if (!message.channel.name.startsWith(`ticket-`)) {const fail = await message.channel.send(notATicketChannel); wait(3000); fail.delete()}
    
    const raised = new Discord.MessageEmbed()
        .setColor(client.config.colour)
        .setDescription(client.l.tick.raise.raised)
        .setFooter(`${client.config.serverName} ${client.l.tick.footer}  ${message.author.username}`)
    message.channel.send(raised)

    let roles = []
    client.config.canSeeTicket.forEach(role => roles.push(client.findRole(role)))

    flag = false
    roles.forEach(role => {message.channel.createOverwrite(role, {VIEW_CHANNEL:false, SEND_MESSAGES:false})})

    let roles1 = []
    client.config.canSeeRaisedTicket.forEach(role => roles1.push(client.findRole(role)))

    flag = false
    roles1.forEach(role => {message.channel.createOverwrite(role, {VIEW_CHANNEL:true, SEND_MESSAGES:true})})


}

// © Hawsk Romania Discord Bot | Do Not Copy