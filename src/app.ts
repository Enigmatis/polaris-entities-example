import * as Koa from 'koa';
import * as bodyparser from 'koa-bodyparser';
import * as json from 'koa-json';

import respond = require('koa-respond');

import { initConnection } from '@enigmatis/mongo-driver';
import { POLARIS_TYPES, polarisContainer } from '@enigmatis/polaris';
import { GraphqlLogger } from '@enigmatis/utills';
import * as polarisServer from './graphql/polaris-server';
import { commonRouter } from './routes/unlogged-router';
import { baseLogger } from './utills/base-logger';
import { errorHandlerMiddleware, loggerMiddleware } from './utills/middlewares';

export const app = new Koa();

// middlewares
app.use(
    bodyparser({
        enableTypes: ['json', 'form', 'text'],
    }),
);
app.use(json());
app.use(respond());

app.use(errorHandlerMiddleware);
app.use(commonRouter.allowedMethods()).use(commonRouter.routes());

app.use(loggerMiddleware);

// error-handling
app.on('error', (err: Error) => {
    baseLogger.error('server error', { throwable: err });
});
const init = async () => {
    polarisServer.init();
    const logger = polarisContainer.get<GraphqlLogger>(POLARIS_TYPES.GraphQLLogger);
    await initConnection({
        waitUntilReconnectInMs: 5000,
        connectionString: process.env.MONGO_CONNECTION_STRING!,
    }, logger);
    await polarisServer.start(app);
};

init().then(() => {
    baseLogger.info('Polaris Server start done');
});
