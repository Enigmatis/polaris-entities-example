declare module 'koa-respond' {
    function koaRespondMiddleware(): (ctx: any, next: () => void) => void;

    export = koaRespondMiddleware;
}
