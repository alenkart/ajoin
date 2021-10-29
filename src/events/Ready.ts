import discord from "discord.js";
import { Event } from "@ajoin/core";

export class Ready extends Event<"ready"> {
  constructor(client: discord.Client) {
    super("ready", client);
  }

  async ignore() {
    return false;
  }

  async listen() {
    console.log("Ajoin is ready", this.client.user?.tag);
  }
}
