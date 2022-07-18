import { CacheType, Interaction } from "discord.js";
import Ajoin from "@ajoin/core/Ajoin";
import Event from "@ajoin/core/Event";
import logger from "@ajoin/helpers/logger";

class InteractionCreate extends Event<"interactionCreate"> {
  async listen(interaction: Interaction<CacheType>) {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;
    const client = interaction.client as Ajoin;
    const command = client.commands.get(commandName);

    try {
      if (!command) throw new Error(`command ${commandName} not found`);

      await command.execute(interaction);
    } catch (error) {
      logger.error(`Unhandled error InteractionCreate`, error?.message);
      interaction.reply("A Wild error Appears");
    }
  }
}

export default new InteractionCreate();
