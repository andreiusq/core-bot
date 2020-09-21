const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./data/udb.sqlite');

exports.run = async (client, message, args) => {

    var embedColor = client.config.colour
    
    var user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    let reason = args.slice(1).join(' ') 

    if(!user) return client.missingArguments(client.command, client.l.moderation.warn.usage)
    if(!reason) return client.missingArguments(client.command, client.l.moderation.warn.usage)

    var DM = new Discord.MessageEmbed()
        .setColor(embedColor)
        .setTitle(client.l.moderation.warn.dm.replace('%SERVERNAME%', client.config.serverName))
        .setDescription(`${client.l.gen.logs.staffMember} ${message.author}\n${client.l.gen.logs.reason} ${reason}`)  
    user.send(DM);

    var warnSuccessfulEmbed = new Discord.MessageEmbed() 
        .setColor(embedColor)
        .setTitle(client.l.moderation.warn.warned)
        .setDescription(`${client.l.gen.logs.user} ${user}\n${client.l.gen.logs.staffMember} ${message.author}\n${client.l.gen.logs.reason} ${reason}`) 
        .setFooter(client.l.moderation.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))  

    message.channel.send(warnSuccessfulEmbed); 
    message.delete(); 

    client.log(client.l.moderation.warn.log, `${client.l.gen.logs.user} - ${user} (${user.id})\n${client.l.gen.logs.staffMember} ${message.author} (${message.author.id})\n${client.l.gen.logs.reason} ${reason}`)

}

// © Hawsk Romania Discord Bot | Do Not Copy