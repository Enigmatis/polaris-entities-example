import { mockServer } from 'apollo-server-koa';
import { getSchema } from '../src/graphql/schema';

describe('schema', () => {
    test('schema compiles', async () => {
        const server = mockServer(await getSchema(), {});
        expect(() => server.query('{ __schema { types { name } } }')).not.toThrow();
    });
});
