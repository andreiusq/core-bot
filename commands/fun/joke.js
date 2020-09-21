const Discord = require("discord.js");
const got = require('got');

exports.run = (client, message, args) => {
    message.delete()

    got('https://www.reddit.com/r/jokes/random/.json').then(response => {
        let content = JSON.parse(response.body);
        var title = content[0].data.children[0].data.title;
        var joke = content[0].data.children[0].data.selftext;
        wholeJoke = new Discord.MessageEmbed()
            .setTitle(`😹 **${title}**`)
            .setDescription(joke)
            .setColor(client.config.colour)
            .setFooter(client.l.fun.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
        message.channel.send(wholeJoke)
    }).catch(console.error);
    
}

// © Hawsk Romania Discord Bot | Do Not Copy