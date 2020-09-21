const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (client, message, args,) => {
    message.delete()

    if (args[0] == null) return client.missingArguments(client.command, client.l.eco.buy.usage)

    let input = args[0].toLowerCase()
    let rank = null
    let cost = null
    client.config.economy.roleShop.forEach(item => {if(item[0].toLowerCase() == input){rank = item[0]; cost = item[1]}})

	let author = db.fetch(`money_${message.guild.id}_${message.author.id}`)

    if (rank == null) return client.missingArguments(client.command, `<${client.l.eco.buy.usage}>`)    

    let notEnough = new Discord.MessageEmbed()
        .setTitle(client.l.eco.buy.notEnough.replace('%CURRENCY%', client.config.economy.currency).replace('%COST%', cost))
        .setColor(client.config.colour)

    let noRole = new Discord.MessageEmbed()
        .setTitle(client.l.eco.buy.noRole.replace('%ROLE%', rank))
        .setColor(client.config.colour)

    if (!client.findRole(rank)) return message.channel.send(noRole)
    if (author < cost) return message.channel.send(notEnough)
        
    let Embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()) 
        .setDescription(client.l.eco.buy.brought.replace('%USER%', message.author).replace('%ROLE%', rank).replace('%CURRENCY%', client.config.economy.currency).replace('%COST%', cost))
        .setColor(client.config.colour)
        .setFooter(client.l.eco.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
    message.channel.send(Embed)
    db.subtract(`money_${message.guild.id}_${message.author.id}`, cost)
    
    message.client.users.cache.get(message.author.id).roles.add(client.findRole(rank))

}

// © Hawsk Romania Discord Bot | Do Not Copy

