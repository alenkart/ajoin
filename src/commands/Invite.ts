import { Command, ActionParams } from "../core";

const getLink = (clientId) => {
  return `https://discordapp.com/oauth2/authorize?client_id=${clientId}&scope=bot&permissions=8`;
};

class Invite extends Command {
  constructor() {
    super("invite", "Shows a link to invite the bot to a server");
  }

  async action({ message, client }: ActionParams) {
    const { user } = client;

    const url = getLink(user.id);

    const embed = {
      url,
      color: 0x0099ff,
      title: "Invite AJoin 🎉",
      description: "Click on the above link and level up!",
    };

    message.channel.send({ embed });
  }
}

export default Invite;
