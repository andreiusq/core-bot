const db = require('quick.db')
const Discord = require('discord.js')

const talkedRecently = new Set();

exports.run = async (client, message, args,) => {
    message.delete()

    let temp = `${args[0]}`
    let type = temp.toLowerCase()

    var types = []
    client.config.economy.jobs.forEach(element => types.push(element[0].toLowerCase()))

    async function work(job, min, max){
        let amount = Math.floor(Math.random() * (max - min + 1) + min); 
        let Embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()) 
            .setDescription(client.l.eco.work.worked.replace('%USER%', message.author).replace('%JOB%', job).replace('%CURRENCY%', client.config.economy.currency).replace('%AMOUNT%', amount))
            .setColor(client.config.colour)
            .setFooter(client.l.eco.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
        message.channel.send(Embed)
        db.add(`money_${message.guild.id}_${message.author.id}`, amount)
    }

    if ((args[0] == null) || !(types.includes(type)) ) {
        let Embed = new Discord.MessageEmbed()
            .setTitle(`⚒️ ${client.l.eco.work.helpTitle}`)
            .setDescription(`${client.l.gen.err.usage} \`${client.config.prefix}${client.command} ${client.l.eco.work.usage}\` \n ${client.l.eco.work.helpMessage}`)
            .setColor(client.config.colour)
            .setFooter(client.l.eco.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
        
        client.config.economy.jobs.forEach(element => {
            Embed.addField(`${element[0]}`, `\n${client.config.economy.currency}${element[1]} - ${client.config.economy.currency}${element[2]}`, true)
        })

        const fail = await message.channel.send(Embed)

        setTimeout(() => {
            fail.delete()
          }, 6000)

        return
    }        
    
    if (talkedRecently.has(message.author.id)) {
        let Embed = new Discord.MessageEmbed()
            .setTitle(client.l.gen.err.coolDownTitle)
            .setDescription(`${client.l.gen.err.coolDownMessage} **${client.config.economy.workCooldown/60000} mins**.`)
            .setColor(client.config.colour)
            .setFooter(client.l.eco.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
        const fail = await message.channel.send(Embed);setTimeout(() => {fail.delete()}, 6000);return
    } 
    else {
        client.config.economy.jobs.forEach(element => {
            if(element[0] == type){
                work(element[0], element[1], element[2])
            }
        })

        talkedRecently.add(message.author.id)
        setTimeout(() => {talkedRecently.delete(message.author.id)},client.config.economy.workCooldown)

    }

}

// © Hawsk Romania Discord Bot | Do Not Copy

