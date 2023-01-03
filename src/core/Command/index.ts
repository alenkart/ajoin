import {
  CommandInteraction,
  AutocompleteInteraction,
  SharedNameAndDescription,
  SharedSlashCommandOptions,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  ApplicationCommandOptionBase,
} from "discord.js";

import { Option } from "./types";

type ISlashCommandBuilder = SharedNameAndDescription &
  SharedSlashCommandOptions;

interface CommandProps {
  name: string;
  description: string;
  options?: Option[];
}

export abstract class SlashCommand {
  name: string;
  description: string;
  options?: Option[];

  get data() {
    return this.buildCommand().toJSON();
  }

  constructor({ name, description, options = [] }: CommandProps) {
    this.name = name;
    this.description = description;
    this.options = options;
  }

  async autocomplete(interaction: AutocompleteInteraction) {
    return interaction.respond([]);
  }

  async execute(interaction: CommandInteraction) {
    interaction.reply(this.name);
  }

  buildCommand() {
    return this.build(new SlashCommandBuilder());
  }

  buildSubCommand() {
    return this.build(new SlashCommandSubcommandBuilder());
  }

  build<T extends ISlashCommandBuilder>(builder: T) {
    const { name, description, options = [] } = this;
    builder.setName(name).setDescription(description);

    options.forEach((option) => {
      switch (option.type) {
        case "user":
          builder.addUserOption((builder) => this.buildOption(option, builder));
          break;
        default:
          const { autocomplete = false } = option;
          builder.addStringOption((builder) =>
            this.buildOption(option, builder).setAutocomplete(autocomplete)
          );
          break;
      }
    });

    return builder;
  }

  buildOption<T extends ApplicationCommandOptionBase>(
    { name, description, required = true }: Option,
    builder: T
  ): T {
    return builder
      .setName(name)
      .setDescription(description)
      .setRequired(required);
  }
}
