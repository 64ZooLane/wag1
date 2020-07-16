const { writeFileSync } = require("fs");

module.exports = async (client) => writeFileSync("./config/settings.json", JSON.stringify(client.config, null, 2))