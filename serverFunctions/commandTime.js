const fs = require('fs');

//主页面放回
const fn_commandTimeMain = async (ctx, next) => {
    //console.log(ctx.request);
    //读取，utf-8格式，否则会以buffer形式放回，转态码200，响应格式html
    let data = fs.readFileSync('../web/Command-TIME/main.html', 'utf-8');
    ctx.response.statue = 200;
    ctx.response.type = 'text/html';
    ctx.response.body = data;
}
//获得表单格式，渲染表单
const fn_getForm = async (ctx, next) => {
    let data = ctx.request.body;
    let timeData = JSON.parse(fs.readFileSync('../web/json/time.json','utf-8'));
    if(ctx.request.body.who === 'thing') {
        //获取json数据内当前区块的数据量，然后在渲染的时候加到表单中
        var index = timeData.thing.length;
    }
    data.index = index;
    ctx.response.statue = 200;
    //渲染表单，ctx.render是在app.js中手动添加的函数。
    ctx.render('form.njk', data);
}

const fn_addTime = async (ctx, next) => {
    //取得数据，去掉表单数据内的who，将时间与日之间的T改为-，将数据加入到但前区域，重新写入数据
    let timeData = JSON.parse(fs.readFileSync('../web/json/time.json','utf-8'));
    if(ctx.request.body.who === 'thing'){
        delete ctx.request.body.who;
        ctx.request.body.时间 = ctx.request.body.时间.replace('T', '-');
        let data = timeData.thing;
        data.push(ctx.request.body);
        fs.writeFileSync('../web/json/time.json', JSON.stringify(timeData,null,4));
    }
    ctx.response.statue = 200;
    ctx.response.type = 'application/json';
    //将修改后的数据放回
    ctx.response.body = ctx.request.body;
}
//删除数据
const fn_deleteTime = async (ctx, next) => {
    let index = ctx.request.body.id;
    let timeData = JSON.parse(fs.readFileSync('../web/json/time.json','utf-8'));
    if(ctx.request.body.who === 'thing'){
        let data = timeData.thing;
        data.splice(index,1);
        //将后续数据的id值减1
        for(index; index < data.length; index++){
            data[index].id = index + "";
        }
    }
    fs.writeFileSync('../web/json/time.json', JSON.stringify(timeData,null,4));
    ctx.response.body = "ok";
}

//暴露函数
module.exports = {
    "GET /": fn_commandTimeMain,
    "POST /getForm": fn_getForm,
    "POST /sendForm": fn_addTime,
    "POST /deleteTime": fn_deleteTime
}

