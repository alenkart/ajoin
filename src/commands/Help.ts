import config from "../config.json";
import commander from "commander";
import { Command, ActionParams } from "../core";

const formatCommnad = (command: commander.Command) => {
  return {
    value: "```" + `${config.prefix}${command.name()}` + "```",
    name: command.description(),
  };
};

type Commander = {
  parent: { commands: commander.Command[] };
} & commander.Command;

class Help extends Command {
  constructor() {
    super("help [command]", "Display the commands help");
  }

  async action({ message, program }: ActionParams) {
    const fields = (program as Commander).parent.commands.map(formatCommnad);

    const embed = {
      color: 0x0099ff,
      title: "Help",
      description: "The `sound_name` can be a word or user mention `@AJoin`",
      fields,
      timestamp: new Date(),
      footer: {
        text: `Version: ${config.version}`,
      },
    };

    message.channel.send({ embed });
  }
}

export default Help;
