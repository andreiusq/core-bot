const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./data/udb.sqlite');

module.exports = (client, member) => {

var d = new Date,
dformat = [d.getMonth()+1,
    d.getDate(),
    d.getFullYear()].join('/')+' '+
    [d.getHours(),
    d.getMinutes(),
    d.getSeconds()].join(':');

    user = client.users.cache.get(`${member.id}`)

    var joinLeaveChannel = member.guild.channels.cache.find(x => x.name === client.config.joinLeaveChannel)
    if(!joinLeaveChannel){var joinLeaveChannel = member.guild.channels.cache.find(x => x.id === client.config.joinLeaveChannel)}

    if(client.config.joinLeaveMessage === "on"){
    let embed = new Discord.MessageEmbed()
        .setTitle(client.l.events.leave.leave.replace('%SERVERNAME%', client.config.serverName))
        .setDescription(`**${user.tag}** ${client.l.events.leave.left}\n\n${client.config.leaveMsg}\n\n➜ **${client.l.events.leave.username}** ${user.tag}\n➜ **${client.l.events.leave.ID}** ${user.id}`)
        .setColor(client.config.colour)
        .setFooter(client.config.footer, client.user.avatarURL())
        .setThumbnail((user.displayAvatarURL()))
        .setTimestamp(member.joinedTimestamp)
        .setAuthor(`${client.config.serverName}`, client.user.avatarURL())
        joinLeaveChannel.send(embed)
    }

    var logChannel = member.guild.channels.cache.find(x => x.name === client.config.logChannel)
    if(!logChannel){var logChannel = member.guild.channels.cache.find(x => x.id === client.config.logChannel)}

    const log = new Discord.MessageEmbed()
        .setColor(client.config.colour)
        .setTitle(client.l.events.leave.log)
        .setDescription(`${client.l.gen.logs.user} ${member}`)
        .setTimestamp(dformat)
    logChannel.send(log)

    if(client.config.inviteSystem === "on") {  
        try {

            let myinvites = sql.prepare('SELECT inviter FROM joins WHERE user=?').all(member.id)

            if(myinvites) {
                try{
                    inviter = myinvites[myinvites.length-1].inviter
                }
                catch{
                    return
                }
                if(!inviter) return
                myinvites = {user: member.id, inviter: inviter}
                const insert = sql.prepare(`INSERT OR REPLACE INTO leaves (user, inviter) VALUES (@user, @inviter)`)
                insert.run(myinvites)
            }

        }
        catch(err) {
            console.log(err);
        }
      }

}

// © Hawsk Romania Discord Bot | Do Not Copy