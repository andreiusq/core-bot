const Discord = require("discord.js");
const ms = require("ms")

exports.run = async (client, message, args) => {
    message.delete()

    if (args.length < 3) return client.missingArguments(client.command, client.l.giveaways.gcreate.usage)

    else {
        client.giveawaysManager.start(message.channel, {
            time: ms(args[0]),
            prize: args.slice(2).join(" "),
            winnerCount: parseInt(args[1])
        })
    }

} 

// © Hawsk Romania Discord Bot | Do Not Copy