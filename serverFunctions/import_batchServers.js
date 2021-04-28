const fs = require('fs');

const fn_js = async (ctx, next) => {
    //console.log(ctx.request);
    //读取父文件夹下的web/js/...
    let js_data = fs.readFileSync('../web' + ctx.request.path);
    //转态码200
    ctx.response.statue = 200;
    //js文件类型
    ctx.response.type = 'application/x-javascript';
    //响应主体内容
    ctx.response.body = js_data;
}

const fn_css = async (ctx, next) => {
    //console.log(ctx.request);
    let css_data = fs.readFileSync('../web' + ctx.request.path);
    ctx.response.statue = 200;
    ctx.response.type = 'text/css';
    ctx.response.body = css_data;
}

const fn_img = async (ctx, next) => {
    //console.log(ctx.request);
    let img_data = fs.readFileSync('../web' + ctx.request.path);
    ctx.response.statue = 200;
    //这里应该加一个判断需求图片后缀来更改响应类型。。。
    ctx.response.type = 'image/png';
    ctx.response.body = img_data;
}

const fn_json = async(ctx, next) => {
    let json_data = fs.readFileSync('../web' + ctx.request.path);
    ctx.response.statue = 200;
    ctx.response.type = 'application/json';
    ctx.response.body = json_data;
}

const fn_txt = async (ctx, next) => {
    let txt_data = fs.readFileSync('../web' + ctx.request.path, 'utf-8');
    ctx.response.statue = 200;
    ctx.response.type = 'text/plain';
    ctx.response.body = txt_data;
}
//以对象的形式暴露函数
module.exports = {
    //通过/:path 来给router传值，这样请求只要以 /:path 前 的内容为路劲（如/js），就可以调用需要的函数。
    "GET /js/:path": fn_js,
    "GET /css/:path": fn_css,
    "GET /imgs/:path": fn_img,
    "GET /txt/:path": fn_txt,
    "GET /json/:path": fn_json
}