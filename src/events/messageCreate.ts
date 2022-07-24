import { Message } from "discord.js";
import Event from "@ajoin/core/Event";

class MessageCreate extends Event<"messageCreate"> {
  async ignore(message: Message) {
    return message.author.bot;
  }

  async execute(_: Message) {
    console.log(_.content)
  }
}

export default new MessageCreate();
