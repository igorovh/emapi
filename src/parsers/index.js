import { parse as parseBTTV, parseGlobal as parseGlobalBTTV } from './bttvparser'
import { parse as parseFFZ } from './ffzparser'
import { parse as parse7TV } from './7tvparser'
import { parse as parseTwitch } from './twitchparser'
import { CHANNEL_BTTV, CHANNEL_FFZ, CHANNEL_7TV, CHANNEL_TWITCH, GLOBAL_BTTV, GLOBAL_FFZ, GLOBAL_7TV, GLOBAL_TWITCH } from '../constants';
import { client } from '../server';
import { fetchJson } from '../utils/fetcher'
import { config } from '../server';

const services = ['bttv', 'ffz', '7tv', 'twitch', 'all'];

export function exist(service) {
    return services.includes(service);
}

export async function parseChannel(id, service) {
    let emotes = [];
    console.info(`Parsing - ${id} - ${service}`);
    switch(service) {
        case 'bttv':
            emotes = parseBTTV(await fetchJson(CHANNEL_BTTV.replace('{id}', id)));
            break;
        case 'ffz':
            emotes = parseFFZ(await fetchJson(CHANNEL_FFZ.replace('{id}', id)));
            break;
        case '7tv':
            emotes = parse7TV(await fetchJson(CHANNEL_7TV.replace('{id}', id)));
            break;
        case 'twitch':
            emotes = parseTwitch(await fetchJson(CHANNEL_TWITCH.replace('{id}', id), {
                headers: {
                    'Authorization': `Bearer ${config.twitch.token}`,
                    'Client-Id': config.twitch.clientId
                }
            }));
            break;
        default:
            for(let name of services) {
                if(name !== 'all') {
                    const data = await parseChannel(id, name);
                    emotes = emotes.concat(data.emotes);
                }
            }
    }
    const data = { '_cache': Date.now(), 'emotes': emotes };
    //TODO Don't save to service ALL, but just get them from other services.
    if(emotes.length > 1) client.hset('emotes-channel', `${id}-${service}`, JSON.stringify(data));
    return data;
}

export async function parseGlobal(service) {
    let emotes = [];
    switch(service) {
        case 'bttv':
            emotes = parseGlobalBTTV(await fetchJson(GLOBAL_BTTV));
            break;
        case 'ffz':
            emotes = parseFFZ(await fetchJson(GLOBAL_FFZ));
            break;
        case '7tv':
            emotes = parse7TV(await fetchJson(GLOBAL_7TV));
            break;
        case 'twitch':
            emotes = parseTwitch(await fetchJson(GLOBAL_TWITCH, {
                headers: {
                    'Authorization': `Bearer ${config.twitch.token}`,
                    'Client-Id': config.twitch.clientId
                }
            }));
            break;
        default:
            for(let name of services) {
                if(name !== 'all') {
                    const data = await parseGlobal(name);
                    emotes = emotes.concat(data.emotes);
                }
            }
    }
    const data = { '_cache': Date.now(), 'emotes': emotes };
    //TODO Don't save to service ALL, but just get them from other services.
    if(emotes.length > 1) client.hset('emotes-global', service, JSON.stringify(data));
    return data;
}