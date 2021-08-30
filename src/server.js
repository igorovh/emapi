import { app } from './app';
import fs from 'fs';
import redis from 'redis';
import util from 'util';

export const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

export const client = redis.createClient({
    host: config.redis.host,
    port: config.redis.port
});
if(config.redis.password.length > 0) {
    console.info('Logging to redis with password...');
    client.auth(config.redis.password);
}

client.hget = util.promisify(client.hget);

app.listen(config.port, () => console.log(`Service running at port ${config.port}`));