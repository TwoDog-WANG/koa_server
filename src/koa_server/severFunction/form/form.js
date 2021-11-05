async function form(ctx) {
    await new Promise((res) => {
        setTimeout(() => {
            res();
        }, 5000);
    })
    console.log('be');
    ctx.response.body = 'nihao'
}

module.exports = {
    'POST /form': form
}