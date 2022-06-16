import { Client } from "discord.js";
import Event from "@ajoin/core/Event";

class Ready extends Event<"ready"> {
  async listen(client: Client) {
    console.log("Discord Js", client.user.tag);
  }
}

export default new Ready();
