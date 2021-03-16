import { Database } from "../core";
import { createSound } from "./Sound";

const database = new Database();

const Sound = createSound(database.sequelize);

database.start();

export { Sound };
