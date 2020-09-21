const Discord = require("discord.js");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
exports.run = async (client, message, args) => {
    message.delete()

    function embed (title,msg) {
        let emb = new Discord.MessageEmbed()
        .setTitle(title)
        .setDescription(msg)
        .setColor(client.config.colour)
        .setFooter(client.l.fun.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
        return emb
    }

    let pos = client.l.fun.rps.options
    let o
    let win
    let n = getRandomInt(3);
    let result = undefined
    result = pos[n]
    const filter = (reaction, user) => {
        return ['🌕', '📄', '✂'].includes(reaction.emoji.name) && user.id === message.author.id;
    };
    message.channel.send(embed(client.l.fun.rps.title, client.l.fun.rps.message)).then((m) => {
    m.react("🌕").then(() => m.react("📄").then(() => m.react("✂")))
    .then(() => {
    m.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(collected => {
            const reaction = collected.first()
            n = getRandomInt(3);
            result = undefined
            result = pos[n]
    
            if (reaction.emoji.name === '🌕') {
              o = pos[0]
            }
            else if (reaction.emoji.name === '📄'){
              o = pos[1]
            }
             else if (reaction.emoji.name === '✂'){
               o = pos[2]
             }
               
               if (result === o) win = client.l.fun.rps.draw
      else if (result === pos[0] && o === pos[1]) win = client.l.fun.rps.win
      else if (result === pos[0] && o === pos[2]) win = client.l.fun.rps.loss
      else if (result === pos[1] && o === pos[0]) win = client.l.fun.rps.loss
      else if (result === pos[1] && o === pos[2]) win = client.l.fun.rps.win
      else if (result === pos[2] && o === pos[0]) win = client.l.fun.rps.win
      else if (result === pos[2] && o === pos[1]) win = client.l.fun.rps.loss
      m.reactions.removeAll()
      m.edit(embed(client.l.fun.rps.title,`${client.l.fun.rps.result} **${win}** \n${client.l.fun.rps.you} **${o}** \n${client.l.fun.rps.bot} **${result}**`))
    }).catch(() => {message.channel.send(embed(client.l.fun.rps.title,client.l.fun.rps.tooSlow))} )
    })
    })
    
}

// © Hawsk Romania Discord Bot | Do Not Copy