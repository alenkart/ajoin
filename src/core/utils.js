const prefix = "$";

function getUserMention(userId) {
  return `<@!${userId}>`;
}

function messageParser(message) {
  const args = message.content.split(" ").filter((arg) => arg);
  const commandName = args.shift().toLowerCase().replace(prefix, "");
  const guildId = message.guild.id;

  return {
    args,
    commandName,
    guildId,
  };
}

module.exports = {
  prefix,
  getUserMention,
  messageParser
}