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
      const start = Date.now();

      await next();
      const ms = Date.now() - start;
      // 打印响应状态码和耗时
      log(`${ctx.method} ${ctx.status} ${ctx.url} ${ms}ms`);
    });

    getModules().forEach(({ fileName, path }) => {
      const routerPath = `/${fileName}`;
      const api = require(path);

      app[fileName] = api;

      log(`✅ 生成路由 ${routerPath}`);

      router.get(routerPath, async (ctx, next) => {
        // log(`📥  ${ctx.request} ${ctx.request.url}`);
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
