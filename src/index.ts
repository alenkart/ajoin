import "reflect-metadata";
import dotenv from "dotenv";
import { TypeOrmDatabase } from "./core/IDatabase";
import { Sound } from "./entities/Sound";
import { Ready } from "@ajoin/events/Ready";
import { Ajoin } from "@ajoin/core/Ajoin";

dotenv.config();

async function test() {
  try {
    const db = new TypeOrmDatabase();
    await db.connect();
  } catch (error) {
    console.log(error);
  }
}

test();

const ajoin = new Ajoin();
ajoin.listen();
