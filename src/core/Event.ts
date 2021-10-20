import * as discord from "discord.js";

export type EventTypes = keyof discord.ClientEvents;

export type EventParams<T extends EventTypes> = discord.ClientEvents[T];

export abstract class Event {
  event: EventTypes;
  client: discord.Client;

  constructor(event: EventTypes, client: discord.Client) {
    this.event = event;
    this.client = client;
  }

  abstract listen(...args: any[]): void;

  abstract ignore(...args: any[]): boolean;

  handle(...args: any[]) {
    if (this.ignore(...args)) {
      return;
    }

    this.listen(...args);
  }
}
