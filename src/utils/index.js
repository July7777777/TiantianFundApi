const axios = require('axios');
const glob = require('glob');

const headers = {
  validmark: 'aKVEnBbJF9Nip2Wjf4de/fSvA8W3X3iB4L6vT0Y5cxvZbEfEm17udZKUD2qy37dLRY3bzzHLDv+up/Yn3OTo5Q==',
  // 雪球游客cookie
  cookie:'xq_a_token=75116a2a5439edb58d3d99533cfbc4d72e0ee819;',
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
    },
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
  // 修改 glob 匹配模式，匹配 module 目录下所有子目录中的 .js 文件
  const files = glob.sync('./src/module/**/*.js');
  return files.map(path => {
    // 使用正则表达式提取文件名
    // const fileName = path.match(/([^\/\\]+)\.js$/)[1];
    const fileName = path.replaceAll('\\', '/').replace('src/module/', '').replace('.js', '');

    return {
      fileName,
      path: path.replaceAll('\\', '/').replace('src', './'),
    };
  });
};
// const files = glob.sync('./src/module/*/*.js');
// const getModules = () => {
//   const files = glob.sync('./src/module/*.js');
//   console.log(111);
//   console.log(files);
//   console.log(files);
//   return files.map(path => {
//     const fileName = path.replaceAll('\\', '/').replace('src/module/', '').replace('.js', '');
//     return {
//       fileName,
//       path: path.replace('src', './'),
//     };
//   });
// };

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

// const get = async (url, params) => {
//   const res = await axios.get(url, {
//     headers,
//     params, // 如果有查询参数，则通过 params 传入
//   });
//   return res.data;
// };

module.exports = {
  request,
  post,
  jsonp,
  getModules,
  sse,
  // get,
};
