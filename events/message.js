
/* 

Hawsk Romania.

We will not be able to provide support to you if you modify the contents
of any file. So if you change something and break it, do not expect support, 
you will be blacklisted forever.

*/

const Discord = require("discord.js");
const fs = require("fs");

const usersMap = new Map();
const coolDown = new Set();

module.exports = async (client, message) => {
  
  if (!message.guild) return

    if(!(message.guild === null)) {
      
      if(message.channel.name.startsWith(`ticket-`)){

        if (message.embeds.length == 0){

          fs.appendFile(`${client.root}/commands/tickets/transcripts/transcript-${message.channel.id}.html`, `

          <div class="boxed" align="middle">

            <p>
              <img src=${message.author.avatarURL()}></br>

            ⠀⠀<b>${message.author.tag}</b></br>

              <i>${message.author.id}</i></br>
              <i>${message.createdAt}</i></br>

              </br>
            ⠀⠀${message.content}

            </p>
            </br>

          </div>

          </br>

          `,function (err) {
              if (err) throw err
            }
          
          ) 

        }

        else {

          fs.appendFile(`${client.root}/commands/tickets/transcripts/transcript-${message.channel.id}.html`, `

          <div class="boxed" align="middle">
            <p>
              <img src=${message.author.avatarURL()}></br>

            ⠀⠀<b>${message.author.tag}</b></br>
              <i>${message.author.id}</i></br>
              <i>${message.createdAt}</i></br
              
              ></br>
              <i>Embed:</i></br>
            ⠀⠀${message.embeds[0].title}</br>
            ⠀⠀${message.embeds[0].description}

            </p>
            </br>

          </div>

          </br>

          `, function (err) {
              if (err) throw err
            }

          )  

        }

      }

    }

    // Return all bot messages

    if (message.author.bot) return;

    // Finds

    client.findChannel = function(channel){
      var c = message.guild.channels.cache.find(x => x.name === channel)
      theChannel = c
      if(!c){
        var c = message.guild.channels.cache.find(x => x.id === channel)
        theChannel = c
      }
      return theChannel 
    }
    
    client.findRole = function(role){
      var r = message.guild.roles.cache.find(x => x.name === role)
      theRole = r
      if(!r){
        var r = message.guild.roles.cache.find(x => x.id === role)
        theRole = r
      }
      return theRole 
    }

    // Setup
    theMessage = message.content.toLowerCase()

    // Roles
    let missingRoles = new Discord.MessageEmbed()
      .setAuthor("Hawsk Romania Error","https://cdn.discordapp.com/attachments/632238663094370366/632916675808854026/profile.png")
      .setTitle("⚠ Error - Missing Roles ⚠")
      .setDescription("Your guild is missing some roles needed to function!")
      .setColor(`#FF0062`)
      .setFooter("© Hawsk Romania | Developed By Matt","https://cdn.discordapp.com/attachments/632238663094370366/632916675808854026/profile.png")

    let permissionRoles = `**Missing Role Name**\n\n`
    let generalRoles = `**Missing Role Name (feature)**\n\n`

    let roles = []

    for(var key in client.cmds){
      client.cmds[key].permissions.forEach(role => {if(!client.findRole(role)){ if(!roles.includes(role)){roles.push(role); permissionRoles += `${role}\n`}}})
    }

    missingRoles.addField(`Missing Roles (needed for permissions)`,permissionRoles)

    var checkForMissingRole = function(location, reason){
      location.forEach(role => {  
        if(!client.findRole(role))  {
          generalRoles += `${role} (${reason})\n`
        }
      })
    }

    checkForMissingRole(client.config.canSeeApplication, "See Applications")
    checkForMissingRole(client.config.canSeeClosedTicket, "See Closed Tickets")
    checkForMissingRole(client.config.canSeeRaisedTicket, "See Raised Tickets")
    checkForMissingRole(client.config.canSeeTicket, "See Tickets")
    checkForMissingRole(client.config.swearBypass, "Swear Bypass")
    checkForMissingRole(client.config.inviteBypass, "Invite Bypass")
    checkForMissingRole(client.config.viewVerifyChannel, "View Verify Channel")
    checkForMissingRole(client.config.talkInVerifyChannel, "Speak In Verify Channel")
    checkForMissingRole(client.config.viewLogsChannel, "View In Logs Channel")
    checkForMissingRole(client.config.exemptFromPunishments, "Exempt From Punishments")

    if(!client.findRole(client.config.mutedRole)){generalRoles += `${client.config.mutedRole} (Muted Role)\n`}
    if(client.config.verificationSystem === "on"){
      if(!client.findRole(client.config.verificationRole)){generalRoles += `${client.config.verificationRole} (Verfied Role)\n`}}

    missingRoles.addField(`Missing Roles (needed for features)`, generalRoles)

    if(((permissionRoles != "**Missing Role Name**\n\n") || (generalRoles != "**Missing Role Name (feature)**\n\n")) && theMessage != `${client.config.prefix}setup`){
      message.channel.send(missingRoles)
      console.log(`\x1b[41mERROR\x1b[40m \x1b[31m There is an error with the setup of your Discord server!`)
      console.log(`\x1b[41mERROR\x1b[40m \x1b[31m Run \x1b[35m${client.config.prefix}bot \x1b[31min the server to check whats wrong.`)
      console.log(`\x1b[41mERROR\x1b[40m \x1b[31m Run \x1b[35m${client.config.prefix}setup \x1b[31min the server to fix all the issues.`)
      return
    }

    missingChannels = "**Missing Channel Name (feature)**\n\n"
    missingCategorys = "**Missing Category Name (feature)**\n\n"

    let missingChannelsCategories = new Discord.MessageEmbed()
      .setAuthor("Hawsk Romania Error","https://cdn.discordapp.com/attachments/632238663094370366/632916675808854026/profile.png")
      .setTitle("⚠ Error - Missing Channels ⚠")
      .setDescription("Your guild is missing some channels needed to function!")
      .setColor(`#FF0062`)
      .setFooter("© Hawsk Romania | Developed By Matt","https://cdn.discordapp.com/attachments/632238663094370366/632916675808854026/profile.png")
  
    // Channels
    if(!client.findChannel(client.config.logChannel)){missingChannels += `${client.config.logChannel} (Log Channel)\n`}
    if(!client.findChannel(client.config.reportChannel)){missingChannels += `${client.config.reportChannel} (Report Channel)\n`}
    if(!client.findChannel(client.config.suggestionChannel)){missingChannels += `${client.config.suggestionChannel} (Suggestion Channel)\n`}
    if(!client.findChannel(client.config.bugChannel)){missingChannels += `${client.config.bugChannel} (Bug Report Channel)\n`}
    if(client.config.joinLeaveMessage === "on"){
      if(!client.findChannel(client.config.joinLeaveChannel)){missingChannels += `${client.config.joinLeaveChannel} (Join/Leave Channel)\n`}}
    if(client.config.verificationSystem === "on"){
      if(!client.findChannel(client.config.verificationChannel)){missingChannels += `${client.config.verificationChannel} (Verification Channel)\n`}}
    if(client.config.applicationSystem === "on"){
      if(!client.findChannel(client.config.applicationChannel)){missingChannels += `${client.config.applicationChannel} (Application Channel)\n`}}

    client.config.commandChannels.forEach(chn => {
      if(!client.findChannel(chn)){missingChannels += `${chn} (Command Channel)\n`}
    })

    if(client.config.levelSystem === "on"){
      if(!(client.config.levelChannel === "current")){
      if(!client.findChannel(client.config.levelChannel)){missingChannels += `${client.config.levelChannel} (Level Up Channel)\n`}}}
    // Categories
    if(client.config.applicationSystem === "on"){
      if(!client.findChannel(client.config.applicationCategory)){missingCategorys += `${client.config.applicationCategory} (Application Category)\n`}}
    if(client.config.ticketSystem === "on"){
      if(!client.findChannel(client.config.ticketCategory)){missingCategorys += `${client.config.ticketCategory} (Ticket Category)\n`}}

    missingChannelsCategories.addField(`Missing Channels`, missingChannels)
    missingChannelsCategories.addField(`Missing Categories`, missingCategorys)

    if(((missingChannels != "**Missing Channel Name (feature)**\n\n") || (missingCategorys != "**Missing Category Name (feature)**\n\n")) && theMessage != `${client.config.prefix}setup`){
      message.channel.send(missingChannelsCategories)
      console.log(`\x1b[41mERROR\x1b[40m \x1b[31m There is an error with the setup of your Discord server!`)
      console.log(`\x1b[41mERROR\x1b[40m \x1b[31m Run \x1b[35m${client.config.prefix}bot \x1b[31min the server to check whats wrong.`)
      console.log(`\x1b[41mERROR\x1b[40m \x1b[31m Run \x1b[35m${client.config.prefix}setup \x1b[31min the server to fix all the issues.`)
      return
    }

    // Admin
    let missingAdminPerms = new Discord.MessageEmbed()
      .setAuthor("Hawsk Romania Error","https://cdn.discordapp.com/attachments/632238663094370366/632916675808854026/profile.png")
      .setTitle("⚠ Error - Missing Admin Permission ⚠")
      .setDescription("You need to give the bot the Administrator permission to function!")
      .setColor(`#FF0062`)
      .setFooter("© Hawsk Romania | Developed By Matt","https://cdn.discordapp.com/attachments/632238663094370366/632916675808854026/profile.png")

    if(!message.guild.me.hasPermission('ADMINISTRATOR')){
      message.channel.send(missingAdminPerms)
      console.log(`\x1b[41mERROR\x1b[40m \x1b[31m ${client.config.botName} Is missing the administrator permission, give it to it's role or the bot cannot fuunction!\n`)
      return
    }

    // End Setup

    // New channels and roles system //

    // Channels
    client.logChannel = client.findChannel(client.config.logChannel)
    client.verificationChannel = client.findChannel(client.config.verificationChannel)
    client.levelChannel = client.findChannel(client.config.levelChannel)
    client.joinLeaveChannel = client.findChannel(client.config.joinLeaveChannel)
    client.applicationChannel = client.findChannel(client.config.applicationChannel)
    client.suggestionChannel = client.findChannel(client.config.suggestionChannel)
    client.reportChannel = client.findChannel(client.config.reportChannel)
    client.bugChannel = client.findChannel(client.config.bugChannel)
    client.commandChannels = []
    client.config.commandChannels.forEach(chn => {client.commandChannels.push(client.findChannel(chn).id)})
    
    // Categories
    client.applicationCategory = client.findChannel(client.config.applicationCategory)
    client.ticketCategory = client.findChannel(client.config.ticketCategory)

    // Roles
    client.verificationRole = client.findRole(client.config.verificationRole)
    client.mutedRole = client.findRole(client.config.mutedRole)

    // © Hawsk Romania Discord Bot | Do Not Copy

    // Missing Arguments Message
    client.missingArguments = async function(command, usage){

      const missingArgs = new Discord.MessageEmbed()
        .setColor(client.config.colour)
        .setTitle(`🚫 ${client.l.gen.err.missingArgs}`)
        .setDescription(`${client.l.gen.err.usage} \`${client.config.prefix}${command} ${usage}\``)
        .setFooter(`${client.config.serverName} ➤ ${message.author.username}`)
         
      const fail = await message.channel.send(missingArgs)

      setTimeout(() => {
        fail.delete()
      }, 3000)

    }

    //

    // Check Perms Function
    client.checkPermissions = function(command){
      let roles = []
      client.cmds[command].permissions.forEach(role => roles.push(client.findRole(role)))
      
      let noPerms = new Discord.MessageEmbed()
          .setColor(client.config.colour)
          .setTitle(`🔒 ${client.l.gen.err.deniedAccess}`)
          .setFooter(client.l.gen.err.permissionsFooter.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

      flag = false
      roles.forEach(role => {if(message.member.roles.cache.find(r => r.id === role.id)) flag = true})

      if(flag === false){
        message.channel.send(noPerms)
        if(client.config.liveConsoleLog === "on"){
          console.log(`\x1b[46mLOG\x1b[0m \x1b[36m${message.author.tag} \x1b[31mwas denied access to the command!`)
        }
        return false
        }
      else{return true}
    }
    // Check Perms Function End

    // XP System
    if(client.config.levelSystem === "on") {
    if(client.config.levelChannel === "current"){
      var sendChannel = message.channel
    }
    else{
      var sendChannel = client.levelChannel
    }
    if (coolDown.has(message.author.id)) {
      let test = null
    } else {
      let score;
      if (message.guild) {
        score = client.getScore.get(message.author.id, message.guild.id);
        if (!score) {
          score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1 }
        }
        score.points = score.points + (Math.floor(Math.random() * Math.floor(client.config.levelMaxPoints)))
        const curLevel = Math.floor(0.1 * Math.sqrt(score.points));
        if(score.level < curLevel) {
          score.level++;
          var scoreEmbed = new Discord.MessageEmbed()
            .setColor(client.config.colour)
            .setAuthor(`${client.config.serverName}`,client.user.avatarURL())
            .setTitle(client.l.events.levels.congratulations.replace('%USER%', message.author.username))
            .addField(client.l.events.levels.previous, `**${curLevel-1}**`, true)
            .addField(client.l.events.levels.new, `**${curLevel}**`, true)
            .addField(client.l.events.levels.total, `**${score.points}**`, true)
            .setFooter(client.l.fun.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
          sendChannel.send(scoreEmbed)
        }
        client.setScore.run(score);
      }
      coolDown.add(message.author.id);
      setTimeout(() => {
        coolDown.delete(message.author.id);
      }, client.config.levelCoolDown);
    }
    }
    // XP System End

    // © Hawsk Romania Discord Bot | Do Not Copy

    // Log 
    client.log = function(title, log){
      const logEmbed = new Discord.MessageEmbed()
        .setColor(client.config.colour)
        .setTitle(`${client.l.gen.logs.emoji} ${title}`)
        .setDescription(log)
        .setTimestamp(message.createdAt) 
      client.logChannel.send(logEmbed)
    }
    // Log End

    // Invite Filter
    if(client.config.inviteFilter === "on"){
      theMessage = message.content.toLowerCase()
      if(theMessage.includes("discord.gg")){
        var xrole = null

        let roles = []
        client.config.inviteBypass.forEach(role => roles.push(client.findRole(role)))

        flag = false
        roles.forEach(role => {if(message.member.roles.cache.find(r => r.id === role.id)) flag = true})
        if((flag === false)){
        if(!message.member.roles.cache.has(xrole) || xrole === null){
          message.delete()
          var inviteFilterEmbed = new Discord.MessageEmbed()
            .setColor(client.config.colour)
            .setDescription(client.l.events.filters.advertise.advertise)
            .setFooter(client.l.events.filters.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER', message.author.username))
          const inviteFilterMessage = await message.channel.send(inviteFilterEmbed);setTimeout(() => {inviteFilterMessage.delete()}, 6000)
          const log = new Discord.MessageEmbed()
            .setColor(client.config.colour)
            .setTitle(client.l.events.filters.advertise.log)
            .setDescription(`${client.l.gen.logs.user} ${message.author}\n${client.l.gen.logs.channel} ${message.channel}\n${client.l.gen.logs.message} ${message}`)
            .setTimestamp(message.createdAt)
        client.logChannel.send(log)
        return }}
        } 
    }
    // Invite Filter End
    
    // Swear Filter
    if(client.config.swearFilter === "on"){
      theMessage = message.content.toLowerCase()
      let swearWords = client.config.swearWords
      swearWords.forEach(async function(swearWord){
      if(theMessage.includes(swearWord)){
        var xrole = null
        
        let roles = []
        client.config.swearBypass.forEach(role => roles.push(client.findRole(role)))

        flag = false
        roles.forEach(role => {if(message.member.roles.cache.find(r => r.id === role.id)) flag = true})
        if((flag === false)){
        if(!message.member.roles.cache.has(xrole) || xrole === null){
          message.delete()
          var swearFilterEmbed = new Discord.MessageEmbed()
            .setColor(client.config.colour)
            .setDescription(client.l.events.filters.swear.swear)
            .setFooter(client.l.events.filters.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
          const swearFilterMessage = await message.channel.send(swearFilterEmbed); setTimeout(() => {swearFilterMessage.delete()}, 6000)
          const log = new Discord.MessageEmbed()
              .setColor(client.config.colour)
              .setTitle(client.l.events.filters.swear.log)
              .setDescription(`${client.l.gen.logs.user} ${message.author}\n${client.l.gen.logs.channel} ${message.channel}\n${client.l.gen.logs.message} ${message}`)
              .setTimestamp(message.createdAt)
          client.logChannel.send(log)
        return }}
        } 
        })
    }
    // Swear Filter End

    // © Hawsk Romania Discord Bot | Do Not Copy

    // Antispam
    if(client.config.antiSpam === "on"){
      const LIMIT = 5;
      const DIFF = 1000;

      const DUPELIMIT = client.config.antispamMessageLimit
      const DUPEDIFF = client.config.antispamTimeLimit
      const TIME = client.config.antiSpamMuteTime

      var doMuteEvent = function() {
        message.member.roles.add(client.mutedRole)
        const muted = new Discord.MessageEmbed()
          .setColor(client.config.colour)
          .setTitle(client.l.moderation.tempMute.tempMuted)
          .setDescription(`${client.l.gen.logs.user} ${message.author}\n${client.l.gen.logs.staffMember} ${client.config.botName}\n${client.l.moderation.tempMute.time} ${TIME/1000}s\n${client.l.gen.logs.reason} ${client.l.events.antispam.muted}`) 
          .setFooter(client.l.events.antispam.footer.replace('%SERVERNAME%', client.config.serverName)) 
        message.channel.send(muted)
      }
      var doUnmuteEvent = function() {
        message.member.roles.remove(client.mutedRole)
        const muted = new Discord.MessageEmbed()
          .setColor(client.config.colour)
          .setTitle(client.l.events.antispam.unmuted)
          .setDescription(`${client.l.gen.logs.user} ${message.author}`)
          .setFooter(client.l.events.antispam.footer.replace('%SERVERNAME%', client.config.serverName))
        message.channel.send(muted)
      }

      if(usersMap.has(message.author.id)) {

        const userData = usersMap.get(message.author.id);
        const { lastMessage, timer } = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let spamAnti = "%%__NONCE__%%"
        let msgCount = userData.msgCount;
        let dupeCount = userData.dupeCount;

        if (message.content.toLowerCase() === userData.lastMessage.content.toLowerCase()) {
            if(difference > DUPEDIFF) {
                clearTimeout(timer);
                userData.dupeCount = 1;
                userData.lastMessage = message;
                userData.timer = setTimeout(() => {
                  usersMap.delete(message.author.id);
                }, TIME);
                usersMap.set(message.author.id, userData);
              }
              else {
                ++dupeCount;
                if(parseInt(dupeCount) === DUPELIMIT) {
                    doMuteEvent()
                  setTimeout(() => {
                    doUnmuteEvent()
                  }, TIME);
                } else {
                    userData.dupeCount = dupeCount;
                    usersMap.set(message.author.id, userData);
                  }
            }
          }

          if(difference > DIFF) {
            clearTimeout(timer);
            userData.msgCount = 1;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
              usersMap.delete(message.author.id);
            }, TIME);
            usersMap.set(message.author.id, userData);
          }
          else {
            ++msgCount;
            if(parseInt(msgCount) === LIMIT) {
              doMuteEvent()
              setTimeout(() => {
                doUnmuteEvent()
              }, TIME)
            } 
            else {
              userData.msgCount = msgCount
              usersMap.set(message.author.id, userData)
            }
          }
        }
        else {
          let fn = setTimeout(() => {
            usersMap.delete(message.author.id);
          }, TIME);
          usersMap.set(message.author.id, {
            msgCount: 1,
            dupeCount: 1,
            lastMessage: message,
            timer: fn
          });
        }
    }
    // Antispam End

    // Verify Command
    if(client.config.verificationSystem === "on"){
      if(message.channel === client.verificationChannel){
        if(message.content === `${client.config.prefix}verify`){
          message.member.roles.cache.add(client.verificationRole);message.delete();return}
        else{
          let roles = []
          client.config.talkInVerifyChannel.forEach(role => roles.push(client.findRole(role)))

          flag = false
          roles.forEach(role => {if(message.member.roles.cache.find(r => r.id === role.id)) flag = true})

          if(flag === true){}
          else{message.delete();return}}
    }}
    // Verify Command End

    if (message.content.indexOf(client.config.prefix) !== 0) return;

    // © Hawsk Romania Discord Bot | Do Not Copy

    if(client.config.blackList.includes(message.author.id)) return

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase()

    var cmd = client.commands.get(command)

    if(cmd) client.command = command

    if(!cmd) { 
        client.commands.forEach(com => {
          if(com.name != undefined){
            if(com.aliases.includes(command)){
              cmd = client.commands.get(com.name)
              client.command = com.name
            }
          }
        })
    }

    if(!cmd) return

    client.sentCommand = command

    if(cmd.type === "core") if(!client.checkPermissions(client.command)) return

    client.commandDetails = cmd

    if(client.config.commandChannels.length > 0) {
      if(!client.commandChannels.includes(`${message.channel.id}`)){
        if(!client.config.bypassCommands.includes(client.command)) return
      } 
    }

    if(client.config.liveConsoleLog === "on"){
      console.log(`\x1b[46mLOG\x1b[0m \x1b[36m${message.author.tag} \x1b[33mexecuted the command \x1b[36m${client.command}\u001b[0m`)
    }

    let debugMode = false

    if(debugMode != true){
      try {
        cmd.run(client, message, args)
      }
      catch {
        console.log(`\x1b[41mERROR\x1b[40m \x1b[31mAn unknown error occurred when running this command, please contact Hawsk Romania's support team, with the error code \x1b[36mZ${client.command}00\x1b[31m.\u001b[0m`)
      }    
    }
    else{
      cmd.run(client, message, args)
    }

}

// © Hawsk Romania Discord Bot | Do Not Copy