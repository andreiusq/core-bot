
/* 


   -------------------------------------------------
   Hawsk Romania
   -------------------------------------------------
   Created By Matt
   Edited by andreiusq & emblema

   Version 1.3.2
   -------------------------------------------------
   Redistributing or leaking Hawsk Romania

   Redistributing or leaking Hawsk Romania is a criminal offence
   and you can and will be prosecuted for doing it.

   Check out our redistribution policy here,
   http://zeltux.net/legal/redistribution.html 

   Find out more about our licensing and terms in
   the READ ME file.
   -------------------------------------------------


   
*/

const Discord = require("discord.js")
const fs = require("fs")
const yaml = require('js-yaml')

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'], ws: { intents: Discord.Intents.ALL } })

function loadFile(file){
  return myFile = yaml.safeLoad(fs.readFileSync(`${file}`, 'utf8'))
}

client.config = loadFile(`./config/config.yml`)
client.l = loadFile(`./config/language.yml`)
client.cmds = loadFile(`./config/commands.yml`)

const { GiveawaysManager } = require("discord-giveaways")

const manager = new GiveawaysManager(client, {storage: "./data/giveaways.json",updateCountdownEvery: 10000,default: {botsCanWin: client.config.giveaways.botsCanWin,
exemptPermissions: client.config.giveaways.ignoreIfHasPermission,embedColor: client.config.colour,reaction: client.config.giveaways.reaction}})
client.giveawaysManager = manager

client.active = new Map()
client.guildInvites = new Map();

const SQLite = require("better-sqlite3")
const sql = new SQLite('./data/udb.sqlite')
 
var path = require('path')
client.root = path.resolve(__dirname)

require('console-stamp')(console,{
  label: false,
  pattern: 'HH:MM:ss',
  colors: {
      stamp: 'white',
  }
})

fs.copyFile('./custom_modules/economy-handler.js', './node_modules/quick.db/bin/handler.js', (err) => {if (err) console.log("Please install the quick.db package.")})
fs.copyFile('./custom_modules/Constants.js', './node_modules/discord-giveaways/src/Constants.js', (err) => {if (err) console.log("Please install the discord-giveaways package.")})

// Secures The Bot Into The Server
async function doSecurityEvent(guild) {
  const myServer = [`${client.config.setup.serverID}`]
  if(!myServer.includes(guild.id)) {
    guild.leave()
    console.log(`\x1b[41mSECURITY\x1b[40m \x1b[31mWe detected that someone tried to invite your bot to another server (${guild.id}), so Hawsk Romania automatically left it.\u001b[0m`)
    console.log(`\x1b[41mSECURITY\x1b[40m \x1b[31mYou may need to restart the bot to ensure Hawsk Romania has left unauthorised servers and the bot runs smoothly again.\u001b[0m`)
    console.log(`\x1b[41mSECURITY\x1b[40m \x1b[31mThere are probably errors below this notice, restart the bot and Hawsk Romania will run fine again.\u001b[0m`)
    return
  }
}

client.on('guildCreate', (guild) => {
  doSecurityEvent(guild)
})

client.on('ready', () => {
  client.guilds.cache.forEach(guild => {
    doSecurityEvent(guild)
  })
})

// Ready Event
client.on("ready", () => {

  client.user.setActivity(client.config.statusMessage, {type: `PLAYING`})

  client.dir = __dirname

  // Invites
  client.guilds.cache.forEach(guild => {
      guild.fetchInvites()
          .then(invites => client.guildInvites.set(guild.id, invites))
          .catch(err => console.log(err))
  })

  // Levels
  const levelTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get()
  if (!levelTable['count(*)']) {
    sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);").run()
    sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run()
    sql.pragma("synchronous = 1")
    sql.pragma("journal_mode = wal")}
  client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?")
  client.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);")

  // Joins
  const joinsTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'joins';").get()
  if (!joinsTable['count(*)']) {
    sql.prepare("CREATE TABLE joins (user TEXT, inviter TEXT);").run()
    sql.pragma("synchronous = 1")
    sql.pragma("journal_mode = wal")}

  // Leaves
  const leavesTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'leaves';").get()
  if (!leavesTable['count(*)']) {
    sql.prepare("CREATE TABLE leaves (user TEXT, inviter TEXT);").run()
    sql.pragma("synchronous = 1")
    sql.pragma("journal_mode = wal")}

  const databaseLogin = "%%__NONCE__%%"

  // TicketPanel
  const ticketPanelTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'ticketpanel';").get()
  if (!ticketPanelTable['count(*)']) {
    sql.prepare("CREATE TABLE ticketpanel (id TEXT PRIMARY KEY);").run()
    sql.prepare("CREATE UNIQUE INDEX idx_ticketpanel_id ON ticketpanel (id);").run()
    sql.pragma("synchronous = 1")
    sql.pragma("journal_mode = wal")}

  // Reaction Roles
  const reactionTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'reactionrole';").get()
  if (!reactionTable['count(*)']) {
    sql.prepare("CREATE TABLE reactionrole (message TEXT, reaction TEXT, role TEXT);").run()
    sql.pragma("synchronous = 1")
    sql.pragma("journal_mode = wal")}

  // VerifyPanel
  const verifyTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'verifypanel';").get()
  if (!verifyTable['count(*)']) {
    sql.prepare("CREATE TABLE verifypanel (id TEXT PRIMARY KEY);").run()
    sql.prepare("CREATE UNIQUE INDEX idx_verifypanel_id ON verifypanel (id);").run()
    sql.pragma("synchronous = 1")
    sql.pragma("journal_mode = wal")}

})

