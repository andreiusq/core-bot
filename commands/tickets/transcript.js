const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    if(client.config.ticketSystem === "off") return;
    message.delete()

    const notATicketChannel = new Discord.MessageEmbed()
        .setColor(client.config.colour)
        .setTitle(client.l.tick.onlyInTicketChannel)
        .setFooter(client.l.tick.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

    if (!message.channel.name.startsWith(`ticket-`)) {const fail = await message.channel.send(notATicketChannel);setTimeout(() => {fail.delete()}, 6000);return}
    
    message.channel.send({
        files: [`${client.root}/commands/tickets/transcripts/transcript-${message.channel.id}.html`]
    })
    
}

// © Hawsk Romania Discord Bot | Do Not Copy