const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    message.delete()

    let messageID = args[0];

    if (!messageID) return client.missingArguments(client.command, client.l.giveaways.gdelete.usage)

    else {
        client.giveawaysManager.delete(messageID).then(() => {
            let deletedEmb = new Discord.MessageEmbed()
                .setTitle(`${client.l.giveaways.gdelete.deleted}`)
                .setColor(client.config.colour)
                .setFooter(client.l.giveaways.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
            message.channel.send(deletedEmb)
        }).catch((err) => {
            let errEmb = new Discord.MessageEmbed()
                .setTitle(`${client.l.giveaways.err}`)
                .setColor(client.config.colour)
                .setFooter(client.l.giveaways.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
            message.channel.send(errEmb)
        })
    }

}

// © Hawsk Romania Discord Bot | Do Not Copy 