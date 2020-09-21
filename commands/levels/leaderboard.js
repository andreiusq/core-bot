const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./data/udb.sqlite');

exports.run = (client, message, args) => {
    if(client.config.levelSystem === "off") return;
    message.delete()

    const top10 = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;").all(message.guild.id)

    const embed = new Discord.MessageEmbed()
        .setTitle(`📊 ${client.config.serverName} ${client.l.levels.leaderboard.leaderboard}`)
        .setAuthor(client.config.serverName, client.user.avatarURL())
        .setDescription(client.l.levels.leaderboard.topten)
        .setColor(client.config.colour)
        .setFooter(client.l.levels.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

    let numbers = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"]
    let count = 0
    for(const data of top10) {
        try{
            embed.addField(`${numbers[count]} **${client.users.cache.get(data.user).tag}**`, `${client.l.levels.leaderboard.level} ${data.level} (${data.points} ${client.l.levels.leaderboard.points})`, true)
            count++
        }
        catch{
            let test = null
        }
    }

    message.channel.send(embed)

}

// © Hawsk Romania Discord Bot | Do Not Copy