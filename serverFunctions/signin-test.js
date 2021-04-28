const fs = require('fs');


const fn_index = async (ctx, next) => {
    //console.log(ctx.request);
    let data = fs.readFileSync('../web/11.html', 'utf-8');
    ctx.response.statue = 200;
    ctx.response.type = 'text/html';
    ctx.response.body = data;
}

const fn_signin = async (ctx, next) => {
    //app使用koa-bodyparser后可以通过body来解析post传过来的数据。
    let name = ctx.request.body.name || '';
    let password = ctx.request.body.password || '';
    console.log(ctx.request.body)
    if (name === 'TDW' && password === '11223344') {
        ctx.response.statue = 200;
        ctx.response.type = 'text/html';
        ctx.response.body = `<p>Welcome my host</p>`;
    }
    else {
        ctx.response.statue = 200;
        ctx.response.type = 'text/html';
        ctx.response.body = 
            `<p>Try again</p><br/>
            <a href='/index'>this</a>`;
    }
}

module.exports = {
    'GET /11': fn_index,
    'POST /signin': fn_signin
}