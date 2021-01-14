const { CommandError } = require('./errors');

module.exports.Command = function ({ name, execute, cooldown = 1 }) {
    this.name = name;
    this.execute = execute;

    this.cooldown = new Set();

    this.run = async function (message, args, client) {
        const authorId = message.author.id;
        this.executeCooldown(authorId);

        await this.execute(message, args, client);
    }

    this.executeCooldown = function (authorId) {

        if (this.cooldown.has(authorId)) {
            throw new CommandError("Let's chill a bit, huh?");
        }

        this.cooldown.add(authorId);

        setTimeout(() => {
            this.cooldown.delete(authorId);
        }, cooldown * 1000);
    }
};