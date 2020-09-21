const Discord = require('discord.js')
const db = require('quick.db')
const sortby = require('lodash.sortby')

function startsWith(db, str, options = { sort: undefined }) {
    var arr = [];
    for (var el of db.all()) {
        if (el.ID === null || !el.ID.startsWith(str)) continue;
        var { ID, data } = el;
        arr.push({
            ID: el.ID,
            data: el.data
        });
    }
    if (typeof options.sort === 'string') {
        if (options.sort.startsWith('.')) options.sort = options.sort.slice(1);
        options.sort = options.sort.split('.');
        arr = sortby(arr, options.sort);
        arr = arr.reverse();
    }
    return arr;
}

exports.run = async (client, message, args) => {
    message.delete()

 let money = db.all().filter(data => data.ID.startsWith(`money_${message.guild.id}`)).sort((a, b) => b.data - a.data)
    money.length = 10;
    var content = "";
    for (var i in money) {
        let user = client.users.cache.get(money[i].ID.split('_')[2])
		
        content += `${money.indexOf(money[i])+1}. ${user} - ${client.config.economy.currency}${money[i].data}\n`		
    }

    let topper = "%%__NONCE__%%"

    const Embed = new Discord.MessageEmbed()
        .setAuthor(`${message.guild.name} - ${client.l.eco.top.message}`)
        .setDescription(content)
        .setColor(client.config.colour)
        .setFooter(client.l.eco.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

    message.channel.send(Embed)
	
}

// © Hawsk Romania Discord Bot | Do Not Copy