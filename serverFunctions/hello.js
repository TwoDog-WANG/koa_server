//定义一个异步函数
const fn_hello = async (ctx, next) => {

    ctx.response.statue = 200;
    ctx.response.type = 'text/html';
    ctx.response.body = `<p>hello, my love</p>`;
};
//暴露该函数
module.exports = {
    'GET /': fn_hello
};