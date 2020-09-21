const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    message.delete()

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!user) return client.missingArguments(client.command, client.l.fun.slap.usage)

    var gif = client.config.slap[Math.floor(Math.random()*client.config.slap.length)]

    let slapEmbed = new Discord.MessageEmbed()
        .setDescription(client.l.fun.slap.slapped.replace('%SENDER%', message.author).replace('%RECIVER%', user))
        .setImage(gif)
        .setColor(client.config.colour)
        .setFooter(client.l.fun.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))  

    message.channel.send(slapEmbed)

}

// © Hawsk Romania Discord Bot | Do Not Copy
