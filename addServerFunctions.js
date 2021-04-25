const fs = require('fs');
//使用koa-router，导入的是个函数，需要运行
const router = require('koa-router')();

let js_files = null;
//读js文件名，返回数组，默认位置serverFunctions
function findJsFiles(path = './serverFunctions') {
    //判断得到的文件名是否是以.js结尾
    return fs.readdirSync(path).filter((f) => {
        return f.endsWith('.js');
    })
}

function addServerFunction(files, path = './serverFunctions') {
    let SevFs;
    //历便文件名数组，随后请求数组暴露的对象
    for(let dir of files){
        SevFs = require(path + '/' + dir);
        //历便得到的对象，根据属性名来调用get还是post
        for(let url in SevFs){
            if(url.startsWith('GET')){
                router.get(url.substring(4), SevFs[url]);
            }
            else if(url.startsWith('POST')){
                router.post(url.substring(5), SevFs[url]);
            }
            else{
                console.log('无效暴露' + url);
            }
        }
    }
}


js_files = findJsFiles();
addServerFunction(js_files);
//将router.routes()这个函数暴露出去。
module.exports = router.routes();