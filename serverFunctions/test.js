const fs = require('fs');

const fn_test = async (ctx, next) => {
    let data = fs.readFileSync('../JS/test.html', 'utf-8');
    ctx.response.statue = 200;
    ctx.response.type = 'text/html';
    ctx.response.body = data;
    console.log(__dirname);
}

module.exports = {
    "GET /test": fn_test
}

