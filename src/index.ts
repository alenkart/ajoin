import "dotenv/config";
import "@ajoin/helpers/prisma";
import { Intents } from "discord.js";
import Ajoin from "@ajoin/core/Ajoin";
import * as commands from "@ajoin/commands";
import * as events from "@ajoin/events";

const ajoin = new Ajoin({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_INTEGRATIONS,
  ],
});

Object.values(commands).forEach((command) =>
  ajoin.commands.set(command.name, command)
);

Object.entries(events).forEach(([name, event]) =>
  ajoin.on(name, (...args) => (event as any).handle(...args))
);

ajoin.login(process.env.DISCORD_TOKEN);
