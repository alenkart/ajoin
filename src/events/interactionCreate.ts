import { Collection, CacheType, Interaction, Events } from "discord.js";

import Ajoin from "@ajoin/core/Ajoin";
import Event from "@ajoin/core/Event";
import Timeout from "@ajoin/core/Timeout";
import { SlashCommand } from "@ajoin/core/Command";
import logger from "@ajoin/helpers/logger";

type ExtendInteraction = Interaction<CacheType> & {
  commandName?: string;
  client: Ajoin;
};

class InteractionCreate extends Event<Events.InteractionCreate> {
  coolDowns = new Collection<string, Timeout>();

  async executeCommand(command: SlashCommand, interaction: Interaction) {
    if (interaction.isChatInputCommand()) {
      return command.execute(interaction);
    } else if (interaction.isAutocomplete()) {
      return command.autocomplete(interaction);
    }

    throw new Error(`Unimplemented handler`);
  }

  async execute(interaction: ExtendInteraction) {
    try {
      if (!interaction.commandName) return;

      const command = interaction.client.getCommand(interaction.commandName);

      if (!command) throw new Error("Command not found");

      this.executeCommand(command, interaction);
    } catch (error) {
      logger.error(`Event: InteractionCreate`, error?.message);
    }
  }
}

export default new InteractionCreate();
