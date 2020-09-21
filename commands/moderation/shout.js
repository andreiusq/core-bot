const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    message.delete()

    if(!args.join(" ")) return client.missingArguments(client.command, client.l.moderation.shout.usage)
   
    var shoutMessage = args.join(" ")

    var shoutEmbed = new Discord.MessageEmbed()
        .setTitle(`\n${shoutMessage}`)
        .setColor(client.config.colour)
        
    message.channel.send(shoutEmbed)

    client.log(client.l.moderation.shout.log, `${client.l.gen.logs.user} ${message.author} (${message.author.id})\n${client.l.gen.logs.channel} ${message.channel}\n${client.l.gen.logs.message} ${shoutMessage}`)

}

// © Hawsk Romania Discord Bot | Do Not Copy