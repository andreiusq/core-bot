const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    if(client.config.ticketSystem === "off") return;
    message.delete()

    const notATicketChannel = new Discord.MessageEmbed()
        .setColor(client.config.colour)
        .setTitle(client.l.tick.onlyInTicketChannel)   
        .setFooter(client.l.tick.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username)) 

    if (!message.channel.name.startsWith(`ticket-`) && !message.channel.name.startsWith(`closed-`)) {const fail = await message.channel.send(notATicketChannel);setTimeout(() => {fail.delete()}, 6000);return}
    
    var user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!user) return client.missingArguments(client.command, client.l.tick.remove.usage)

    const removed = new Discord.MessageEmbed()
        .setColor(client.config.colour)
        .setDescription(client.l.tick.remove.removed.replace('%USER%', user))
        .setFooter(client.l.tick.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
    message.channel.send(removed)

    message.channel.createOverwrite(user,{VIEW_CHANNEL:false,SEND_MESSAGES:false})

    const log = new Discord.MessageEmbed()
        .setColor(client.config.colour)
        .setTitle(`🗒 ${client.l.tick.remove.log}`)
        .setDescription(`${client.l.gen.logs.user} ${message.author}\n${client.l.gen.logs.channel}  ${message.channel}\n${client.l.gen.logs.removed} ${user}`)
        .setTimestamp(message.createdAt)
    client.logChannel.send(log)

}

// © Hawsk Romania Discord Bot | Do Not Copy