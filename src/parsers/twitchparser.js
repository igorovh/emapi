import { Emote } from '../emote';

export function parse(json) {
    const emotes = [];
    if(json && json.status !== 404) {
        json.data.forEach(emoteJson => {
            const urls = {
                '1x': emoteJson.images['url_1x'],
                '2x': emoteJson.images['url_2x'],
                '4x': emoteJson.images['url_4x'],
            }
            emotes.push(new Emote(emoteJson.name, urls));
        });
    }
    return emotes;
}