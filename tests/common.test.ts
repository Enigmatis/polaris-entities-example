import * as request from 'supertest';
import { app } from '../src/app';

describe('common controllers', () => {
    test('health', async () => {
        const response = await request(app.callback()).get('/health');
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body).toEqual({ message: 'OK' });
    });

    test('version', async () => {
        const response = await request(app.callback()).get('/v');
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body).toHaveProperty('version');
        expect(response.body.version).toBeDefined();
        expect(response.body).toHaveProperty('date');
        expect(response.body.date).toBeDefined();
    });
});
