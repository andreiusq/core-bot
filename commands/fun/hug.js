const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    message.delete()

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!user) return client.missingArguments(client.command, client.l.fun.hug.usage)

    var gif = client.config.hug[Math.floor(Math.random()*client.config.hug.length)]

    let hugEmbed = new Discord.MessageEmbed()
        .setDescription(client.l.fun.hug.hugged.replace('%SENDER%', message.author).replace('%RECIVER%', user))
        .setImage(gif)
        .setColor(client.config.colour)
        .setFooter(client.l.fun.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

    message.channel.send(hugEmbed)
    
}

// © Hawsk Romania Discord Bot | Do Not Copy
