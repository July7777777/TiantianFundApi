const { request } = require('../../utils/index.js');

/**
 * 获取k线数据
 * https://stock.xueqiu.com/v5/stock/chart/kline.json?symbol=HKHSTECH&begin=1746610030048&period=day&type=before&count=-2&indicator=kline,pe,pb,ps,pcf,market_capital,agt,ggt,balance
 * symbol: 股票或指数代码 必须
 * begin: 开始时间 必须
 * period: 周期 day week month year 表示数据的周期性，
 * type: before after 这个参数可能指的是相对于begin时间戳的方向，before表示希望获取在给定时间戳之前的某些天数的数据。
 * count: 条数 结合type=before使用，表示从begin指定的时间点向前推284个周期（因为period=day，所以这里的周期是天）。负值表明是从指定时间往过去计算。
 * indicator: kline,pe,pb,ps,pcf,market_capital,agt,ggt,balance
 * 指定了想要返回的数据指标。包括：
  kline: K线数据，包含开盘价、收盘价、最高价、最低价等。
  pe: 市盈率(price to earnings ratio)。
  pb: 市净率(price to book ratio)。
  ps: 市销率(price to sales ratio)。
  pcf: 市现率(price to cash flow ratio)。
  market_capital: 市值。
  agt, ggt, balance: 这些缩写可能代表特定的财务指标或者数据类型，
 *
 */
module.exports = async (params = {}) => {
  const url = 'https://stock.xueqiu.com/v5/stock/chart/kline.json';
  return request(url, params);
};
