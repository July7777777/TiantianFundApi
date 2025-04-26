const { request,get } = require('../utils/index.js');

/**
 * 股票LOF 列表
 * https://www.jisilu.cn/data/lof/stock_lof_list/?___jsl=LST___t=1745568051745&only_owned=&rp=25
 * get请求 已测试
 * 参数
 * ___jsl: LST___t=1745567060341  时间戳 非必须
 * rp: 25 每页显示条数  默认25 非必须
 * only_owned: 是否只显示持有  默认false？0？ 非必须 日后得研究登陆了
 * 最好不要请求太快 官方会员 才30s一次   但是手动连续快速请求也没事qwq
 */
module.exports = async (params) => {
  const url = 'https://www.jisilu.cn/data/lof/stock_lof_list/';

  return await request(url, {
    ___jsl: `LST___t=${Date.now()}`,
    only_owned: '',
    rp: 25,
    ...params,
  });
};
