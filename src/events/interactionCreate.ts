import {
  CommandInteraction,
  AutocompleteInteraction,
  Collection,
} from "discord.js";

import Ajoin from "@ajoin/core/Ajoin";
import Event from "@ajoin/core/Event";
import Timeout from "@ajoin/core/Timeout";
import { Command } from "@ajoin/core/Command";
import logger from "@ajoin/helpers/logger";

type Interaction = CommandInteraction | AutocompleteInteraction;

class InteractionCreate extends Event<"interactionCreate"> {
  coolDowns = new Collection<string, Timeout>();

  async executeCommand(command: Command, interaction: Interaction) {
    if (interaction.isCommand()) {
      return command.execute(interaction);
    } else if (interaction.isAutocomplete()) {
      return command.autocomplete(interaction);
    }

    throw new Error(`Unimplemented handler`);
  }

  async execute(interaction: Interaction) {
    try {
      const { client, commandName } = interaction;

      const command = (client as Ajoin).getCommand(commandName);

      if (!command) throw new Error(`Command not found`);

      if (command instanceof Command) {
        return this.executeCommand(command, interaction);
      }

      const subCommandName = interaction.options.getSubcommand();

      const subCommand = command.commands.find(
        (command) => command.name === subCommandName
      );

      if (!subCommand) throw new Error(`SubCommand not found`);

      return this.executeCommand(subCommand, interaction);
    } catch (error) {
      logger.error(`Event: InteractionCreate`, error?.message);
    }
  }
}

export default new InteractionCreate();
