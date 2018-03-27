require('babel-register');
const Koa = require('koa');
const app = new Koa();

// x-response-time

app.use(async (ctx, next) => {
    const start = Date.now();
    console.log('response-time-start:' + start)
    await next();
    const ms = Date.now() - start;
    console.log('response-time-after:' + Date.now())
    ctx.set('X-Response-Time', `${ms}ms`);
});

// logger

app.use(async (ctx, next) => {
    const start = Date.now();
    console.log('response-time-logger:' + start)
    await next();
    const ms = Date.now() - start;
    console.log('response-time-loggerafter:' + Date.now())
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// negotiator

app.use(async (ctx, next) => {
    console.log('nego result:' + ctx.accepts())
    await next();
})

// response

app.use(async ctx => {
    console.log('response' + Date.now())
    ctx.body = 'Hello World';
    console.log('response after' + Date.now())
});

app.listen(3000)
// 语法糖
//http.createServer(app.callback()).listen(3000);