const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    message.delete()
    
    const item = args.join(" ")
    if (!item) return client.missingArguments(client.command, client.l.fun.rate.usage)

    var rand = [1,2,3,4,5,6,7,8,9,10]

    var rate = rand[Math.floor(Math.random()*rand.length)]

    let embed = new Discord.MessageEmbed()
        .setColor(client.config.colour)
        .setDescription(client.l.fun.rate.rate.replace('%ITEM%', item).replace('%RATING%', rate))
        .setFooter(client.l.fun.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
    message.channel.send(embed)

}

// © Hawsk Romania Discord Bot | Do Not Copy