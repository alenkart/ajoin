import "dotenv/config";
import "@ajoin/helpers/prisma";
import { Client, Intents } from "discord.js";
import ready from "@ajoin/events/ready";
import messageCreate from "@ajoin/events/messageCreate";

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", (args) => ready.handle(args));
client.on("messageCreate", (args) => messageCreate.handle(args));

client.login(process.env.DISCORD_TOKEN);
