const Router = require('koa-router');
const fs = require('fs');

function getJS(path = './severFunction') {
    let jsFilePath = [];
    let filePath = fs.readdirSync(path);
    filePath.forEach((value) => {
        if(value.endsWith('.js')) {
            jsFilePath.push(`${path}/${value}`);
        }
        else {
            let newPath = `${path}/${value}`;
            jsFilePath.push(...getJS(newPath));
        }
    })
    return jsFilePath
}

function setRouter() {
    let jsfiles = getJS();
    jsfiles.forEach((value) => {
        let fns = require(value);
        for(let key in fns) {
            if(key.startsWith('GET')) {
                router.get(key.substring(4), fns[key]);
                console.log(`router set get ${key.substring(4)}`);
            }
            else if(key.startsWith('POST')) {
                router.post(key.substring(5), fns[key]);
                console.log(`router set post ${key.substring(5)}`);
            }
        }
    })
}

let router = new Router();
setRouter();
router.use(router.allowedMethods());

module.exports = router;