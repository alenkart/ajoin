import {
  AutocompleteInteraction,
  CacheType,
  CommandInteraction,
  Interaction,
} from "discord.js";
import Ajoin from "@ajoin/core/Ajoin";
import Event from "@ajoin/core/Event";
import logger from "@ajoin/helpers/logger";

class InteractionCreate extends Event<"interactionCreate"> {
  async autocomplete(interaction: AutocompleteInteraction<CacheType>) {
    const { commandName } = interaction;
    const client = interaction.client as Ajoin;
    const command = client.commands.get(commandName);

    if (!command) throw new Error(`command ${commandName} not found`);

    await command.onAutocomplete(interaction);
  }

  async commands(interaction: CommandInteraction<CacheType>) {
    const { commandName } = interaction;
    const client = interaction.client as Ajoin;
    const command = client.commands.get(commandName);

    if (!command) throw new Error(`command ${commandName} not found`);

    await command.execute(interaction);
  }

  async execute(interaction: Interaction<CacheType>) {
    try {
      if (interaction.isAutocomplete()) {
        await this.autocomplete(interaction);
      } else if (interaction.isCommand()) {
        await this.commands(interaction);
      }
    } catch (error) {
      logger.error(`Event: InteractionCreate`, error?.message);
    }
  }
}

export default new InteractionCreate();
