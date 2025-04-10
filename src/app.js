const koa = require('koa');
const Router = require('@koa/router');
const { log } = require('./utils/log');
const { getModules } = require('./utils');

function startServe() {
  return new Promise((resolve) => {
    const app = new koa();

    const router = new Router();

    // 添加请求日志中间件
    app.use(async (ctx, next) => {
      // 记录请求开始时间
      const start = Date.now();
      // 打印请求方法和 URL
      log(`Request Method: ${ctx.method}, Request URL: ${ctx.url}`);
      // 打印请求头
      log('Request Headers:', ctx.headers);
      // 打印请求查询参数
      log('Request Query:', ctx.query);
      // 若为 POST、PUT 等包含请求体的方法，打印请求体
      if (ctx.request.body) {
        log('Request Body:', ctx.request.body);
      }
      // 继续处理后续中间件和路由
      await next();
      // 记录请求结束时间并计算耗时
      const ms = Date.now() - start;
      // 打印响应状态码和耗时
      log(`Response Status: ${ctx.status}, Response Time: ${ms}ms`);
    });

    getModules().forEach(({ fileName, path }) => {
      const routerPath = `/${fileName}`;
      const api = require(path);

      app[fileName] = api;

      log(`✅ 生成路由 ${routerPath}`);

      router.get(routerPath, async (ctx, next) => {
        log(`📥  ${ctx.request} ${ctx.request.url}`);
        ctx.status = 200;
        ctx.body = await api(ctx.request.query, ctx);
        next();
      });
    });

    app.use(router.routes()).use(router.allowedMethods());

    const server = app.listen(3000, () => {
      log('🚀 server is running at port 3000');
      resolve(server);
    });
  });
}

module.exports = {
  startServe,
};
