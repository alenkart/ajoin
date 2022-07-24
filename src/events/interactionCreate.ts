import {
  CommandInteraction,
  AutocompleteInteraction,
  Collection,
} from "discord.js";
import Ajoin from "@ajoin/core/Ajoin";
import Event from "@ajoin/core/Event";
import Timeout from "@ajoin/core/Timeout";
import logger from "@ajoin/helpers/logger";

type Interaction = CommandInteraction | AutocompleteInteraction;

class InteractionCreate extends Event<"interactionCreate"> {
  coolDowns = new Collection<string, Timeout>();

  getCommand({ client, commandName, options }: Interaction) {
    const command = (client as Ajoin).getCommand(commandName);

    if (!command) return;

    const subCommandName = options.getSubcommand(false);

    if (!subCommandName) return command;

    return command.subCommands.find(
      (subCommand) => subCommand.name === subCommandName
    );
  }

  async execute(interaction: Interaction) {
    try {
      const command = this.getCommand(interaction);

      if (!command) throw new Error(`Command not found`);

      if (interaction.isCommand()) {
        await command.execute(interaction);
      } else if (interaction.isAutocomplete()) {
        await command.onAutocomplete(interaction);
      }
    } catch (error) {
      logger.error(`Event: InteractionCreate`, error?.message);
    }
  }
}

export default new InteractionCreate();
