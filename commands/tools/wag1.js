const { RichEmbed } = require("discord.js");

module.exports = {
  	config: {
    	name: "wag1",
    	aliases: [],
		description: "mentions a user in all mutual channels",
		note: "This command may not function correctly if the user is not cached",
        usage: "<cmd> <mention/id>",
        example: "wag1 @0.o",
    	category: "tools"
  	},
  	run: async (client, message, args) => {
		
		message.delete().catch(() => {});

        let mention = client.users.get(args[1]) || message.mentions.users.first();

        if (!args[1]) return client.sendContent(message.channel, message.author, `Missing parameters. Refer to \`${
            client.config.prefix}help ${args[0]}\` for more information.`)
            .then(msg => msg.delete(5000).catch(() => {})).catch(console.error);

		if (!mention) return client.sendContent(message.channel, message.author, `Could not find specified user. Refer to \`${
            client.config.prefix}help ${args[0]}\` for more information.`)
            .then(msg => msg.delete(5000).catch(() => {})).catch(console.error);
            

		let channels = [];
		let i = 0;

		function checkBlacklist(channel, push) 
		{
			let blacklist = client.config.blacklist;

			if (!channel.guild.members.has(mention.id)) return;
			
			if (blacklist.includes(channel.id) || blacklist.includes(channel.guild.id) 
				|| (channel.parentID && blacklist.includes(channel.parentID))) return;
			
			if (channel.permissionsFor(channel.guild.me).has(["SEND_MESSAGES", "READ_MESSAGES"], true)
				&& channel.permissionsFor(channel.guild.members.get(mention.id)).has("READ_MESSAGES", true)) 
			{
				if (push) return channels.push(channel);
				else return true
			}
			else return;
		}

        await client.channels.filter(c => c.type == "text").forEach(channel => checkBlacklist(channel, true));

		if (!channels.length > 0) {
			return client.sendContent(message.channel, message.author, `No available mutual channels were found. Cancelling request.`)
			.then(msg => msg.delete(5000).catch(() => {})).catch(console.error);
		} else client.sendContent(message.channel, message.author, `Starting messaging process. \`${channels.length
			}\` available mutual channels have been found.`).then(msg => msg.delete(5000).catch(() => {})).catch(console.error);

		channels.sort(function() { return Math.random() - 0.5 });

		channels.forEach((channel, i) => {
			let msg = client.config.message.replace(/\{username\}/gi, mention.username)
			.replace(/\{nickname\}/gi, channel.guild.members.get(mention.id).displayName)
			.replace(/\{channelname\}/gi, channel.name).replace(/\{guildname\}/gi, channel.guild.name)
			.replace(/\{mention\}/gi, mention.toString());

			setTimeout(() => {
				if (!checkBlacklist(channel)) return;

				channel.send(msg).then(() =>
				{ 
					i++;
					if (client.mode == "debug") 
						console.log(`[${i}] wag1'd ${mention.username} in ${channel.guild.name}/${channel.name}`);

					if (i >= channels.length) {
						if (client.mode == "debug") console.log(`Completed wag1 session for ${mention.username}`);
						client.sendContent(message.channel, message.author, `Completed wag1 session for ${mention.username}`)
							.then(msg => msg.delete(5000).catch(() => {}).catch(console.error);
					}
				}).catch(console.error);

			}, client.config.delay * i);
		});
  	}
};
