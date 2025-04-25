const axios = require('axios');
const glob = require('glob');

const headers = {
  validmark:
    'aKVEnBbJF9Nip2Wjf4de/fSvA8W3X3iB4L6vT0Y5cxvZbEfEm17udZKUD2qy37dLRY3bzzHLDv+up/Yn3OTo5Q==',
};

const deviceId = '874C427C-7C24-4980-A835-66FD40B67605';
const version = '6.5.5';
const baseData = {
  product: 'EFund',
  deviceid: deviceId,
  MobileKey: deviceId,
  plat: 'Iphone',
  PhoneType: 'IOS15.1.0',
  OSVersion: '15.5',
  version,
  ServerVersion: version,
  Version: version,
  appVersion: version,
};
// 发送请求
const request = async (url, params) => {
  const res = await axios(url, {
    headers,
    params: {
      ...baseData,
      ...params,
    },
  });
  return res.data;
};

const post = async (url, data) => {
  const res = await axios.post(
    url,
    new URLSearchParams({
      ...baseData,
      ...data,
    }),
    {
      headers,
    }
  );
  return res.data;
};

// 发送 jsonp 请求
const jsonp = async (url, callback, params) => {
  const res = await axios(url, { params });
  const js = res.data.replace(/[\n]/g, '').replace(/\r/g, '');
  return JSON.parse(js.slice(callback.length + 1, js.length - 1));
};

const getModules = () => {
  const files = glob.sync('./src/module/*.js');
  return files.map((path) => {
    const fileName = path.replaceAll('\\', '/').replace('src/module/', '').replace('.js', '');
    return {
      fileName,
      path: path.replace('src', './'),
    };
  });
};

const sse = async (url, params) => {
  const res = await axios(url, {
    headers,
    params: {
      ...baseData,
      ...params,
    },
    responseType: 'stream',
  });
  return res.data;
};

const fetch =  (url, params) => {
  const res =  axios.get(url, {
    headers: {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
      "priority": "u=1, i",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
      "cookie": "kbzw__Session=hcf45k1grm605ogiqanq6qeg12; Path=/;",
      "Referer": "https://www.jisilu.cn/data/lof/",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    params // 如果有查询参数，则通过 params 传入
  });
  return res.data;
}

module.exports = {
  request,
  post,
  jsonp,
  getModules,
  sse,
  fetch
};
