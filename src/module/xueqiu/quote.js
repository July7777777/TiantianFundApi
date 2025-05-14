const { request } = require('../../utils/index.js');

/**
 * 获取日基本信息
 * https://stock.xueqiu.com/v5/stock/quote.json?symbol=SZ160125&extend=detail
 * symbol: 股票或指数代码 必须
 * extend: detail
 * 指定了想要返回的数据指标。包括：
 * detail: 日基本信息
 *
 */
module.exports = async (params = {}) => {
  const url = 'https://stock.xueqiu.com/v5/stock/quote.json';
  return request(url, params);
};
