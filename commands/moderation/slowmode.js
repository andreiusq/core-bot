const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    message.delete()

    timeScale = args.join(" ")

    if (!timeScale) return client.missingArguments(client.command, client.l.moderation.slowmode.usage)

    if (timeScale === "0" || timeScale === "off"){
        message.channel.setRateLimitPerUser(0)
        const slow = new Discord.MessageEmbed()
            .setColor(client.config.colour)
            .setTitle(client.l.moderation.slowmode.off)
            .setFooter(client.l.moderation.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))  
        message.channel.send(slow)
        return
    }

    var timeAsInt = parseInt(timeScale)

    if(isNaN(timeScale)) return client.missingArguments(client.command, client.l.moderation.slowmode.usage)

    message.channel.setRateLimitPerUser(timeScale);

    const slow = new Discord.MessageEmbed()
      .setColor(client.config.colour)
      .setTitle(client.l.moderation.slowmode.set.replace('%TIME%', timeScale))
      .setFooter(client.l.moderation.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))  
    message.channel.send(slow)

    client.log(client.l.moderation.slowmode.log, `${client.l.gen.logs.staffMember} ${message.author} (${message.author.id})\n${client.l.gen.logs.channel} ${message.channel} (${message.channel.id})\n${client.l.gen.logs.time} ${timeScale}`)

}

// © Hawsk Romania Discord Bot | Do Not Copy