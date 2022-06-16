import { Message } from "discord.js";
import Event from "@ajoin/core/Event";
import pingCmd from "@ajoin/commands/ping";
import audioModel from "@ajoin/models/Audio";

class MessageCreate extends Event<"messageCreate"> {
  async listen(message: Message<boolean>) {
    console.log("messageCreate", message.content);

    switch (message.content) {
      case "add":
        await audioModel.create({ name: `${Date.now()}`, url: "" });
        break;
      default:
        pingCmd.execute(["string", "123456", "string"]);
        break;
    }
  }
}

export default new MessageCreate();
