const Discord = require("discord.js");

exports.run = (client, message, args) => {

    let today = new Date();
    let xmas = new Date(today.getFullYear(), 11, 24);
    if (today.getMonth() == 11 && today.getDate() > 24) {
    xmas.setFullYear(xmas.getFullYear() + 1);
    }
    let one_day = 1000 * 60 * 60 * 24;
    let daysleft = Math.ceil((xmas.getTime() - today.getTime()) / (one_day));
    let days = daysleft+1

    let embed = new Discord.MessageEmbed()
        .setTitle(client.l.fun.xmas.days.replace('%DAYS%', days))
        .setColor(client.config.colour)
        .setFooter(client.l.fun.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
    message.channel.send(embed)

}

// © Hawsk Romania Discord Bot | Do Not Copy