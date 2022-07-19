import {
  Interaction,
  CommandInteraction,
  AutocompleteInteraction,
} from "discord.js";
import Ajoin from "@ajoin/core/Ajoin";
import Event from "@ajoin/core/Event";
import logger from "@ajoin/helpers/logger";

class InteractionCreate extends Event<"interactionCreate"> {
  async autocomplete(interaction: AutocompleteInteraction) {
    const { commandName } = interaction;
    const client = interaction.client as Ajoin;
    const command = client.getCommand(commandName);

    if (!command) throw new Error(`Autocomplete ${commandName} not found`);

    await command.onAutocomplete(interaction);
  }

  async command(interaction: CommandInteraction) {
    const { commandName } = interaction;
    const client = interaction.client as Ajoin;
    const command = client.getCommand(commandName);

    if (!command) throw new Error(`Command ${commandName} not found`);

    await command.execute(interaction);
  }

  async execute(interaction: Interaction) {
    try {
      if (interaction.isAutocomplete()) {
        await this.autocomplete(interaction);
      } else if (interaction.isCommand()) {
        await this.command(interaction);
      }
    } catch (error) {
      logger.error(`Event: InteractionCreate`, error?.message);
    }
  }
}

export default new InteractionCreate();
