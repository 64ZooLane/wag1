const { RichEmbed } = require("@64zoolane/discord.js");

module.exports = {
  	config: {
    	name: "mutual",
    	aliases: ["channels"],
        description: "Displays all mutual channels you have with a user",
        note: "This command may not function correctly if the user is not cached",
        usage: "<cmd> <mention/id>",
        example: "mutual 600811457331986582",
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

        await client.channels.filter(c => c.type == "text").forEach(channel =>
            {
                let blacklist = client.config.blacklist;

                if (!channel.guild.members.has(mention.id)) return;
                else
                 if (blacklist.includes(channel.id) || blacklist.includes(channel.guild.id) 
                    || (channel.parentID && blacklist.includes(channel.parentID))) return;
                else
                 if (channel.permissionsFor(channel.guild.me).has(["SEND_MESSAGES", "READ_MESSAGES"], true)
                    && channel.permissionsFor(channel.guild.members.get(mention.id)).has("READ_MESSAGES", true)) 
                    return channels.push(channel);	

            });

        if (channels.length >= 1)
        {
            if (client.checkPermission(message.channel, message.author, "EMBED_LINKS"))
            {
                let embed = new RichEmbed()
                .setTitle(`You have ${channels.length} available mutual channels with ${mention.username}`)
                .setColor(client.config.embedcolor);

                client.guilds.filter(c => !client.config.blacklist.includes(c.id)).forEach(guild => {
                    let chnls = channels.filter(c => c.guild.id == guild.id);
                    if (chnls.length >= 1) embed.addField(guild.name, `\`${chnls.map(c => "#" + c.name).join("`, `")}\``);
                });
    
                message.channel.send(embed).then(msg => msg.delete(10000).catch(() => {})).catch(console.error);
            }
            else {
                return client.sendContent(message.channel, message.author, `You have \`${channels.length}\` mutual channels with ${mention.username}`)
                    .then(msg => msg.delete(5000)).catch(console.error);
            }

        } else {
            return client.sendContent(message.channel, message.author, "No available mutual channels were found.")
                .then(msg => msg.delete(5000).catch(() => {})).catch(console.error);      
        };

  	}
};
