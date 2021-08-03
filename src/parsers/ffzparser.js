import { Emote } from '../emote';

export function parse(json) {
    const emotes = [];
    if(json && json.status !== 404) {
        const sets = json.sets;
        Object.keys(sets).forEach(set => {
            sets[set].emoticons.forEach(emoteJson => {
                const urls = {
                    '1x': emoteJson.urls['1'],
                    '2x': emoteJson.urls['2'],
                    '4x': emoteJson.urls['4']
                }
                emotes.push(new Emote(emoteJson.name, urls));
            });
        })
    }
    return emotes;
}