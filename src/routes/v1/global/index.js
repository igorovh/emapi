import express from 'express';
import { exist, parseGlobal as parse } from '../../../parsers';
import { client, config } from '../../../server';

export const globalApi = express.Router();

globalApi.get('/:service', async (request, response) => {
    let service = request.params.service.toLowerCase();
    if(!exist(service)) service = 'all';
    const data = await client.hget('emotes-global', service);
    let json;
    if(data) {
        json = JSON.parse(data);
        if((Date.now() - json['_cache']) > (config.cache[service] * 1000)) json = await parse(service)
    } else json = await parse(service)
    response.status(200).json(json);
});