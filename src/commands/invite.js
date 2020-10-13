const { Command } = require("../core/command");

const command = new Command({ name: "invite" });

function getLink(client_id) {
    return `https://discordapp.com/oauth2/authorize?client_id=${client_id}&scope=bot&permissions=8`;
}

command.execute = async function (message, _, client) {

    const { user } = client;

    const embed = {
        color: 0x0099ff,
        title: 'Invite AJoin 🎉',
        url: getLink(user.id),
        description: 'Click on the above link and level up!'
    };

    message.channel.send({ embed });
}

module.exports = command;