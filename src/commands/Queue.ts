import { Command, CommandParams, AudioPlayer } from "@ajoin/core";

export class Queue extends Command {
  command = "queue";
  describe = "help talk";

  run({ message }: CommandParams): void {
    if (AudioPlayer.instance.queue.length < 1) {
      message.channel.send("The queue is empty, please feed me 😭");
      return;
    }

    const { queue, size } = AudioPlayer.instance;

    const result = [`List of audios in queue ${queue.length}/${size}`];

    for (let index = 0; index < queue.length; index++) {
      const audio = queue[index];

      result.push(`${index + 1} - ${audio}`);
    }

    message.channel.send(result);
  }
}
