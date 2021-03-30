import * as discord from "discord.js";

export type EventTypes = keyof discord.ClientEvents;

export type EventParams<T extends EventTypes> = discord.ClientEvents[T];

export abstract class Event<T extends EventTypes> {
  event: EventTypes;
  client: discord.Client;

  constructor(event: T, client: discord.Client) {
    this.event = event;
    this.client = client;
  }

  abstract listen(...args: EventParams<T>): void;

  abstract ignore(...args: EventParams<T>): boolean;

  handle(...args: EventParams<T>) {
    if (this.ignore(...args)) {
      return;
    }

    this.listen(...args);
  }
}
