const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (client, message, args,) => {
  message.delete()

  let money = await db.fetch(`money_${message.guild.id}_${message.author.id}`)
  let bank = await db.fetch(`bank_${message.guild.id}_${message.author.id}`)
	let member = db.fetch(`bank_${message.guild.id}_${message.author.id}`)
	
	const numbersOnlyembed = new Discord.MessageEmbed()
	  .setDescription(client.l.eco.deposit.numbersOnly)
	  .setColor(client.config.colour)
      .setFooter(client.l.eco.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
	  
	const noNegativesEmbed = new Discord.MessageEmbed()
	  .setDescription(client.l.eco.deposit.noNegatives)
	  .setColor(client.config.colour)
    .setFooter(client.l.eco.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
    
  if (args[0] == null) { return client.missingArguments(client.command, client.l.eco.deposit.usage) }      
  
  else if (money < args[0]) {
      let Embed = new Discord.MessageEmbed()
          .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()) 
          .setDescription(client.l.eco.deposit.notEnough)
          .setColor(client.config.colour)
          .setFooter(client.l.eco.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
      message.channel.send(Embed)
  }
	
	else if (message.content.startsWith(`${client.config.prefix}${client.sentCommand} -`)) { 
      return message.channel.send(noNegativesEmbed)
	}
	
	else if (isNaN(args[0])) {
	  return message.channel.send(numbersOnlyembed)
	}
	
	else if (money => args[0]) {
        let Embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()) 
            .setDescription(client.l.eco.deposit.deposited.replace('%USER%', message.author).replace('%AMOUNT%', args[0]).replace('%CURRENCY%', client.config.economy.currency))
            .setColor(client.config.colour)
            .setFooter(client.l.eco.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
        message.channel.send(Embed)
		
	    db.subtract(`money_${message.guild.id}_${message.author.id}`, args[0])
        db.add(`bank_${message.guild.id}_${message.author.id}`, args[0])
  }

}

// © Hawsk Romania Discord Bot | Do Not Copy

