const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    message.delete()

    if(!args.join(" "))  return client.missingArguments(client.command, client.l.moderation.speak.usage)
   
    var speakMessage = args.join(" ")
        
    message.channel.send(speakMessage)
      
    client.log(client.l.moderation.speak.log, `${client.l.gen.logs.user} ${message.author} (${message.author.id})\n${client.l.gen.logs.channel} ${message.channel}\n${client.l.gen.logs.message} ${speakMessage}`)

}

// © Hawsk Romania Discord Bot | Do Not Copy