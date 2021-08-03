import { app } from './app';
import fs from 'fs';
import redis from 'redis';
import util from 'util';

export const client = redis.createClient();
client.hget = util.promisify(client.hget);

export const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

app.listen(config.port, () => console.log(`Service running at port ${config.port}`));