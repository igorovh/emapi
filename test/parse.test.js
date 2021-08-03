import { parse as parser7TV } from '../src/parsers/7tvparser';
import { parse as parserBTTV } from '../src/parsers/bttvparser';
import { parse as parserFFZ } from '../src/parsers/ffzparser';
import fetch from 'node-fetch';
import { expect } from '@jest/globals';

test('parsing 7tv', async () => {
    const json = await fetch('https://api.7tv.app/v2/users/87037696/emotes');
    expect(parser7TV(await json.json())[0]).toBeDefined();
})

test('parsing bttv', async () => {
    const json = await fetch('https://api.betterttv.net/3/cached/users/twitch/87037696');
    expect(parserBTTV(await json.json())[0]).toBeDefined();
})

test('parsing ffz', async () => {
    const json = await fetch('https://api.frankerfacez.com/v1/room/id/87037696');
    expect(parserFFZ(await json.json())[0]).toBeDefined();
})