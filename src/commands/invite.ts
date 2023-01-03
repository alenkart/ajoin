import { CommandInteraction } from "discord.js";
import { SlashCommand } from "@ajoin/core/Command";
import logger from "@ajoin/helpers/logger";
import { getInviteUrl } from "@ajoin/helpers/discord";

class Invite extends SlashCommand {
  constructor() {
    super({
      name: "invite",
      description: "Adds a new sound",
    });
  }

  async execute(interaction: CommandInteraction) {
    try {
      const { client } = interaction;

      const clientId = client.user?.id;

      if (!clientId) throw new Error(" A Wild Error Appears!");

      await interaction.reply({
        embeds: [
          {
            color: 0x0099ff,
            title: "Invite AJoin 🎉",
            description: "Click on the above link and level up!",
            url: getInviteUrl(clientId),
          },
        ],
      });
    } catch (error) {
      await interaction.reply("An Unexpected Error Occurred");
      logger.error("Command: Add", error.message);
    }
  }
}

export default new Invite();
