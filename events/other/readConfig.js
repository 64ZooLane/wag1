const { readFileSync } = require("fs");

module.exports = async (client) => client.config = JSON.parse(readFileSync("./config/settings.json", "utf-8"));