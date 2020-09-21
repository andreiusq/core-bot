const Discord = require("discord.js");

module.exports = (client, reaction, user) => {

    let giveaways = require("../data/giveaways.json");
    let giveaway = giveaways.find(g => g.messageID == reaction.message.id);
    if (
      reaction.emoji.name == client.config.giveawayEmoji &&
      giveaway &&
      giveaway.reactions.includes(user.id) &&
      !user.client
    ) {
      giveaways
        .find(g => g.messageID == reaction.message.id)
        .reactions.splice(giveaway.reactions.indexOf(user.id), 1);
      fs.writeFile("../data/giveaways.json", JSON.stringify(giveaways), function(err) {
        if (err) console.log(err);
      });
    }
  
}

// © Hawsk Romania Discord Bot | Do Not Copy