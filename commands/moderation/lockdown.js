const ms = require('ms');
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  message.delete()
  if (!client.lockit) client.lockit = [];
  let time = args.join(' ');
  let validUnlocks = ['release', 'unlock', 'lift', 'off'];

  const lockDownReleased = new Discord.MessageEmbed()
    .setColor(client.config.colour)
    .setTitle(client.l.moderation.lockdown.lifted)  
    .setFooter(client.l.moderation.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))   

  if (!time) return client.missingArguments(client.command, client.l.moderation.lockdown.usage)

  if (validUnlocks.includes(time)) {
    message.channel.createOverwrite(message.guild.id, {
      SEND_MESSAGES: null
    }).then(() => {
      message.channel.send(lockDownReleased)
      clearTimeout(client.lockit[message.channel.id])
      delete client.lockit[message.channel.id]
    }).catch(error => {
      console.log(error)
    })
  } else {
    message.channel.createOverwrite(message.guild.id, {
      SEND_MESSAGES: false
    }).then(() => {

        const locked = new Discord.MessageEmbed()
            .setColor(client.config.colour)
            .setTitle(client.l.moderation.lockdown.locked.replace('%TIME%', ms(ms(time), { long:true })))
            .setFooter(client.l.moderation.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

        message.channel.send(locked).then(() => {

        client.lockit[message.channel.id] = setTimeout(() => {
          message.channel.createOverwrite(message.guild.id, {
            SEND_MESSAGES: null
          }).then(message.channel.send(lockDownReleased)).catch(console.error)
          delete client.lockit[message.channel.id]
        }, ms(time))

      }).catch(error => {
        console.log(error)
      })
    })
  }

}

// © Hawsk Romania Discord Bot | Do Not Copy
