import { VoiceState } from "discord.js";
import Event from "@ajoin/core/Event";
import AudioPlayer from "@ajoin/core/AudioPlayer";

export type StateMatcher = (
  oldState: VoiceState,
  newState: VoiceState
) => boolean;

export const onJoinChannel: StateMatcher = (oldState, newState): boolean => {
  return !oldState.channelId && !!newState.channelId;
};

export const onSwitchChannel: StateMatcher = (oldState, newState): boolean => {
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
    const audioPlayer = new AudioPlayer();

    audioPlayer.play(
      newState.channel as any,
      "https://www.myinstants.com/media/sounds/not-not.mp3"
    );
  }
}

export default new VoiceStateUpdate(onJoinChannel, onSwitchChannel);