// Call Events
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    const event = require(`./events/${file}`)
    let eventName = file.split(".")[0]
    client.on(eventName, event.bind(null, client))
  })
})

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

console.log(`\u001b[0m`)
console.log(`\x1b[42mINFO\x1b[40m \x1b[30m\x1b[32mStarting...\x1b[37m\u001b[0m`)
console.log(`\u001b[0m`)
console.log(`\x1b[42mINFO\x1b[40m \x1b[37m----------------------------------\x1b[37m\u001b[0m`)
console.log(`\x1b[42mINFO\x1b[40m \x1b[36m           Hawsk Romania v1.3.2\x1b[37m\u001b[0m`)
console.log(`\x1b[42mINFO\x1b[40m \x1b[34m           Owned by \x1b[31mMatt\x1b[37m\u001b[0m`)
console.log(`\x1b[42mINFO\x1b[40m \x1b[34m     Edited by andreiusq & emblema \x1b[37m\u001b[0m`)
console.log(`\x1b[42mINFO\x1b[40m \x1b[37m----------------------------------\x1b[37m\u001b[0m`)
console.log(`\u001b[0m`)

const modules = [] 

const folder = './commands/';

fs.readdirSync(folder).forEach(file => {
  modules.push(file)
})

modules.forEach(c => {

  fs.readdir(`./commands/${c}/`, (err, files) => {
    if (err) throw err;

    if(c === `fun`){if(client.config.core.fun === "off") return}
    if(c === `moderation`){if(client.config.core.moderation === "off") return}
    if(c === `tickets`){if(client.config.core.support === "off") return}
    if(c === `utilities`){if(client.config.core.utilities === "off") return}
    if(c === `giveaways`){if(client.config.core.giveaways === "off") return}
    if(c === `economy`){if(client.config.core.economy === "off") return}
    if(c === `levels`){if(client.config.core.levels === "off") return}

    console.log(`\x1b[42mINFO\x1b[40m \x1b[33mLoaded \x1b[35mcore \x1b[34m${c}\x1b[33m.\x1b[37m\u001b[0m`)
    files.forEach(f => {
      if(!(f.split(".").pop() === "js")) return
      let commandName = f.split(".")[0]
      const props = require(`./commands/${c}/${f}`)
      if(c !== "zeltux"){
        props.aliases = []
        props.name = commandName
        props.type = "core"
        client.cmds[commandName].aliases.forEach(alias => props.aliases.push(alias))
        if(client.cmds[commandName].enabled === true || commandName === "setup"){
        client.commands.set(commandName, props)}
      }else{
        client.commands.set(commandName, props)
      }
    })
  })
})

fs.readdir(`./addons/`, (err, files) => {
  files.forEach((f, i) =>{
    let props = require(`./addons/${f}`)
    if(f.split(".").pop() === "js"){
      console.log(`\x1b[42mINFO\x1b[40m \x1b[33mLoaded \x1b[35maddon \x1b[36m${f}\x1b[33m.\x1b[37m`)
      props.commands.forEach(function(p){
        p.type = "addon"
        client.commands.set(p.name, p)
      })
      props.events.forEach(function(p){
        client.on(p.name, p.run.bind(null, client))
      })
    }
  })
})

client.login(client.config.setup.token)    


// © Hawsk Romania Discord Bot | Do Not Copy