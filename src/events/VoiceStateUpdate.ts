import discord from "discord.js";
import { Event } from "@ajoin/core";

export class VoiceStateUpdate extends Event<"voiceStateUpdate"> {
    constructor(client: discord.Client) {
        super("voiceStateUpdate", client);
    }

    ignore(_: any, next: discord.VoiceState): boolean {
        return next.id === this.client.user?.id;
    }

    listen() { 
        console.log("event");
    }
}