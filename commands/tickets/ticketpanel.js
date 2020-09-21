const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./data/udb.sqlite');

exports.run = async (client, message, args) => {
    if(client.config.ticketSystem === "off") return;
    message.delete()

    let embed = new Discord.MessageEmbed()
        .setTitle(client.l.tick.ticketpanel.create)
        .setColor(client.config.colour)
        .setDescription(`${client.l.tick.ticketpanel.desc}\n\n${client.l.tick.ticketpanel.react.replace('%EMOJI%', client.config.ticketPanelEmoji)}`)
        .setAuthor(`${client.config.serverName}`, client.user.avatarURL())
        .setThumbnail(client.user.avatarURL())

    message.channel.send(embed).then((m) => {m.react(`${client.config.ticketPanelEmoji}`).then(() => {let id = m.id

    myticketpanel = { id: `${id}`,}
    const insert = sql.prepare(`INSERT OR REPLACE INTO ticketpanel (id) VALUES (@id);`)
    insert.run(myticketpanel)
    })})

}

// © Hawsk Romania Discord Bot | Do Not Copy