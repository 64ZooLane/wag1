const { RichEmbed } = require("@64zoolane/discord.js");

module.exports = {
  	config: {
    	name: "add",
    	aliases: [],
    	description: "Add an item to an array in the config",
    	usage: "<cmd> <setting> <value> [value]",
    	category: "settings"
  	},
  	run: async (client, message, args) => {
		
		message.delete().catch(() => {});

		if (!args[1] || !args[2]) return client.sendContent(message.channel, message.author, `Missing parameters. Refer to \`${
			client.config.prefix}help ${args[0]}\` for more information.`).then(msg => msg.delete(5000).catch(() => {})).catch(console.error);

    	client.emit("readConfig");

		if (!client.config[args[1].toLowerCase()]) return client.sendContent(message.channel, message.author,
			`No setting for \`${args[1]}\` could be found. Refer to \`${client.config.prefix
			}config\` for more information.`).then(msg => msg.delete(5000).catch(() => {})).catch(console.error);
		
		let values = [];

		args.slice(2).forEach(a => {
			if (!Object.values(client.config[args[1].toLowerCase()]).includes(a.toLowerCase())) {
				client.config[args[1].toLowerCase()].push(a.toLowerCase());
				values.push(a.toLowerCase());
			};
		});

		client.emit("writeConfig");

		let description = [];

		if (values.length > 0) {
			description.push(`Successfully added \`${values.length}\` new value${values.length > 1 ? "s" : ""} to \`${
				args[1].toLowerCase()}\``);	
			if (values.length < args.slice(2).length) {
				description.push(`\nFailed to add ${args.slice(2).length - values.length} value${args.slice(2).length - values.length> 1 ? "s" : ""} as they already existed`);
			}
		} else description.push(`Unable to add value${args.slice(2).length - values.length> 1 ? "s" : ""} to config as they already existed`);
		

		client.sendContent(message.channel, message.author, description.join("\n"))
			.then(msg => msg.delete(10000).catch(() => {})).catch(console.error);
  	}
};
