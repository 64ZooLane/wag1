module.exports = async (client) => {
    console.log(`Logged in as ${client.user.tag}`);
    client.emit("readConfig");
    client.emit("loadFunctions");
};