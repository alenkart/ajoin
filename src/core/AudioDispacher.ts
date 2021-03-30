import { StreamDispatcher } from "discord.js";

export class AudioDispacher {
  private dispatcher: StreamDispatcher;

  constructor(dispatcher: StreamDispatcher) {
    this.dispatcher = dispatcher;
  }

  handle() {
    return new Promise<void>((resolve, reject) => {
      this.dispatcher.once("finish", () => resolve());
      this.dispatcher.once("error", (error) => reject(error));
    });
  }
}

