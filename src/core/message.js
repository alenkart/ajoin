const commands = require("../commands");
const { prefix, messageParser } = require("./utils");

function shouldSkip(message) {
    return message.author.bot || !message.content.startsWith(prefix);
}

module.exports = async function (message, client) {

    try {
        if (shouldSkip(message)) return;
        const parsedMsg = messageParser(message);
        const command = Object.values(commands).find(command => command.name == parsedMsg.command);

        if (!command) return;

        await command.run(message, parsedMsg.args, client);
    } catch (error) {
        if (error.displayable) {
            message.channel.send(error.message);
        } else {
            message.channel.send("A wild error has appeared!");
        }
    }

};
