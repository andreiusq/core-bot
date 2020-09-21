const discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
    message.delete()

    const embed = new discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()) 	    
        .setFooter(client.l.eco.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
        .setColor(client.config.colour)
        
    let desc = `**${client.l.eco.shop.shop}**\n\n`
    client.config.economy.roleShop.forEach(item => {embed.addField(`${item[0]}`,`${client.config.economy.currency}${item[1]}`, true)})

    embed.setDescription(desc)

	message.channel.send(embed)
}

// © Hawsk Romania Discord Bot | Do Not Copy