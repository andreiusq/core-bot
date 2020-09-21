const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    const giveaways = require(client.dir + '/custom_modules/giveaways.js')
    message.delete()

    let messageID = args[0];

    if (!messageID) return client.missingArguments(client.command, client.l.giveaways.greroll.usage)

    else {
        client.giveawaysManager.reroll(messageID).then(() => {
            let rerollEmb = new Discord.MessageEmbed()
                .setTitle(`${client.l.giveaways.greroll.rerolled}`)
                .setColor(client.config.colour)
                .setFooter(client.l.giveaways.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
            message.channel.send(rerollEmb)
        }).catch((err) => {
            let errEmb = new Discord.MessageEmbed()
                .setTitle(`${client.l.giveaways.err}`)
                .setColor(client.config.colour)
                .setFooter(client.l.giveaways.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
            message.channel.send(errEmb)
        });
    }

} 

// © Hawsk Romania Discord Bot | Do Not Copy