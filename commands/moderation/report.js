const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    message.delete()

    const staffMember = new Discord.MessageEmbed()
      .setColor(client.config.colour)
      .setTitle(client.l.moderation.cantPunish)
      .setFooter(client.l.moderation.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))  

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    var reason = args.join(" ").slice(22);

    if(!user) return client.missingArguments(client.command, client.l.moderation.report.usage)
    if(!reason) return client.missingArguments(client.command, client.l.moderation.report.usage)
    
    let roles = []
    client.config.exemptFromPunishments.forEach(role => roles.push(client.findRole(role)))
    flag = false
    roles.forEach(role => {if(user.roles.cache.find(r => r.id === role.id)) flag = true})
    if(flag === true) {const fail = await message.channel.send(staffMember);setTimeout(() => {fail.delete()}, 6000);return}
    
    const reportmsg = new Discord.MessageEmbed()
      .setColor(client.config.colour)
      .setTitle(client.l.moderation.report.reported)
      .setDescription(`${client.l.gen.logs.user} ${user}\n${client.l.moderation.report.reportedBy} ${message.author}\n${client.l.gen.logs.reason} ${reason}`) 
      .setFooter(client.l.moderation.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))    
    message.channel.send(reportmsg)

    const report = new Discord.MessageEmbed()
      .setColor(client.config.colour)
      .setTitle(client.l.moderation.report.report)
      .setDescription(`${client.l.gen.logs.user} ${user} (${user.id})\n${client.l.moderation.report.reportedBy} ${message.author} (${message.author.id})\n${client.l.gen.logs.reason} ${reason}`)
      .setTimestamp(message.createdAt)
    client.reportChannel.send(report)

    client.log(client.l.moderation.report.log, `${client.l.gen.logs.user} ${user} (${user.id})\n${client.l.gen.logs.reportedBy} ${message.author} (${message.author.id})\n${client.l.gen.logs.reason} ${reason}`)

}

// © Hawsk Romania Discord Bot | Do Not Copy
