import { Command, CommandParams } from "@ajoin/core";

const getLink = (clientId: string) => {
  return `https://discordapp.com/oauth2/authorize?client_id=${clientId}&scope=bot&permissions=8`;
};

export class Invite extends Command {
  command = "invite";
  describe = "Shows a link to invite the bot to a server";

  run({ message }: CommandParams): void {
    const url = getLink(this.client.user.id);

    const embed = {
      url,
      color: 0x0099ff,
      title: "Invite AJoin 🎉",
      description: "Click on the above link and level up!",
    };

    message.channel.send({ embed });
  }
}
