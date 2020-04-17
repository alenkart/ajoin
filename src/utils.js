const { User } = require("./database");
const helpJson = require("./help");

function getUserFromMention(mention) {
  const matches = mention.match(/^<@!?(\d+)>$/);
  if (!matches) return;
  const id = matches[1];
  return id;
}

exports.onJoinVoiceChat = async function (member) {
  const user = await User.findOne({
    where: {
      guildId: member.guild.id,
      userId: member.id,
    },
    raw: true,
  });

  if (!user) return;

  const connection = await member.channel.join();
  const dispatcher = connection.play(user.audioUrl, {
    volume: 0.5,
  });
};

exports.commands = {
  help: function () {
    const help = helpJson.map(
      (command, index) => `${command.description}${command.title}`
    );
    return help.join("\n");
  },
  show: async function (guildId, mention) {
    let where = { guildId };

    if (mention) {
      where.userId = getUserFromMention(mention);
    }

    const users = await User.findAll({
      where,
      raw: true,
    });

    const replay = users
      .map((user) => `😀 <@${user.userId}> 🔊 ${user.audioUrl}`)
      .join("\n ");

    return `List of sounds: \n ${replay}`;
  },
  set: async function (guildId, mention, audioUrl) {
    const userId = getUserFromMention(mention);

    await User.destroy({
      where: {
        guildId,
        userId,
      },
    });

    User.create({ guildId, userId, audioUrl });
  },
};
