const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./data/udb.sqlite');

module.exports = async (client, member) => {

    client.findRole = function(role){
      var r = member.guild.roles.cache.find(x => x.name === role)
      theRole = r
      if(!r){
        var r = member.guild.roles.cache.find(x => x.id === role)
        theRole = r
      }
      return theRole 
    }
    
    client.config.autoRoles.forEach(r => {
    let role = client.findRole(r)
    if(!role){console.log(`\x1b[31mMissing ${r} role (this role is needed for the autorole system)!`)} else {member.roles.add(role)}
    })

    user = client.users.cache.get(`${member.id}`)

    var joinLeaveChannel = member.guild.channels.cache.find(x => x.name === client.config.joinLeaveChannel)
    if(!joinLeaveChannel){var joinLeaveChannel = member.guild.channels.cache.find(x => x.id === client.config.joinLeaveChannel)}

    let usser = "%%__NONCE__%%"

    if(client.config.joinLeaveMessage === "on"){
      let embed = new Discord.MessageEmbed()
        .setTitle(client.l.events.welcome.welcome.replace('%SERVERNAME%', client.config.serverName))
        .setDescription(`**${user.tag}** ${client.l.events.welcome.joined}\n\n${client.config.welcomeMsg}\n\n➜ **${client.l.events.welcome.username}** ${user.tag}\n➜ **${client.l.events.welcome.ID}** ${user.id}\n➜ **${client.l.events.welcome.totalMembers}** ${member.guild.memberCount}`)
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
        .setTitle(client.l.events.welcome.log)
        .setDescription(`${client.l.gen.logs.user} ${member}`)
        .setTimestamp(member.joinedTimestamp)
    logChannel.send(log)
    
    if(client.config.inviteSystem === "on") {

      const cachedInvites = client.guildInvites.get(member.guild.id)
      const newInvites = await member.guild.fetchInvites()
      client.guildInvites.set(member.guild.id, newInvites)

      try {
          const invite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);
          let inviter = invite.inviter
          if(!inviter) return
          inviteCode = new Discord.MessageEmbed()
            .setColor(client.config.colour)
            .setDescription(`${client.l.events.welcome.inviteCode.replace('%USER%', member.user.tag).replace('%CODE%', invite.code).replace('%CREATOR%', inviter.tag)}
            ${client.l.events.welcome.used.replace('%AMOUNT%', invite.uses)}`)
          logChannel.send(inviteCode)

          myinvites = {user: member.id, inviter: inviter.id}

          const insert = sql.prepare(`INSERT OR REPLACE INTO joins (user, inviter) VALUES (@user, @inviter);`)

          insert.run(myinvites)
      }
      catch(err) {
          console.log(err);
      }
    }

}

// © Hawsk Romania Discord Bot | Do Not Copy