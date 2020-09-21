const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    message.delete()

    const future = args.join(" ");
    if (!future) return client.missingArguments(client.command, client.l.fun.eightBall.usage)

    var rand = client.l.fun.eightBall.options
    var response = rand[Math.floor(Math.random()*rand.length)]

    let embed = new Discord.MessageEmbed()
        .setColor(client.config.colour)
        .setDescription(client.l.fun.eightBall.future.replace('%FUTURE%', future).replace('%RESPONSE%', response))
        .setFooter(client.l.fun.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
    
    message.channel.send(embed)

}

// © Hawsk Romania Discord Bot | Do Not Copy