import { ClientEvents } from "discord.js";

type EventTypes = keyof ClientEvents;

type EventParams<T extends EventTypes> = ClientEvents[T];

abstract class Event<T extends EventTypes> {
  abstract listen(...args: EventParams<T>): Promise<void>;

  async ignore(..._args: EventParams<T>) {
    return false;
  }

  async handle(...args: EventParams<T>) {
    if (await this.ignore(...args)) return;

    await this.listen(...args);
  }
}

export default Event;
