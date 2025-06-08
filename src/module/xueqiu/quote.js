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
module.exports = async (params = {}, ctx = {}, cookie = '') => {
  // console.log('quote',params)
  // console.log('quote',cookie)
  const url = 'https://stock.xueqiu.com/v5/stock/quote.json';
  try {
    const response = await request(url, params, cookie);
    return response;
  } catch (error) {
    console.log('error',error)
    if (error.status === 400) {
      return {
        success: false,
        status: 401,
        message: error.response.data.error_code + ':' + error.response.data.error_description,
      };
    } else {
      return {
        success: false,
        status: 500,
        message: error.data.error_code + ':' + error.data.error_description,
      };
    }
  }
};
