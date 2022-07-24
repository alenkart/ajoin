import { AutocompleteInteraction, CommandInteraction } from "discord.js";
import { SlashCommandStringOption } from "@discordjs/builders";
import Ajoin from "@ajoin/core/Ajoin";
import * as discord from "@ajoin/helpers/discord";
import { BaseCommand as IBaseCommand, Option, OptionParser } from "./types";

type Interaction = CommandInteraction | AutocompleteInteraction;

abstract class BaseCommand implements IBaseCommand {
  name: string;
  description: string;
  options: Record<string, Option>;

  get data() {
    return this.build().toJSON();
  }

  get optionParsers() {
    const map = new Map<string, OptionParser>();

    for (const [name, option] of Object.entries(this.options)) {
      map.set(name, option.parser);
    }

    return map;
  }

  constructor({ name, description, options = {} }: IBaseCommand) {
    this.name = name;
    this.description = description;
    this.options = options;
  }

  getOptionsValues(interaction: Interaction) {
    const values: Record<string, string | null> = {};

    for (const [name, parser] of this.optionParsers) {
      values[name] = parser(interaction);
    }

    return values;
  }

  buildOption(
    name: string,
    { description, required = true, autocomplete = false }: Option
  ) {
    return new SlashCommandStringOption()
      .setName(name)
      .setDescription(description)
      .setRequired(required)
      .setAutocomplete(autocomplete);
  }

  // getAudioPlayer(interaction: Interaction, guildId: string) {
  //   const client = interaction.client as Ajoin;
  //   const voiceChannel = discord.getVoiceChannel(interaction);
  //   return client.getAudioPlayer(guildId);
  // }

  abstract build(): any;

  async onAutocomplete(interaction: AutocompleteInteraction) {
    await interaction.respond([]);
  }

  abstract execute(interaction: CommandInteraction): Promise<void>;
}

export default BaseCommand;
