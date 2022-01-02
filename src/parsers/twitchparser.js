import { Emote } from '../emote';

export function parse(json) {
    const emotes = [];
    if(json && json.status !== 404 && json.data && json.data.length > 0) {
        json.data.forEach(emoteJson => {
            const urls = {
                '1x': emoteJson.images['url_1x'].replace('/static/', '/default/'),
                '2x': emoteJson.images['url_2x'].replace('/static/', '/default/'),
                '4x': emoteJson.images['url_4x'].replace('/static/', '/default/'),
            }
            console.log(urls);
            emotes.push(new Emote(emoteJson.name, urls));
        });
    }
    return emotes;
}