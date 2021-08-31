module.exports = async (client) => {

    const { RichEmbed } = require("@64zoolane/discord.js");

    client.checkPermission = function(channel, user, permission) {
        if (!client.channels.get(channel.id)) return;
        else return (channel.type == "dm" || (channel.type == "text" && channel.permissionsFor(user.id).has(permission, true)));
    };

    client.sendContent = function(channel, user, content) {
        if (client.checkPermission(channel, user, "EMBED_LINKS"))
            return client.channels.get(channel.id).send(new RichEmbed().setColor(client.config.embedcolor).setDescription(content));
        else return client.channels.get(channel.id).send(content);
    };
    
    client.capitalizeString = function(string) {
        if (!typeof string == "string" || !string instanceof String) return console.error(`Provided argument is of type "${typeof string}"`);
        else return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase();
    }

};