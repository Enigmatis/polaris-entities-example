import { Context } from 'koa';
import { baseLogger } from './base-logger';

export const errorHandlerMiddleware = async (ctx: Context, next: () => void) => {
    try {
        await next();
    } catch (err) {
        baseLogger.error(
            `uncaught error in middleware, method: '${ctx.method}', url: '${ctx.url}',\n
             params: '${JSON.stringify(ctx.params)}', body: '${JSON.stringify(
                ctx.request && ctx.request.body,
            )}', query: '${JSON.stringify(ctx.request && ctx.request.query)}'`,
            { throwable: err },
        );
        ctx.status = 500;
        ctx.body =
            process.env.NODE_ENV === 'develop'
                ? err.message
                : 'Internal server error, please connect support';
    }
};

export const loggerMiddleware = async (ctx: Context, next: () => void) => {
    const start = new Date().getTime();
    baseLogger.info(`---> got ${ctx.method}' request to '${ctx.url}'`);
    await next();
    const ms = new Date().getTime() - start;
    baseLogger.info(`<---  '${ctx.method}' request to '${ctx.url}' took '${ms}ms'`);
};
