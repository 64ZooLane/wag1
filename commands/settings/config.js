const { RichEmbed } = require("@64zoolane/discord.js");

module.exports = {
  	config: {
    	name: "config",
    	aliases: ["settings"],
    	description: "Displays the current config",
    	usage: "<cmd>",
    	category: "settings"
  	},
  	run: async (client, message) => {
		
		message.delete().catch(() => {});

    	client.emit("readConfig");

		let settings = [];

		Object.entries(client.config).forEach(setting => {
			if (Array.isArray(setting[1]))
				settings.push(`**${setting[0]}** ➔ ${setting[1][0] ? `\`${setting[1].join("`, `")}\`` : "None"}`)
			else settings.push(`**${setting[0]}** ➔ \`${setting[1]}\``);
		});

		let embed = new RichEmbed()
		.setTitle("Configuration")
		.setColor(client.config.embedcolor)
		.setDescription(settings.join("\n"));

		if (client.checkPermission(message.channel, message.author, "EMBED_LINKS")) {
			message.channel.send(embed).then(msg => msg.delete(10000).catch(() => {})).catch(console.error);
		} else {
			client.sendContent(message.channel, message.author, embed.description)
				.then(msg => msg.delete(5000).catch(() => {})).catch(console.error);
		}
  	}
};
