const commands = require("../commands")
const { prefix, messageParser } = require("./utils");

function shouldSkip(message) {
    return message.author.bot || !message.content.startsWith(prefix);
}

module.exports = async function (message, client) {

    try {
        if (shouldSkip(message)) return;
        const { commandName } = messageParser(message);
        const command = Object.values(commands).find(command => command.name == commandName);

        if (!command) return;

        await command.execute(message, client)
    } catch (error) {
        console.log(error);
        message.channel.send("A wild error has appeared!");
    }

};
