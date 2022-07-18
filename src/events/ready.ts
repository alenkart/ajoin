import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import Ajoin from "@ajoin/core/Ajoin";
import Event from "@ajoin/core/Event";
import logger from "@ajoin/helpers/logger";

class Ready extends Event<"ready"> {
  async listen(client: Ajoin) {
    console.log("Discord Js", client.user.tag);

    const { DISCORD_TOKEN, GUILD_ID } = process.env;
    const CLIENT_ID = client.user.id;

    const rest = new REST({ version: "9" }).setToken(DISCORD_TOKEN);

    try {
      const route =
        process.env.ENV === "production"
          ? Routes.applicationCommands(CLIENT_ID)
          : Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID);

      await rest.put(route, {
        body: client.commands.mapValues((command) => command.data),
      });

      console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
      logger.error(error.message);
    }
  }
}

export default new Ready();
