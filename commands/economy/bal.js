const discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
    message.delete()

    let balance = db.fetch(`money_${message.guild.id}_${message.author.id}`)
    if (balance === null) balance = 0;
	
	let bank = await db.fetch(`bank_${message.guild.id}_${message.author.id}`)
    if (bank === null) bank = 0;

    const Embed = new discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()) 	    
		.setDescription(`${client.l.eco.balance.wallet} ${client.config.economy.currency}${balance} \n${client.l.eco.balance.bank} ${client.config.economy.currency}${bank}`)
        .setFooter(client.l.eco.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
		.setColor(client.config.colour)
	message.channel.send(Embed);
}

// © Hawsk Romania Discord Bot | Do Not Copy