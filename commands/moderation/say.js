const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    message.delete()

    if(!args.join(" ")) return client.missingArguments(client.command, client.l.moderation.say.usage)

    var sayMessage = args.join(" ")

    var sayembed = new Discord.MessageEmbed()
        .setDescription(`\n${sayMessage}`)
        .setColor(client.config.colour)
        
    message.channel.send(sayembed)

    client.log(client.l.moderation.say.log, `${client.l.gen.logs.user} ${message.author} (${message.author.id})\n${client.l.gen.logs.channel} ${message.channel}\n${client.l.gen.logs.message} ${sayMessage}`)
    
}

// © Hawsk Romania Discord Bot | Do Not Copy