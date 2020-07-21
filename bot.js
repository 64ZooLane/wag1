const { Client, Collection } = require("discord.js");
let client = new Client(), token;

["commands", "aliases"].forEach(c => (client[c] = new Collection()));
["command", "event"].forEach(h => require(`./handlers/${h}`)(client));

if (process.argv.slice(2).filter(a => a == "-debug")[0]) client.mode = "debug";

let tokenArg = process.argv.indexOf("-token");
if (tokenArg >= 0) {
    if (process.argv.length > tokenArg) token = process.argv[tokenArg + 1];
};

if (token) client.login(token).catch(console.error);
else return console.error("[ERR] Provided token is invalid or does not exist");
