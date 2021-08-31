const { RichEmbed } = require("@64zoolane/discord.js");

module.exports = {
    config: {
        name: "help",
        aliases: ["commands"],
        description: "Displays all the available commands",
        usage: "<cmd> [command] | <cmd> [page]",
        example: "help 3",
        category: "tools"
    },
    run: async (client, message, args) => {

        message.delete().catch(() => {});
        
        client.emit("readConfig");

        let embed = new RichEmbed()
        .setFooter("Do not include <> or [] — They indicate <required> and [optional] arguments")
        .setColor(client.config.embedcolor);

        if (args[1] && !/^\d+$/.test(args[1]))
        {
            let command = client.commands.get(client.aliases.get(args[1].toLowerCase()) || args[1].toLowerCase());
            
            if (command) {
                embed.setTitle(`Command: ${client.capitalizeString(command.config.name)}`);

                let types = ["description", "aliases", "note", "usage", "example", "category"];
                let description = [];

                for (type of types)
                {
                    let value = command.config[type];

                    if (Array.isArray(value)) description.push(`**${client.capitalizeString(type)}:** ${value[0] ? `\`${value.join("`, `")}\`` : "None"}`); 
                    else description.push(`**${client.capitalizeString(type)}:** ${value ? `\`${type.toString() == "example" ? client.config.prefix : ""}${value}\`` : "None"}`);
                }
                if (client.checkPermission(message.channel, message.author, "EMBED_LINKS"))  {
                    return message.channel.send(embed.setDescription(description.join("\n"))).then(msg => msg.delete(10000).catch(() => {})).catch(console.error);
                }
                else return client.sendContent(message.channel, message.author, description.join("\n")).then(msg => msg.delete(10000).catch(() => {})).catch(console.error);
            }
            else return client.sendContent(message.channel, message.author, `**The command \`${args[1]}\` does not exist**`)
                .then(msg => msg.delete(5000).catch(() => {})).catch(console.error);
        }
        else
        {
            let commands = [];
            
            client.commands.forEach((c) => {
                if (c.config.name) 
                    commands.push(`**${c.config.name.toLowerCase()}** - ${c.config.description ? c.config.description : "No description set"}`);
            })

            let description = args[1] ? commands.slice(10 * args[1] - 10, 10 * args[1]) : commands.slice(0, 10);
            
            if (!description[0]) 
                return client.sendContent(message.channel, message.author, "**No page data found**").then(msg => msg.delete(5000).catch(() => {})).catch(console.error);

            if (client.checkPermission(message.channel, message.author, "EMBED_LINKS"))  {
                return message.channel.send(embed.setDescription(`Use \`${client.config.prefix}help [commandname]\` for further command details. (Pg. ${
                    args[1] ? args[1] : "1"})\n\n${description.join("\n")}`)).then(msg => msg.delete(5000).catch(() => {})).catch(console.error);
            }
            else return client.sendContent(message.channel, message.author, description.join("\n")).then(msg => msg.delete(10000).catch(() => {})).catch(console.error);
        }
    }
};
