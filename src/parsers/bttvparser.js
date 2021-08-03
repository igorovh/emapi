import { Emote } from '../emote';

const CDN = 'https://cdn.betterttv.net/emote/{id}/{size}'

export function parse(json) {
    const emotes = [];
    if(json && json.message !== 'user not found') {
        json.channelEmotes.forEach(emoteJson => {
            emotes.push(parseEmote(emoteJson));
        });
        json.sharedEmotes.forEach(emoteJson => {
            emotes.push(parseEmote(emoteJson));
        });
    }
    return emotes;
}

export function parseGlobal(json) {
    const emotes = [];
    json.forEach(emote => {
        emotes.push(parseEmote(emote));
    });
    return emotes;
}

function parseEmote(emoteJson) {
    const urls = {
        '1x': CDN.replace('{id}', emoteJson.id).replace('{size}', '1x'),
        '2x': CDN.replace('{id}', emoteJson.id).replace('{size}', '2x'),
        '4x': CDN.replace('{id}', emoteJson.id).replace('{size}', '4x')
    }
    return new Emote(emoteJson.code, urls);
}