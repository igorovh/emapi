import express from 'express';
import { client, config } from '../../../server';
import { fetchJson } from '../../../utils/fetcher'; 

export const nameApi = express.Router();

nameApi.get('/:name', async (request, response) => {
    const name = request.params.name.toLowerCase();
    const data = await client.hget('names-id', name);
    let json;
    if(data) {
        json = JSON.parse(data);
        if((Date.now() - json['_cache']) > (config.cache['name'] * 1000)) json = await getId(name)
    } else json = await getId(name)
    if(!json.error) client.hset('names-id', `${name}`, JSON.stringify(json));
    response.status(200).json(json);
});

async function getId(name) {
    const json = await fetchJson(`https://api.twitch.tv/helix/users?login=${name}`, {
        headers: {
            'Authorization': `Bearer ${config.twitch.token}`,
            'Client-Id': config.twitch.clientId
        }
    });
    if(json.error) return { error: 'This user does not exists.' };
    if(json.data.length < 1) return { error: 'This user does not exists.' };
    return { '_cache': Date.now(), 'id': json.data[0].id };
}