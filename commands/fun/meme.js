const Discord = require("discord.js");
const got = require('got');

exports.run = (client, message, args) => {
    message.delete()
    
    const embed = new Discord.MessageEmbed();
    got('https://www.reddit.com/r/dankmemes/random/.json').then(response => {
        let content = JSON.parse(response.body)
        let permalink = content[0].data.children[0].data.permalink
        let memeUrl = `https://reddit.com${permalink}`
        let memeImage = content[0].data.children[0].data.url
        let memeTitle = content[0].data.children[0].data.title
        let memeUpvotes = content[0].data.children[0].data.ups
        let memeDownvotes = content[0].data.children[0].data.downs
        let memeNumComments = content[0].data.children[0].data.num_comments
        embed.setTitle(memeTitle)
        embed.setDescription(`[${client.l.fun.meme.thread}](${memeUrl})`)
        embed.setImage(memeImage)
        embed.setColor(client.config.colour)
        embed.setFooter(`${client.l.fun.meme.info.replace('%UPVOTES%', memeUpvotes).replace('%DOWNVOTES%', memeDownvotes).replace('%COMMENTS%', memeNumComments)}\n${client.l.fun.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username)}`)
        message.channel.send(embed)
    }).catch(console.error);
    
}

// © Hawsk Romania Discord Bot | Do Not Copy
