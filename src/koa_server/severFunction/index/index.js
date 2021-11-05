const fs = require('fs');

async function index(ctx) {
    try{
        let html = await new Promise((res,rej) => {
            let data = fs.readFileSync('../page/index/index.html','utf-8');
            res(data);
        })
        ctx.response.status = 200;
        ctx.response.type = 'text/html';
        ctx.response.body = html;
    } catch(err) {
        console.log('some err');
    }

}


module.exports = {
    'GET /index': index
}