import { Client } from "discord.js";
import * as events from "@ajoin/events";

export class Ajoin {
  client = new Client();

  listen() {
    for (let Event of Object.values(events)) {
      
      const event = new Event(this.client);

      this.client.on(event.event, async (...args) => {
        try {
          console.log(event.event);
          await event.handle(...(args as any));
        } catch (er) {
          console.log(er);
        }
      });

      console.log(`Event: ${event.event}`);
    }

    this.client.login();
  }
}
