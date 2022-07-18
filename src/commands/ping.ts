import Command, { Interaction, Option } from "@ajoin/core/Command";
import * as yup from "yup";

class Ping extends Command {
  name: string = "ping";
  description: string = "Test ";
  options: Record<string, Option> = {
    name: {
      description: "p",
      validation: yup.string().required(),
      parser: ({ options }) => options.getString("name"),
    },
  };

  async execute(interaction: Interaction) {
    const { name } = this.getOptionsValues(interaction);
    await interaction.reply(name);
  }
}

export default new Ping();
