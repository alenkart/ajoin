import { Client, ClientOptions, Collection } from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import Command from "@ajoin/core/Command";

class Ajoin extends Client {
  public commands: Collection<string, Command>;

  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection();
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
