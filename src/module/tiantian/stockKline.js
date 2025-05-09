const { request } = require('@utils/index.js');

/**
 * 获取股票k线走势图
 */

// https://push2his.eastmoney.com/api/qt/stock/kline/get?fields1=f1,f2,f3,f4,f5,f6,f7,f8&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61,f62,f63,f64,f65&ut=fa5fd1943c7b386f172d6893dbfba10b&secid=124.HSCGSI&dect=1&klt=101&lmt=70&fqt=1&forcect=1&end=20500000&wbp2u=1849325530509956|0|1|0|web&cb=__jp1


module.exports = async (params = {}) => {
  const url = 'https://push2his.eastmoney.com/api/qt/stock/kline/get';
  return await request(url, {
    secid: `${params.type}.${params.code}`,
    klt: params.klt,// 101 日k线, 102 周k线, 103 月k线, 1分钟 1, 5分钟 5, 15分钟 15 ,30分钟 30, 60分钟 60
    lmt: params.lmt,//每页数量
    fqt: params.fqt,//页数
    end: params.end,//结束时间 例：20230410
    iscca: 1,
    fields1: 'f1,f2,f3,f4,f5,f6,f7,f8',
    fields2: 'f51,f52,f53,f54,f55,f56,f57',// 时间,开盘,最高,最低,收盘,成交量,成交额
    // fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61,f62,f63,f64,f65
    ...params,
  });
};