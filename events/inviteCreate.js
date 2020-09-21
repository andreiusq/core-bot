const Discord = require("discord.js");

module.exports = async (client, invite) => {
    
    client.guildInvites.set(invite.guild.id, await invite.guild.fetchInvites())

}

// © Hawsk Romania Discord Bot | Do Not Copy