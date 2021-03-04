import dotenv from 'dotenv';
import Ajoin from './core/Ajoin';

dotenv.config();

const client = new Ajoin();

client.init();
