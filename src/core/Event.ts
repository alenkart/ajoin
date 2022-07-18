import { ClientEvents } from "discord.js";

type EventTypes = keyof ClientEvents;

type EventParams<T extends EventTypes> = ClientEvents[T];

abstract class Event<T extends EventTypes> {
  abstract execute(...args: EventParams<T>): Promise<void>;

  async ignore(..._args: EventParams<T>) {
    return false;
  }

  async listener(...args: EventParams<T>) {
    if (await this.ignore(...args)) return;

    await this.execute(...args);
  }
}

export default Event;
