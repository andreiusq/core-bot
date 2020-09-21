const Discord = require("discord.js");
const search = require("yt-search")

let emojis = {1: "1️⃣", 2: "2️⃣", 3: "3️⃣", 4: "4️⃣", 5: "5️⃣", 6: "6️⃣", 7: "7️⃣", 8: "8️⃣", 9: "9️⃣", 10: "🔟"}

exports.run = async (client, message, args) => {

    search(args.join(' '), async function(err, res) {

        if(err) console.log(err)

        let videos = res.videos.slice(0, 10)
        
        let desc = `**${client.l.music.search.number} 0 - ${videos.length}**\n\n`
        
        let searchMsg = new Discord.MessageEmbed()
            .setTitle(client.l.music.search.search)
            .setColor(client.config.colour)
            .setFooter(client.l.music.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))  
        
        for (var i in videos){
            desc += `${emojis[parseInt(i)+1]} ${videos[i].title}\n`
        }
        
        searchMsg.setDescription(desc)
        
        message.channel.send(searchMsg)
        
        const filter = m => !isNaN(m.content) && m.content < videos.length+1 && m.content > 0
        
        const collector = message.channel.createMessageCollector(filter)
        
        collector.videos = videos
        collector.once('collect', function(m) {
        
            let commandFile = require(`./play.js`)

            commandFile.run(client, message, [this.videos[parseInt(m.content)-1].url])
        
        })

    })

}

// © Hawsk Romania Discord Bot | Do Not Copy