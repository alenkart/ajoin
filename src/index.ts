import dotenv from "dotenv";
import { Ajoin } from "@ajoin/core/Ajoin";

dotenv.config();

const ajoin = new Ajoin();
ajoin.listen();
