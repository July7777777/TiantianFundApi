const { request } = require('@utils/index.js');

/**
 * 获取股票k线走势图
 */

// https://push2his.eastmoney.com/api/qt/stock/kline/get?fields1=f1,f2,f3,f4,f5,f6,f7,f8&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61,f62,f63,f64,f65&ut=fa5fd1943c7b386f172d6893dbfba10b&secid=124.HSCGSI&dect=1&klt=101&lmt=70&fqt=1&forcect=1&end=20500000&wbp2u=1849325530509956|0|1|0|web&cb=__jp1

module.exports = async (params = {}) => {
  const url = 'https://push2his.eastmoney.com/api/qt/stock/kline/get';
  return await request(url, {
    secid: `${params.type}.${params.code}`,
    klt: params.klt,
    lmt: params.lmt,
    fqt: params.fqt,
    end: params.end,
    iscca: 1,
    fields1: 'f1,f2,f3,f4,f5',
    fields2: 'f51,f52,f53,f54,f55,f56,f57',
    ...params,
  });
};
