import { VoiceState } from "discord.js";
import { z } from "zod";
import Ajoin from "@ajoin/core/Ajoin";
import Event from "@ajoin/core/Event";
import AudioModel from "@ajoin/models/Audio";
import logger from "@ajoin/helpers/logger";
import validate from "@ajoin/helpers/validate";

export type StateMatcher = (old: VoiceState, next: VoiceState) => boolean;

export const onJoinChannel: StateMatcher = (old, next): boolean => {
  return !old.channelId && !!next.channelId;
};

export const onSwitchChannel: StateMatcher = (old, next): boolean => {
  const exists = !!(old.channelId && next.channelId);
  const diff = old.channelId !== next.channelId;
  return exists && diff;
};

class VoiceStateUpdate extends Event<"voiceStateUpdate"> {
  readonly matchers: StateMatcher[];

  constructor(...matchers: StateMatcher[]) {
    super();
    this.matchers = matchers;
  }

  async ignore(old, next: VoiceState) {
    if (next?.client?.user?.id == next.id) return true;
    return !this.matchers.some((marcher) => marcher(old, next));
  }

  async execute(_, next: VoiceState) {
    try {
      const { guild, member } = next;

      const values = validate(
        {
          memberId: z.string(),
          guildId: z.string(),
        },
        {
          guildId: guild.id,
          memberId: member?.id,
        }
      );

      const audio = await AudioModel.findOne(values);

      if (!audio) return;

      const client = next.client as Ajoin;
      const player = client.getAudioPlayer(values.guildId);

      await player.play(next.channel as any, audio.url);
    } catch (error) {
      logger.error(`Event: VoiceStateUpdate`, error?.message);
    }
  }
}

export default new VoiceStateUpdate(onJoinChannel, onSwitchChannel);
