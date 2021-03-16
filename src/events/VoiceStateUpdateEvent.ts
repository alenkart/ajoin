import { VoiceState, Client } from "discord.js";
import { Event } from "../core";

export type EventType = "switchChannel" | "joinChannel" | "leaveChannel";

export type EventHandler = (params: {
  client: Client;
  oldVoiceState: VoiceState;
  newVoiceState: VoiceState;
}) => EventType | void;

export type EventCallback = (event: EventType) => void;

export default class VoiceStateUpdateEvent extends Event {
  private oldVoiceState: VoiceState;
  private newVoiceState: VoiceState;

  private map: { [id: string]: EventCallback };
  private handlers: EventHandler[] = [joinChannel, leaveChannel, switchChannel];

  constructor(
    client: Client,
    oldVoiceState: VoiceState,
    newVoiceState: VoiceState
  ) {
    super(client);
    this.map = {};
    this.oldVoiceState = oldVoiceState;
    this.newVoiceState = newVoiceState;
  }

  private execute(event: EventType) {
    this.map[event]?.(event);
  }

  on(events: EventType | EventType[], callback: EventCallback) {
    events = events instanceof Array ? events : [events];

    events.map((event) => {
      this.map[event] = callback;
    });
  }

  async handle() {
    if (this.newVoiceState.id === this.client.user.id) {
      return;
    }

    const params = {
      client: this.client,
      oldVoiceState: this.oldVoiceState,
      newVoiceState: this.newVoiceState,
    };

    for (let handler of this.handlers) {
      const event = handler(params);

      if (event) {
        return this.execute(event);
      }
    }
  }
}

export const joinChannel: EventHandler = ({ oldVoiceState, newVoiceState }) => {
  const diff = !oldVoiceState.channelID && newVoiceState.channelID;

  return diff ? "joinChannel" : null;
};

export const leaveChannel: EventHandler = ({
  oldVoiceState,
  newVoiceState,
}) => {
  const delta = oldVoiceState.channelID && !newVoiceState.channelID;

  return delta ? "leaveChannel" : null;
};

export const switchChannel: EventHandler = ({
  oldVoiceState,
  newVoiceState,
}) => {
  const exists = oldVoiceState.channelID && oldVoiceState.channelID;
  const delta = oldVoiceState.channelID !== newVoiceState.channelID;

  return exists && delta ? "switchChannel" : null;
};
