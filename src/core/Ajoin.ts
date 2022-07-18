import { Client, Collection } from "discord.js";
import Command from "@ajoin/core/Command";

class Ajoin extends Client {
  commands = new Collection<string, Command>();
}

export default Ajoin;
