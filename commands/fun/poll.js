const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    message.delete()
    
    let poll = args.join(" ");
    if(!poll) return client.missingArguments(client.command, client.l.fun.poll.usage)
    
    let pollEmbed = new Discord.MessageEmbed()
        .setColor(client.config.colour)
        .setTitle(client.l.fun.poll.pollTitle)
        .setDescription(client.l.fun.poll.poll.replace('%POLL%', poll))
        .setFooter(client.l.fun.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))  
 
    message.channel.send(pollEmbed).then(function (message) {message.react(`👍`).then(() => {message.react(`👎`)})})

    const log = new Discord.MessageEmbed()
      .setColor(client.config.colour)
      .setTitle(`🗒 ${client.l.fun.poll.logs.logTitle}`)
      .setDescription(`${client.l.gen.logs.user} ${message.author} (${message.author.id})\n${client.l.gen.logs.poll} ${poll}\n${client.l.gen.logs.time} ${message.createdAt}`) 
    client.logChannel.send(log)

}

// © Hawsk Romania Discord Bot | Do Not Copy