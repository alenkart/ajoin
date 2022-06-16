interface Argument {
  value?: string;
  validate?: (input?: string) => boolean;
  transform?: (input?: string) => string;
}

interface CommandConfig {
  args?: Argument[];
  handler?: (args: Argument[]) => void;
}

class Command {
  name: string;
  args?: Argument[];
  handler?: (args: Argument[]) => void;

  constructor(name: string, { args, handler }: CommandConfig) {
    this.name = name;
    this.args = args;
    this.handler = handler;
  }

  execute(values?: string[]) {
    const { args } = this;
    const result = args?.map((arg, index) => arg.validate(values[index]));
    console.log(result);
  }
}

export default Command;
