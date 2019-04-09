import * as Koa from 'koa';
import * as bodyparser from 'koa-bodyparser';
import * as json from 'koa-json';

import respond = require('koa-respond');

import * as server from './graphql/server';
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
app.on('error', (err: Error, ctx: Koa.Context) => {
    baseLogger.error('server error', { throwable: err });
});

server.init(app);
