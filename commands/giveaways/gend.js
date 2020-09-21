const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    message.delete()

    let messageID = args[0];

    if (!messageID) return client.missingArguments(client.command, client.l.giveaways.gend.usage)

    else {
        let g = client.giveawaysManager.giveaways.filter(gi=>gi.messageID===messageID);
        if (g[0]) {
            client.giveawaysManager.edit(messageID, {
                addTime: parseInt(parseInt(g[0].endAt - Date.now())*-1) + 6000}).then(() => {
                let endEmb = new Discord.MessageEmbed()
                    .setTitle(`${client.l.giveaways.gend.ended}`)
                    .setColor(client.config.colour)
                    .setFooter(client.l.giveaways.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
                message.channel.send(endEmb)
            })
        }
        else {
            let errEmb = new Discord.MessageEmbed()
                .setTitle(`${client.l.giveaways.err}`)
                .setColor(client.config.colour)
                .setFooter(client.l.giveaways.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
            message.channel.send(errEmb)
        }
    }

}

// © Hawsk Romania Discord Bot | Do Not Copy