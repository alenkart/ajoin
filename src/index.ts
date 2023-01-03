import "dotenv/config";
import "@ajoin/helpers/prisma";
import { IntentsBitField } from "discord.js";
import Ajoin from "@ajoin/core/Ajoin";
import * as commands from "@ajoin/commands";
import * as events from "@ajoin/events";

const commandTable: any[] = [];
const eventTable: any[] = [];

const ajoin = new Ajoin({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.GuildIntegrations,
  ],
});

Object.values(commands).forEach((command) => {
  commandTable.push({ command: command.name });
  ajoin.commands.set(command.name, command);
});

Object.entries(events).forEach(([name, event]) => {
  eventTable.push({ event: name });
  ajoin.on(name, (...args) => event.listener(...args));
});

ajoin.login(process.env.DISCORD_TOKEN);

console.table(commandTable);
console.table(eventTable);
