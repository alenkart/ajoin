import "dotenv/config";
import "@ajoin/helpers/prisma";
import { Client, Intents } from "discord.js";
import ready from "@ajoin/events/ready";
import messageCreate from "@ajoin/events/messageCreate";
import voiceStateUpdate from "@ajoin/events/voiceStateUpdate";

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

client.on("ready", (...args) => ready.handle(...args));
client.on("messageCreate", (...args) => messageCreate.handle(...args));
client.on("voiceStateUpdate", (...args) => voiceStateUpdate.handle(...args));

client.login(process.env.DISCORD_TOKEN);
