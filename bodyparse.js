const koaBody = require('koa-body');

function body() {
    let option = {
        // 多文件上传
        multipart: true,
        encoding: 'utf-8',
        formidable: {
            // 最大大小
            maxFieldSize: 10*1024*1024,
            // 保持文件后缀
            keepExtensions: true
        }
    }
    console.log('bodyparse loda ok');
    return koaBody(option)
}

module.exports = body;