const { Client, Collection } = require("discord.js");
const { token } = require("./config/token.json");
const client = new Client();

["commands", "aliases"].forEach(c => (client[c] = new Collection()));
["command", "event"].forEach(h => require(`./handlers/${h}`)(client));

if (process.argv.slice(2).filter(a => a == "-debug")[0]) client.mode = "debug";

client.login(token).catch(console.error);