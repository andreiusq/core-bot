const Discord = require("discord.js");

exports.run = (client, message, args) => {
    if(client.config.levelSystem === "off") return;
    message.delete()

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));

    if(!user) {
        score = client.getScore.get(message.author.id, message.guild.id)
        let level = new Discord.MessageEmbed()
            .setColor(client.config.colour)
            .setAuthor(`${client.config.serverName}`,client.user.avatarURL())
            .setTitle(`🎉 ${client.l.levels.level.levelinfo} **${message.author.username}**`)
            .addField(`➡️ ${client.l.levels.level.curentlevel}`, `**${score.level}**`, true)
            .addField(`🔢 ${client.l.levels.level.totalpoints}`, `**${score.points}**`, true)
            .setFooter(client.l.levels.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
        message.channel.send(level)
    }
    else{
        username = client.users.cache.get(`${user.id}`)
        score = client.getScore.get(user.id, message.guild.id)
        let level = new Discord.MessageEmbed()
            .setColor(client.config.colour)
            .setAuthor(`${client.config.serverName}`,client.user.avatarURL())
            .setTitle(`🎉 ${client.l.levels.level.levelinfo} **${username.username}**`)
            .addField(`➡️ ${client.l.levels.level.curentlevel}`, `**${score.level}**`, true)
            .addField(`🔢 ${client.l.levels.level.totalpoints}`, `**${score.points}**`, true)
            .setFooter(client.l.levels.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
        message.channel.send(level)
    }

}

// © Hawsk Romania Discord Bot | Do Not Copy