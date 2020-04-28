const prefix = "$";
const yargsParser = require('yargs-parser');

function getUserMention(userId) {
  return `<@!${userId}>`;
}

function messageParser(message) {
  const args = yargsParser(message.content)._;
  const command = args.shift().replace(prefix, '');

  return {
    command,
    args,
  }
}

module.exports = {
  prefix,
  getUserMention,
  messageParser
}