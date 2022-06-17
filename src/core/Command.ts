import { Message } from "discord.js";
interface Argument {
  validate?: (input?: string) => boolean;
  transform?: (input?: string) => string;
}

type CommandHandler = (params: { message: Message; args: string[] }) => void;

interface CommandConfig {
  args?: Argument[];
  handler?: CommandHandler;
}

class Command {
  name: string;
  args?: Argument[];
  handler?: CommandHandler;

  constructor(name: string, { args, handler }: CommandConfig = {}) {
    this.name = name;
    this.args = args;
    this.handler = handler;
  }

  execute(message: Message, args: string[]) {
    this.handler({ message, args });
  }
}

export default Command;
