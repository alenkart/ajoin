
const playSound = require("./playsound");
const { getUserMention } = require("./utils");

function shouldSkip(client, member) {
    return !member || !member.channel || member.id === client.user.id;
}

module.exports = async function (client, _, member) {
    if (shouldSkip(client, member)) return;
    const userMention = getUserMention(member.id);
    playSound(member.channel, member.guild.id, userMention);
};