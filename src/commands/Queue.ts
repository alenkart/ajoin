import { Command, ActionParams, AudioPlayer } from "../core/index";

class Queue extends Command {
  constructor() {
    super("queue", "help talk");
  }

  async action({ message }: ActionParams) {
    if (AudioPlayer.instance.queue.length < 1) {
      message.channel.send("The queue is empty, please feed me 😭");
      return;
    }

    const msg = AudioPlayer.instance.queue.map(
      (audio, index) => `${index + 1} - ${audio}`
    );

    message.channel.send(msg);
  }
}

export default Queue;
