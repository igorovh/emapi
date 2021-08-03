import { describe, expect } from '@jest/globals';
import request from 'supertest';
import { app } from '../src/app';

//Not working idk why xD
describe('Test for global path', () => {
    test('Status code should be 200', done => {
        request(app)
            .get('/')
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
});

describe('Test for global emotes path', () => {
    test('Cache should exist', done => {
        request(app)
            .get('/v1/global/all')
            .then(response => {
                expect(JSON.parse(response.text)['_cache']).toBeDefined();
                done();
            });
    });
});

describe('Test for channel emotes path', () => {
    test('Cache should exist', done => {
        request(app)
            .get('/v1/channel/1535/all')
            .then(response => {
                expect(JSON.parse(response.text)['_cache']).toBeDefined();
                done();
            });
    });
});