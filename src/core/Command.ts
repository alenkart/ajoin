import {
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  SharedNameAndDescription,
  SharedSlashCommandOptions,
  ApplicationCommandOptionBase,
} from "@discordjs/builders";

import { CommandInteraction, AutocompleteInteraction } from "discord.js";

import { Option } from "./Command/types";

type ISlashCommandBuilder = SharedNameAndDescription &
  SharedSlashCommandOptions;

interface CommandProps {
  name: string;
  description: string;
  options?: Option[];
}

export abstract class Command {
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
    return interaction.reply(this.name);
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

interface CommandGroupProps {
  name: string;
  description: string;
  commands: Command[];
}

export class CommandGroup {
  name: string;
  description: string;
  commands: Command[];

  get data() {
    return this.buildCommand().toJSON();
  }

  constructor({ name, description, commands = [] }: CommandGroupProps) {
    this.name = name;
    this.description = description;
    this.commands = commands;
  }

  buildCommand() {
    return this.build(new SlashCommandBuilder());
  }

  build(builder: SlashCommandBuilder) {
    const { name, description, commands = [] } = this;

    builder.setName(name).setDescription(description);

    commands.forEach((command) =>
      builder.addSubcommand(command.buildSubCommand())
    );

    return builder;
  }
}
