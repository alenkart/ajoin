import { Message } from "discord.js";
import Event from "@ajoin/core/Event";
import Lexer from "@ajoin/core/Lexer";
import addCmd from "@ajoin/commands/add";
import pingCmd from "@ajoin/commands/ping";

class MessageCreate extends Event<"messageCreate"> {
  async ignore(message: Message) {
    return message.author.bot;
  }

  async listen(message: Message) {
    console.log("messageCreate", message.content);

    const lexer = new Lexer(message.content);
    const [command, ...args] = lexer.tokenize();

    switch (command) {
      case "!add":
        addCmd.execute(message, args);
        break;
      case "!ping":
        pingCmd.execute(message, args);
        break;
    }
  }
}

export default new MessageCreate();
