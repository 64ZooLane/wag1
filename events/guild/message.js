module.exports = async (client, message) => {
  if (message.author.id !== client.user.id) return;

  let prefix = client.config.prefix.toLowerCase();
  let args = message.content.trim().slice(prefix.length).split(/ +/g);

  if (!message.content.trim().startsWith(prefix)) return;

  let cmd = args[0].toLowerCase();
  let commandfile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

  if (commandfile) return commandfile.run(client, message, args);
};