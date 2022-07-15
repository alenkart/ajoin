import { CacheType, Interaction } from "discord.js";
import Ajoin from "@ajoin/core/Ajoin";
import Event from "@ajoin/core/Event";

class InteractionCreate extends Event<"interactionCreate"> {
  async listen(interaction: Interaction<CacheType>) {
    if (!interaction.isCommand()) return;

    const client = interaction.client as Ajoin;
    const command = client.commands.get(interaction.commandName);

    if (command) {
      command.run(interaction);
    }
  }
}

export default new InteractionCreate();
