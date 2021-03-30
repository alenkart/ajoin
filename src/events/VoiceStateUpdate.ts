import discord from "discord.js";
import { Event, AudioPlayer } from "@ajoin/core";
import { DBAudio } from "@ajoin/audios";

export type StateMatcher = (
  old: discord.VoiceState,
  next: discord.VoiceState
) => boolean;

export class VoiceStateUpdate extends Event<"voiceStateUpdate"> {
  matchers: StateMatcher[] = [joinChannel, switchChannel];

  constructor(client: discord.Client) {
    super("voiceStateUpdate", client);
  }

  ignore(old: discord.VoiceState, next: discord.VoiceState): boolean {
    //is the bot
    if (next.id === this.client.user?.id) {
      return true;
    }

    //is not a match
    const isMatch = this.matchers.find((marcher) => marcher(old, next));
    return !isMatch;
  }

  async listen(_, next: discord.VoiceState) {
    const audio = new DBAudio({
      channel: next.channel,
      guildId: next.guild.id,
      soundId: `<@!${next.id}>`,
    });

    await AudioPlayer.instance.push(audio);
  }
}

const joinChannel: StateMatcher = (
  old: discord.VoiceState,
  next: discord.VoiceState
): boolean => {
  return !old.channelID && !!next.channelID;
};

const switchChannel: StateMatcher = (
  old: discord.VoiceState,
  next: discord.VoiceState
): boolean => {
  const exists = old.channelID && next.channelID;
  const delta = old.channelID !== next.channelID;

  return exists && delta;
};
