const koaBody = require('koa-body');

function body() {
    let option = {
        multipart: true,
        encoding: 'utf-8',
        formidable: {
            maxFieldSize: 10*1024*1024,
            uploadDir: './uploadDir',
            keepExtensions: true
        }
    }
    console.log('bodyparse loda ok');
    return koaBody(option)
}

module.exports = body;