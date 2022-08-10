const fs_promise = require('fs/promises');

async function recordPageData(ctx) {
    const body = ctx.request.body;
    // 表单的其他字段是放在body中，文件是放在files里
    const files = ctx.request.files;
    const basicPath = '../../userData/id_001/recordLifeData';
    const time = [new Date(parseInt(body.createTime)).getFullYear(), new Date(parseInt(body.createTime)).getMonth() + 1];
    let yearData = null;
    try {
        // 抓取year文件夹，米有就创建
        let yearDir = await fs_promise.stat(`${basicPath}/${time[0]}`);
        if(yearDir.isDirectory) {
            yearData = await fs_promise.readFile(`${basicPath}/${time[0]}/${time[0]}_yearData.json`,'utf-8');
            yearData = JSON.parse(yearData);
            yearData.allPageNum++;
            try {
                let monthDir = await fs_promise.stat(`${basicPath}/${time[0]}/${time[1]}`);
                if(monthDir.isDirectory) {
                    yearData[time[1]].pageNum++;
                    yearData[time[1]].pageArr.push(body.createTime);
                    await fs_promise.mkdir(`${basicPath}/${time[0]}/${time[1]}/${body.createTime}`);
                }
            } catch (err) {
                console.log(err);
                yearData[time[1]] = {
                    pageNum: 1,
                    pageArr: [body.createTime]
                }
                await fs_promise.mkdir(`${basicPath}/${time[0]}/${time[1]}`);
                await fs_promise.mkdir(`${basicPath}/${time[0]}/${time[1]}/${body.createTime}`);
            }
        }
    } catch (err) {
        console.log(err);
        yearData = {
            allPageNum: 1,
        };
        yearData[time[1]] = {
            pageNum: 1,
            pageArr: [body.createTime]
        }
        await fs_promise.mkdir(`${basicPath}/${time[0]}`);
        await fs_promise.mkdir(`${basicPath}/${time[0]}/${time[1]}`);
        await fs_promise.mkdir(`${basicPath}/${time[0]}/${time[1]}/${body.createTime}`);
    }
    await fs_promise.writeFile(`${basicPath}/${time[0]}/${time[0]}_yearData.json`, JSON.stringify(yearData, null, '\t'));
    for (const key in body) {
        if(key !== 'createTime') {
            try {
                await fs_promise.writeFile(`${basicPath}/${time[0]}/${time[1]}/${body.createTime}/${key}.json`, body[key]);
                // 不是文字类型
                if(key.search(/^(text_)/) === -1) {
                    let idStr = key.split('_')[1];
                    // 获取文件
                    let file = await fs_promise.readFile(files['file_' + idStr].path);
                    let index = files['file_' + idStr].path.search(/(\.(\w)+)$/);
                    let extension = files['file_' + idStr].path.slice(index);
                    // 应该用fs.copy()复制，用fs.unlink()删除原文件
                    await fs_promise.writeFile(`${basicPath}/${time[0]}/${time[1]}/${body.createTime}/${idStr}${extension}`, file);
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    ctx.response.status = 200;
    ctx.response.type = 'text/plain';
    ctx.response.body = 'ok';
}

module.exports = {
    'POST /recordlife/torecordpagedata': recordPageData,
}