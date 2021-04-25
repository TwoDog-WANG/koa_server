//生成koa实例
const Koa = require('koa');
const app = new Koa();

const bodyParser = require('koa-bodyparser');
const add = require('./addServerFunctions');
//使用koa-bodyparser中间件
app.use(bodyParser());
//使用koa-router中间件
app.use(add);
//监听3000端口
app.listen(3000);