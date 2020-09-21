const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (client, message, args,) => {
    message.delete()
	
    let money = await db.fetch(`money_${message.guild.id}_${message.author.id}`)
    let bank = await db.fetch(`bank_${message.guild.id}_${message.author.id}`)
	let member = db.fetch(`bank_${message.guild.id}_${message.author.id}`)
	
    const numbersOnlyEmbed = new Discord.MessageEmbed()
	  .setDescription(`${client.l.eco.withdraw.numbersOnly}`)
	  .setColor(client.config.colour)
      .setFooter(client.l.eco.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
	  
	const noNegativesEmbed = new Discord.MessageEmbed()
	  .setDescription(`${client.l.eco.withdraw.noNegatives}`)
	  .setColor(client.config.colour)
	  .setFooter(client.l.eco.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

    if (args[0] == null) { return client.missingArguments(client.command, client.l.eco.withdraw.usage) }    

    else if (bank < args[0]) {
        let Embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()) 
            .setDescription(`${client.l.eco.withdraw.notEnough}`)
            .setColor(client.config.colour)
            .setFooter(client.l.eco.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
        message.channel.send(Embed)
    }
	
	else if (message.content.startsWith(`${client.config.prefix}${client.sentCommand} -`)) { 
      return message.channel.send(noNegativesEmbed)
	}
	
	else if (isNaN(args[0])) {
	  return message.channel.send(numbersOnlyEmbed)
	}
	
	else if (bank => args[0]) {
        let Embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()) 
            .setDescription(client.l.eco.withdraw.withdrawn.replace('%USER%', message.author).replace('%AMOUNT%', args[0]).replace('%CURRENCY%', client.config.economy.currency))
            .setColor(client.config.colour)
            .setFooter(client.l.eco.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
        message.channel.send(Embed)
		
	    db.add(`money_${message.guild.id}_${message.author.id}`, args[0])
        db.subtract(`bank_${message.guild.id}_${message.author.id}`, args[0])
  }

}

// © Hawsk Romania Discord Bot | Do Not Copy

