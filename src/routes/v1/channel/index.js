import express from 'express';
import { client, config } from '../../../server';
import { parseChannel as parse, exist } from '../../../parsers';

export const channelApi = express.Router();

channelApi.get('/:id/:service', async (request, response) => {
    const id = request.params.id;
    let service = request.params.service.toLowerCase();
    if(!exist(service)) service = 'all';
    const data = await client.hget('emotes-channel', `${id}-${service}`);
    let json;
    if(data) {
        json = JSON.parse(data);
        if((Date.now() - json['_cache']) > (config.cache[service] * 1000)) json = await parse(id, service)
    } else json = await parse(id, service)
    response.status(200).json(json);
});