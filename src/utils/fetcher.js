import fetch from 'node-fetch';

export async function fetchJson(url, options) {
    if(!options) options = {};
    const data = await fetch(url, options);
    const json = await data.json();
    json.status = data.status;
    return json;
}