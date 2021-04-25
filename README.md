# 这是一个基于koa2的小型服务器
## 服务器分为三个部分  

1. app.js  

   引入koa、addServerFunctions暴露出来的router，开启监听。

1. addServerFunctions.js

   扫描serverFunctions文件夹，得到里面的js文件，随后将js文件暴露出来的异步函数添加到router中，最后暴露router.routes()，提供给app.js使用。

2. serverFunctions文件夹

   内部有多个js文件，生成处理url、逻辑判断、返回响应的异步函数，并且以对象的形式将多个函数暴露，供addServerFunctions.js使用。

**重要：**

在 serverFunctions 文件夹中，有一个 import_batchServers.js 的文件，这个文件用于处理网页的 js、css、img 请求。