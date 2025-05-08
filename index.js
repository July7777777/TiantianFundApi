const { startServe } = require('./src/app.js');
const moduleAlias = require('module-alias');

// 配置别名
moduleAlias.addAliases({
  '@utils': __dirname + '/src/utils'
});

if (process.env.NODE_ENV !== 'test') {
  startServe();
}

module.exports = startServe;
