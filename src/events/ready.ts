import { Client } from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { z } from "zod";
import Ajoin from "@ajoin/core/Ajoin";
import Event from "@ajoin/core/Event";
import logger from "@ajoin/helpers/logger";
import validate from "@ajoin/helpers/validate";

class Ready extends Event<"ready"> {
  getCommands(client: Client) {
    return (client as Ajoin).commands.mapValues((command) => command.data);
  }

  async execute(client: Client) {
    console.log("Discord Js", client?.user?.tag);

    const { DISCORD_TOKEN, GUILD_ID } = process.env;
    const CLIENT_ID = client?.user?.id;

    const values = validate(
      {
        GUILD_ID: z.string(),
        CLIENT_ID: z.string(),
        DISCORD_TOKEN: z.string(),
      },
      {
        GUILD_ID,
        CLIENT_ID,
        DISCORD_TOKEN,
      }
    );

    const rest = new REST({ version: "9" }).setToken(values.DISCORD_TOKEN);

    try {
      const route =
        process.env.ENV === "production"
          ? Routes.applicationCommands(values.CLIENT_ID)
          : Routes.applicationGuildCommands(values.CLIENT_ID, values.GUILD_ID);

      await rest.put(route, {
        body: this.getCommands(client),
      });

      console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
      console.log(error);
      logger.error(`Event: Ready`, error?.message);
    }
  }
}

export default new Ready();
