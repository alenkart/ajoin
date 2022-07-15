import { Client, ClientOptions, Collection } from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";

import Command from "@ajoin/core/Command";
import Event from "@ajoin/core/Event";
import importAll from "@ajoin/helpers/importAll";

class Ajoin extends Client {
  public commands: Collection<string, Command>;

  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection();
  }

  async loadCommands(path: string) {
    const commands = await importAll(path, (_, file) => file.default);

    for (const [filename, file] of Object.entries(commands)) {
      const name = filename.replace(".ts", "");
      this.commands.set(name, file);

      console.log("Command:", name);
    }
  }

  async loadEvents(path: string) {
    const events = await importAll(path, (_, file) => file.default);

    for (const [filename, file] of Object.entries(events)) {
      const event = filename.replace(".ts", "");
      this.on(event, (...args) => (file as Event<any>).handle(...args));

      console.log("Event:", event);
    }
  }

  async postCommands() {
    const { DISCORD_TOKEN, GUILD_ID } = process.env;
    const CLIENT_ID = this.user.id;

    const rest = new REST({ version: "9" }).setToken(DISCORD_TOKEN);

    try {
      const route =
        process.env.ENV === "production"
          ? Routes.applicationCommands(CLIENT_ID)
          : Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID);

      const body = this.commands.mapValues((command) => command.data);

      await rest.put(route, { body });

      console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
      console.log(error);
    }
  }
}

export default Ajoin;
