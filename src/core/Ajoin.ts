import { Client } from "discord.js";
import * as events from "@ajoin/events";

export class Ajoin {
  client = new Client();

  listen() {
    for (let Event of Object.values(events)) {
      const event = new Event(this.client);
      this.client.on(
        event.event,
        async (...args) => await event.handle(...args)
      );

      console.log(`Event: ${event.event}`);
    }

    this.client.login();
  }
}
