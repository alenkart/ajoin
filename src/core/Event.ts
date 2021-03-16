import discord from "discord.js";

abstract class Event {
  client: discord.Client;

  constructor(client: discord.Client) {
    this.client = client;
  }

  abstract handle(): Promise<void>;
}

export default Event;
