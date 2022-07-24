import { AutocompleteInteraction, CommandInteraction } from "discord.js";

export type OptionParser = (
  interaction: CommandInteraction | AutocompleteInteraction
) => string | null;

export interface Option {
  description: string;
  required?: boolean;
  autocomplete?: boolean;
  parser: OptionParser;
}

export interface BaseCommand {
  name: string;
  description: string;
  options?: Record<string, Option>;
}
