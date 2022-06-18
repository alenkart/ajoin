import { Message } from "discord.js";
interface Argument {
  validate?: (input?: string) => boolean;
  transform?: (input?: string) => string;
}

type CommandHandler = (params: { message: Message; args: string[] }) => void;

interface CommandConfig {
  args?: Argument[];
  run?: CommandHandler;
}

class Command {
  name: string;
  args?: Argument[];
  run?: CommandHandler;

  constructor(name: string, { args, run }: CommandConfig = {}) {
    this.name = name;
    this.args = args;
    this.run = run;
  }

  execute(message: Message, args: string[]) {
    this.run({ message, args });
  }
}

export default Command;
