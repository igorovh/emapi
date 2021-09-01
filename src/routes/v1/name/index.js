import express from 'express';
import { client, config } from '../../../server';
import fetch from 'node-fetch'; 

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
    console.log(name);
    const data = await fetch(`https://api.twitch.tv/helix/users?login=${name}`, {
        headers: {
            'Authorization': `Bearer ${config.twitch.token}`,
            'Client-Id': config.twitch.clientId
        }
    });
    const json = await data.json();
    if(json.error) return { error: 'This user does not exists.' };
    if(json.data.length < 1) return { error: 'This user does not exists.' };
    return { '_cache': Date.now(), 'id': json.data[0].id };
}