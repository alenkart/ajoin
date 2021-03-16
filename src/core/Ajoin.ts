import { Client } from "discord.js";
import { DBAudio } from "../audios";
import AudioPlayer from "./AudioPlayer";
import { MessageEvent, VoiceStateUpdateEvent } from "../events";
import * as commands from "../commands";
import Command from "./Command";

class Ajoin extends Client {
  events() {
    this.once("ready", () => {
      console.log(`Environment: ${process.env.NODE_ENV}`);
      console.log(`Logged in as ${this.user?.tag}!`);
    });

    this.once("reconnecting", () => {
      console.log("Reconnecting!");
    });

    this.once("disconnect", () => {
      console.log("Disconnect!");
    });
  }

  messaagEvent() {
    this.on("message", async (message) => {
      const _commands = Object.values(commands).map(Current => new Current());
      const handler = new MessageEvent(this, message, _commands);

      try {
        await handler.handle();
      } catch (error) {
        console.log("message ==>", { error: error.message });
        message.channel.send("Error");
      }
    });
  }

  voiceStateUpdateEvent() {
    this.on("voiceStateUpdate", (oldMember, newMember) => {
      const voiceStateUpdate = new VoiceStateUpdateEvent(
        this,
        oldMember,
        newMember
      );

      voiceStateUpdate.on(["joinChannel", "switchChannel"], async () => {
        const audio = new DBAudio({
          channel: newMember.channel,
          guildId: newMember.guild.id,
          soundId: `<@!${newMember.id}>`,
        });

        try {
          await AudioPlayer.instance.push(audio);
        } catch (error) {
          console.log("voiceStateUpdate ==>", { error: error.message });
        }
      });

      voiceStateUpdate.handle();
    });
  }

  async init() {
    this.events();
    this.messaagEvent();
    this.voiceStateUpdateEvent();
    await super.login();
  }
}

export default Ajoin;
