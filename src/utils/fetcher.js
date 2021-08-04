import fetch from 'node-fetch';

export async function fetchJson(url) {
    const data = await fetch(url);
    const json = await data.json();
    json.status = data.status;
    return json;
}