import "reflect-metadata";
import dotenv from "dotenv";
import { TypeOrmDatabase } from "./core/IDatabase";
import { Sound } from "./entities/Sound";
// import { Ajoin } from "@ajoin/core/Ajoin";

dotenv.config();



async function test() {
  try {
    const db = new TypeOrmDatabase();

    await db.connect();
    const connection = await db.getConnection();

    const sound = new Sound();
    sound.guildId = "12345678";
    sound.name = "ddd";
    sound.url = "www.google.com";
    sound.author = "Alenkart Rodriguez";

    await connection.manager.save(sound);
  } catch (error) {
    console.log(error);
  }
}

test();



// const ajoin = new Ajoin();
// ajoin.listen();
