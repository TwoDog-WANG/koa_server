const nunjuncks = require('nunjucks');
//环境设置，将默认地址设为模板所在地址
nunjuncks.configure(__dirname + '/viewsTemplate');
//生成一个异步函数，让app来调用
const fn_useNunjucks = async (ctx, next) => {
    //给ctx.render设置一个函数，返回渲染后的html
    ctx.render = function(view, data) {
        ctx.response.type = 'text/html';
        ctx.response.body = nunjuncks.render(view, data);
    }
    await next();
}

module.exports = fn_useNunjucks;
