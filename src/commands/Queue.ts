import { Command, CommandParams, AudioPlayer } from "@ajoin/core";

export class Queue extends Command {
  command = "queue";
  describe = "help talk";

  run({ message }: CommandParams): void {
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
