import { Command, ActionParams, AudioPlayer, Audio } from "../core/index";

const formatAudio = (audio: Audio) => {
  return `${audio}`;
};

class Queue extends Command {
  constructor() {
    super("queue", "help talk");
  }

  async action({ message }: ActionParams) {
    const msg = AudioPlayer.instance.queue.map(formatAudio);

    message.channel.send(msg);
  }
}

export default Queue;
