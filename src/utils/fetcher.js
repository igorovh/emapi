import fetch from 'node-fetch';

export async function fetchJson(url) {
    const data = await fetch(url);
    return await data.json();
}