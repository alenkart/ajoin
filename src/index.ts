import "dotenv/config";
import "@ajoin/helpers/prisma";
import { Intents } from "discord.js";
import Ajoin from "@ajoin/core/Ajoin";
import { CommandGroup } from "@ajoin/core/Command";
import * as commands from "@ajoin/commands";
import * as events from "@ajoin/events";

const commandTable: any[] = [];
const eventTable: any[] = [];

const ajoin = new Ajoin({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_INTEGRATIONS,
  ],
});

Object.values(commands).forEach((command) => {
  const subCommands =
    command instanceof CommandGroup
      ? command.commands.map((subCommand) => subCommand.name)
      : [];

  commandTable.push({ command: command.name, subCommands });

  ajoin.commands.set(command.name, command);
});

Object.entries(events).forEach(([name, event]) => {
  eventTable.push({ event: name });
  ajoin.on(name, (...args) => event.listener(...args));
});

ajoin.login(process.env.DISCORD_TOKEN);

console.table(commandTable);
console.table(eventTable);
