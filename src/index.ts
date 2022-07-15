import "dotenv/config";
import "@ajoin/helpers/prisma";
import path from "node:path";
import { Intents } from "discord.js";
import Ajoin from "@ajoin/core/Ajoin";

(async () => {
  const ajoin = new Ajoin({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_VOICE_STATES,
      Intents.FLAGS.GUILD_INTEGRATIONS,
    ],
  });

  await ajoin.login(process.env.DISCORD_TOKEN);
  await ajoin.loadCommands(path.resolve(__dirname, "commands"));
  await ajoin.loadEvents(path.resolve(__dirname, "events"));
  await ajoin.postCommands();
})();
