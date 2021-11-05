const Koa = require('koa');
const static = require('koa-static');

const body = require('./bodyparse.js');
const router = require('./router.js');

const app = new Koa();

app.use(static('../static'));
app.use(body());
app.use(router.routes());

app.listen(3000, () => {
    console.log('start listen port of 3000');
})