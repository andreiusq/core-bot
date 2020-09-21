const Discord = require("discord.js");
const fs = require('fs');

exports.run = async (client, message, args) => {
    if(client.config.ticketSystem === "off") return;

    var reason = args.join(" ")
    if(!(reason == "None Specified")){message.delete()}

    const listedChannels = []; 
    message.guild.channels.cache.forEach(channel => {
        channel = client.findChannel(channel.id)
        if(channel.name.startsWith("ticket-")){
            if(channel.topic.split("-")[0] === message.author.id){
                listedChannels.push(channel.id)
            }
        }
    })

    let limitEmbed = new Discord.MessageEmbed()
        .setTitle(client.l.tick.new.limit.replace('%USER%', message.author.username))
        .setColor(client.config.colour)
        .setFooter(client.l.tick.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

    if(listedChannels.length >= client.config.maxTicketsPerUser){const lim = await message.channel.send(limitEmbed);setTimeout(() => {lim.delete()}, 6000); return}

    if(!reason) return client.missingArguments(client.command, client.l.tick.new.usage)

    let everyone = message.guild.roles.cache.find(x => x.name === "@everyone");

    message.guild.channels.create(`ticket-${message.author.username}`, {type: 'text',
    topic: message.author.id}).then(async c => {

        let roles = []
        client.config.canSeeTicket.forEach(role => roles.push(client.findRole(role)))

        flag = false
        roles.forEach(async role => {c.createOverwrite(role, {SEND_MESSAGES: true, VIEW_CHANNEL: true, EMBED_LINKS: true, ATTACH_FILES: true})})
        
        c.createOverwrite(everyone, {SEND_MESSAGES: false, VIEW_CHANNEL: false, EMBED_LINKS: true, ATTACH_FILES: true})
        c.createOverwrite(message.author, {SEND_MESSAGES: true, VIEW_CHANNEL: true, EMBED_LINKS: true, ATTACH_FILES: true})
        c.setParent(client.ticketCategory)

        fs.appendFile(`${__dirname}/transcripts/transcript-${c.id}.html`, `
        
        <html>

            <head>

                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width">
                <title>Transcript - ticket-${c.id}</title>

            </head>

            <style>

                body {
                    background-color: #bbbbbd;
                    }

                .boxed {
                    border: 1px solid white ;
                    border-radius: 25px;
                    }

                img {
                    border-radius: 50%;
                    width: 50px;
                    padding: 10px;
                    }
                
                p {
                    font-family: "Comic Sans MS", cursive, sans-serif;
                    }

                h1 {
                    font-family: "Comic Sans MS", cursive, sans-serif;
                    }

            </style>

            <body align="middle">
                <h1>
                    <b>${client.config.serverName} Ticket Transcript</b>
                </h1>
                <p>
                    <b>Ticket - </b>#${c.name} <i>(${message.channel.id})</i></br>
                    <b>User - </b>#${message.author.tag} <i>(${message.author.id})</i></br>
                    <b>Opened At - </b>${message.createdAt}</br></br>
                    <b>Reason - </b>${reason}</br>
                </p>
                </br>


        `, function (err) {
            if (err) throw err;
        });

        let openEmbed = new Discord.MessageEmbed()
            .setTitle(client.l.tick.new.created.replace('%USER%', message.author.username))
            .setDescription(client.l.tick.new.location.replace('%LOCATION%', c))
            .setColor(client.config.colour)
            .setFooter(client.l.tick.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

        if(!(reason == "None Specified")){message.channel.send(openEmbed)}
        else{const fail = await message.channel.send(openEmbed);setTimeout(() => {fail.delete()}, 6000)}

        c.send(`${message.author}`)

        let thanksEmbed = new Discord.MessageEmbed()
            .setTitle(client.l.tick.new.support.replace('%SERVERNAME%', client.config.serverName))
            .setDescription(`${client.l.tick.new.messageLine1}\n${client.l.tick.new.messageLine2}
            \n${client.l.tick.new.messageLine3}\n\n${client.l.tick.new.reason} ${reason}`)
            .setFooter(`${client.l.tick.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username)}`, client.user.avatarURL())
            .setColor(client.config.colour)
        c.send(thanksEmbed)

        client.log(client.l.tick.new.log, `${client.l.gen.logs.user} ${message.author} (${message.author.id})\n${client.l.gen.logs.channel} ${message.channel}\n${client.l.gen.logs.ticket} ${c}`)

    })

}

// © Hawsk Romania Discord Bot | Do Not Copy



