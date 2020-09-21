const Discord = require("discord.js");
const fs = require("fs");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./data/udb.sqlite');

module.exports = async (client, reaction, user) => {

    client.findChannel = function(channel){
      var c = reaction.message.guild.channels.cache.find(x => x.name === channel)
      theChannel = c
      if(!c){
        var c = reaction.message.guild.channels.cache.find(x => x.id === channel)
        theChannel = c
      }
      return theChannel 
    }
    
    client.findRole = function(role){
      var r = reaction.message.guild.roles.cache.find(x => x.name === role)
      theRole = r
      if(!r){
        var r = reaction.message.guild.roles.cache.find(x => x.id === role)
        theRole = r
      }
      return theRole 
    }
    
    client.logChannel = client.findChannel(client.config.logChannel)

    client.log = function(title, log){
      const logEmbed = new Discord.MessageEmbed()
        .setColor(client.config.colour)
        .setTitle(`${client.l.gen.logs.emoji} ${title}`)
        .setDescription(log)
        .setTimestamp() 
      client.logChannel.send(logEmbed)
    }

    let myticketpanel = sql.prepare('SELECT * FROM ticketpanel WHERE id=?').get(reaction.message.id);
    if(myticketpanel) { 

      if (reaction.emoji.name === client.config.ticketPanelEmoji && !user.bot){

        msg = `${client.config.prefix}None Specified`
        const args = msg.slice(client.config.prefix.length).trim().split(/ +/g);
        let message = reaction.message
        message.author = user
        
        client.ticketCategory = client.findChannel(client.config.ticketCategory)
        
        const command = "new"
        const cmd = client.commands.get(command)
        cmd.run(client, message, args)

        reaction.users.remove(user)
    }}

    let myverifypanel = sql.prepare('SELECT * FROM verifypanel WHERE id=?').get(reaction.message.id);
    if(myverifypanel) { 
      if (reaction.emoji.name === client.config.verifyPanelEmoji && !user.bot){
        let role = client.findRole(client.config.verificationRole)
        user2 = await reaction.message.guild.members.fetch(user.id)
        user2.roles.add(role)
        reaction.users.remove(user2)
    }}

    let myreactionroles = sql.prepare('SELECT * FROM reactionrole WHERE message = ?').all(reaction.message.id)
    if(myreactionroles) { 
      myreactionroles.forEach(async rr => {
        if (reaction.emoji.name === rr.reaction && !user.bot){
          let role = client.findRole(rr.role)
          user3 = await reaction.message.guild.members.fetch(user.id);
          user3.roles.add(role)
          reaction.users.remove(user3)

          let embed = new Discord.MessageEmbed()
            .setTitle(`Role added in ${client.config.serverName}`)
            .setColor(client.config.colour)
            .setDescription(`You added the **${role.name}** role by reacting with ${reaction.emoji.name} in **${client.config.serverName}**.`)
          user3.send(embed)

         }
      })
    }

    let giveaways = require("../data/giveaways.json")
    let giveaway = giveaways.find(g => g.messageID == reaction.message.id)

    if (reaction.emoji.name == client.config.giveawayEmoji && giveaway && !user.bot) {
      giveaways
        .find(g => g.messageID == reaction.message.id)
        .reactions.push(user.id);
      fs.writeFile("../data/giveaways.json", JSON.stringify(giveaways), function(err) {
        if (err) console.log(err);
      });
    }

}

// © Hawsk Romania Discord Bot | Do Not Copy