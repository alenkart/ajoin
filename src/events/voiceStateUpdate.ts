import Event from "@ajoin/core/Event";
import { VoiceState } from "discord.js";

export type StateMatcher = (
  oldState: VoiceState,
  newState: VoiceState
) => boolean;

export const joinChannel: StateMatcher = (oldState, newState): boolean => {
  return !oldState.channelId && !!newState.channelId;
};

export const switchChannel: StateMatcher = (oldState, newState): boolean => {
  const exists = oldState.channelId && newState.channelId;
  const diff = oldState.channelId !== newState.channelId;
  return exists && diff;
};

class VoiceStateUpdate extends Event<"voiceStateUpdate"> {
  readonly matchers: StateMatcher[];

  constructor(...matchers: StateMatcher[]) {
    super();
    this.matchers = matchers;
  }

  async ignore(oldState, newState: VoiceState) {
    if (newState.client.user.id == newState.id) return true;
    return !this.matchers.some((marcher) => marcher(oldState, newState));
  }

  async listen(_: VoiceState, newState: VoiceState) {
    console.log(newState.id);
  }
}

export default new VoiceStateUpdate(joinChannel, switchChannel);
