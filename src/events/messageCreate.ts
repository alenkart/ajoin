import { Message } from "discord.js";
import Event from "@ajoin/core/Event";
import pingCmd from "@ajoin/commands/ping";

class MessageCreate extends Event<"messageCreate"> {
  async listen(message: Message<boolean>) {
    console.log("messageCreate", message.content);
    pingCmd.execute(["string", "123456", "string"]);
  }
}

export default new MessageCreate();
