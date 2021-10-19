import { StreamDispatcher } from "discord.js";

export class AudioDispatcher {
  private dispatcher: StreamDispatcher;

  constructor(dispatcher: StreamDispatcher) {
    this.dispatcher = dispatcher;
  }

  dispatch() {
    return new Promise<void>((resolve, reject) => {
      this.dispatcher.once("finish", () => resolve());
      this.dispatcher.once("error", (error) => reject(error));
    });
  }
}
