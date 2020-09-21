const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    message.delete()

    var user = message.mentions.users.first(); 

    var amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])

    if (!amount) return client.missingArguments(client.command, client.l.moderation.clear.usage)
    if (amount > 99) return client.missingArguments(client.command, client.l.moderation.clear.usage)
    
    let tempAmount = amount
    
    message.channel.messages.fetch({limit: tempAmount,
    }).then((messages) => {if (user) {const filterBy = user ? user.id : bot.user.id
        messages = messages.filter(m => m.author.id === filterBy)
        .array().slice(0, tempAmount);}
        
        message.channel.bulkDelete(messages).catch(error => console.log(error.stack))})
        
        const m = await message.channel.send(new Discord.MessageEmbed()
            .setDescription(client.l.moderation.clear.cleared.replace('%AMOUNT%', amount))
            .setColor(client.config.colour)
            .setFooter(client.l.moderation.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username)))

        setTimeout(() => {
            m.delete()
            client.log(client.l.moderation.clear.log, `${client.l.gen.logs.user} ${message.author}\n${client.l.gen.logs.channel} ${message.channel}\n${client.l.gen.logs.amount} ${tempAmount}\n${client.l.gen.logs.sentBy} ${user}`)
        }, 3000)


}

// © Hawsk Romania Discord Bot | Do Not Copy
