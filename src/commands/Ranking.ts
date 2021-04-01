import discord from "discord.js";
import { Command, CommandParams, DisplayableError } from "@ajoin/core";
import { SoundRanking } from "@ajoin/models";

const getMedal = (place: number): string => {
  if (place > 2) {
    return `${place}`;
  }

  const places = ["🥇", "🥈", "🥉"];
  return places[place];
};

export class Ranking extends Command {
  command = "ranking";
  describe = "ranking of monthly sounds";

  async run({ message }: CommandParams): Promise<void> {
    const top = 5;
    const ranking = (await SoundRanking.findTop(top)) as any[];

    if (ranking.length < 1) {
      throw new DisplayableError("You play sounds I do the raking, deal?");
    }

    const embed = new discord.MessageEmbed();

    embed
      .setColor(0x674ea7)
      .setDescription(`Top ${top} of most played sounds this month`);

    for (let index = 0; index < ranking.length; index++) {
      const rank = ranking[index];

      embed.addField(
        `Place: ${getMedal(index)} Plays: ${rank.counter}`,
        `Sound: ${rank.Sound.soundId}`
      );
    }

    message.channel.send(embed);
  }
}
