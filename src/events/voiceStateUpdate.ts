import { VoiceState } from "discord.js";
import Event from "@ajoin/core/Event";
import AudioPlayer from "@ajoin/core/AudioPlayer";
import AudioModel from "@ajoin/models/Audio";
import * as discord from "@ajoin/helpers/discord";

export type StateMatcher = (old: VoiceState, next: VoiceState) => boolean;

export const onJoinChannel: StateMatcher = (old, next): boolean => {
  return !old.channelId && !!next.channelId;
};

export const onSwitchChannel: StateMatcher = (old, next): boolean => {
  const exists = old.channelId && next.channelId;
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
    if (next.client.user.id == next.id) return true;
    return !this.matchers.some((marcher) => marcher(old, next));
  }

  async listen(_, next: VoiceState) {
    try {
      const { guild, member } = next;

      const audio = await AudioModel.findOne({
        guildId: guild.id,
        name: discord.getUserMention(member.id),
      });

      const audioPlayer = new AudioPlayer();
      await audioPlayer.play(next.channel as any, audio.url);
    } catch (error) {
      console.log("VoiceStateUpdate", error);
    }
  }
}

export default new VoiceStateUpdate(onJoinChannel, onSwitchChannel);
