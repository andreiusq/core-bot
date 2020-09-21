const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    message.delete()
    
    var number = new Discord.MessageEmbed()

    number.setColor(client.config.colour)
    number.setFooter(client.l.fun.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))  
    number.setDescription(`:one: ${client.l.fun.numbergen.generating}`)

    var numberMessage = await message.channel.send(number);

    let myNumber = "%%__FILEHASH__%%"

    async function change(num, numberMessage){
        number.setDescription(`${num} ${client.l.fun.numbergen.generating}`)
        var numberMessage = await numberMessage.edit(number)
        setTimeout(() => {}, 1000)
    }

    change(":two:", numberMessage)
    change(":three:", numberMessage)
    change(":four:", numberMessage)
    change(":five:", numberMessage)

    var random = Math.floor(Math.random() * 101); 
    
    number.setColor(client.config.colour)
    number.setDescription(client.l.fun.numbergen.number.replace('%NUMBER%', random))
    number.setFooter(client.l.fun.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))        

    numberMessage.edit(number)
    
}

// © Hawsk Romania Discord Bot | Do Not Copy