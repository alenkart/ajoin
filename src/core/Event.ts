import * as discord from "discord.js";

type EventTypes = keyof discord.ClientEvents;

type EventParams<T extends EventTypes> = discord.ClientEvents[T];

export abstract class Event<T extends EventTypes> {
  event: T;
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
