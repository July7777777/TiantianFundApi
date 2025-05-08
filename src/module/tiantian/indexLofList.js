const { request } = require('@utils/index.js');

/**
 * 指数LOF 列表
 * https://www.jisilu.cn/data/lof/index_lof_list/?___jsl=LST___t=1745567060341&rp=25&page=1
 * get请求 已测试
 * 参数
 * ___jsl: LST___t=1745567060341  时间戳 非必须
 * rp: 25 每页显示条数  默认25 非必须
 * page: 1 页码 默认1 非必须
 * 最好不要请求太快 官方会员 才30s一次   但是手动连续快速请求也没事qwq
 */
module.exports = async (params) => {
  const url = 'https://www.jisilu.cn/data/lof/index_lof_list/';
  return request(url, {
    ___jsl: `LST___t=${Date.now()}`,
    rp: 25,
    page: 1,
    ...params,
  });
};
