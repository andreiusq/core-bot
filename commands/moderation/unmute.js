const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    message.delete()

    const staffMember = new Discord.MessageEmbed()
      .setColor(client.config.colour)
      .setTitle(client.l.moderation.cantPunish)
      .setFooter(client.l.moderation.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));

    if(!user) return client.missingArguments(client.command, client.l.moderation.unmute.usage)

    let roles = []
    client.config.exemptFromPunishments.forEach(role => roles.push(client.findRole(role)))
    flag = false
    roles.forEach(role => {if(user.roles.cache.find(r => r.id === role.id)) flag = true})
    if(flag === true) {const fail = await message.channel.send(staffMember);setTimeout(() => {fail.delete()}, 6000);return}
    
    const unmuted = new Discord.MessageEmbed()
      .setColor(client.config.colour)
      .setTitle(client.l.moderation.unmute.unmuted)
      .setDescription(`${client.l.gen.logs.user} ${user}\n${client.l.gen.logs.staffMember} ${message.author}`)    
      .setFooter(client.l.moderation.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))  

    const DM = new Discord.MessageEmbed()
      .setColor(client.config.colour)
      .setTitle(client.l.moderation.unmute.dm.replace('%SERVERNAME%', client.config.serverName))
      .setDescription(`${client.l.gen.logs.staffMember} ${message.author}`)  

    user.send(DM)

    message.channel.send(unmuted)
    
    user.roles.remove(client.mutedRole) 

    client.log(client.l.moderation.unmute.log, `${client.l.gen.logs.user} ${user}\n${client.l.gen.logs.staffMember} ${message.author}`)

}

// © Hawsk Romania Discord Bot | Do Not Copy