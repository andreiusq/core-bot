const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    message.delete()
    
    var roll = new Discord.MessageEmbed()

    roll.setColor(client.config.colour)
    roll.setFooter(client.l.fun.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))  
    roll.setDescription(`🎲 :one: ${client.l.fun.roll.rolling}`)

    var rollMessage = await message.channel.send(roll);

    async function change(num, rollMessage){
        roll.setDescription(`🎲 ${num} ${client.l.fun.roll.rolling}`)
        var rollMessage = await rollMessage.edit(roll);
    }

    change(":two:", rollMessage)
    change(":three:", rollMessage)
    change(":four:", rollMessage)
    change(":five:", rollMessage)
    change(":six:", rollMessage)

    var rand = [1,2,3,4,5,6]

    var rollNumber = rand[Math.floor(Math.random()*rand.length)]

    roll.setColor(client.config.colour)
    roll.setDescription(client.l.fun.roll.rolled.replace('%USER%', message.author.username).replace('%ROLL%', rollNumber))

    rollMessage.edit(roll)

}

// © Hawsk Romania Discord Bot | Do Not Copy