const { RichEmbed } = require("discord.js");

module.exports = {
  	config: {
    	name: "set",
    	aliases: [],
    	description: "Set a new value for a setting in the config",
    	usage: "<cmd> <setting> <value>",
    	category: "settings"
  	},
  	run: async (client, message, args) => {
		
		message.delete().catch(() => {});

		if (!args[1] || !args[2]) return client.sendContent(message.channel, message.author, `Missing parameters. Refer to \`${
			client.config.prefix}help ${args[0]}\` for more information.`).then(msg => msg.delete(5000).catch(() => {})).catch(console.error);

        client.emit("readConfig");
        
        if (Array.isArray(client.config[args[1].toLowerCase()]))
            return client.sendContent(message.channel, message.author, `This command cannot be used for arrays. Consider using \`${
				client.config.prefix}\`add instead`).then(msg => msg.delete(5000).catch(() => {})).catch(console.error);

		if (!client.config[args[1].toLowerCase()]) return client.sendContent(message.channel, message.author, `No setting for \`${
			args[1]}\` could be found. Refer to \`${client.config.prefix}config\` for more information.`).then(msg => msg.delete(5000).catch(() => {})).catch(console.error);
            
        if (!isNaN(args[2]) && args.slice(2).length == 1) client.config[args[1].toLowerCase()] = parseInt(args[2]);
		else client.config[args[1].toLowerCase()] = args.slice(2).join(" ");

		client.emit("writeConfig");

       	client.sendContent(message.channel, message.author, `Successfully updated \`${args[1].toLowerCase()
        	}\` to \`${client.config[args[1].toLowerCase()]}\``).then(msg => msg.delete(5000).catch(() => {})).catch(console.error);
  	}
};
