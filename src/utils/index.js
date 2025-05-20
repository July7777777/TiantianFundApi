const axios = require('axios');
const glob = require('glob');

const headers = {
  validmark: 'aKVEnBbJF9Nip2Wjf4de/fSvA8W3X3iB4L6vT0Y5cxvZbEfEm17udZKUD2qy37dLRY3bzzHLDv+up/Yn3OTo5Q==',
  // 雪球游客cookie
  cookie:
  'cookiesu=891746520886829; device_id=adba02bd1669aaa80786efca39b259a7; smidV2=2025050616413485743861c2b4e1b9d4ed912bf155be5300592f2baece504e0; acw_tc=1a0c640617477175525711948e006c4ece532abab15cbe4c9c7e786f3591bf; xq_a_token=75116a2a5439edb58d3d99533cfbc4d72e0ee819; xqat=75116a2a5439edb58d3d99533cfbc4d72e0ee819; xq_r_token=521f1781edc2a09cffdf7d59b5b3fe37c1c1f577; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOi0xLCJpc3MiOiJ1YyIsImV4cCI6MTc0OTk0OTc1MywiY3RtIjoxNzQ3NzE3NTI2MzMwLCJjaWQiOiJkOWQwbjRBWnVwIn0.AEsKUNmnr8wKe9RqbtNoBR9KnjlGgQYN9-paHHXFD5g0eUEzxlG8LUl8XA1yg4n9IAbf-67pTkK8W9UwVXy2YUS3FpbH_3ImeD0cSWMxno7PB-sgEOe9QRQnjz0cxAGt5kjon_31wxbiz8sDbepYKAhfmafcfAY7ei1ErQyWjYXvmON0khV-_rhT3N5-BGzNg5CNIaaMAmWOKEu6KmbA9_J19WsYi5p80qGSIzUcVnmDOOI8B883FfMAJyX-lGYCpiAjUjLhDPKPJR8YsdJK-yllffzqs_eavnR6ENsxvjfl7TxTGtFWB82YJuJauWB2ksAONpwWW5DI5-Qk5e5f0w; u=891746520886829; Hm_lvt_1db88642e346389874251b5a1eded6e3=1746520894,1746606097,1747717585; HMACCOUNT=F437B6175EC25A27; is_overseas=0; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1747717661; .thumbcache_f24b8bbe5a5934237bbc0eda20c1b6e7=FlhxAUIrqCg+Tqoj8AZrKzy1xJN4+9nklyDPWtyxOou9CYptHZQSBOwwCfhfecunw9K6T/paYUPPVOjqjr3mKw%3D%3D; ssxmod_itna=Qq+hGKY5AIPU2x0xeKoxjOzDwrDmPOxBP01DpxYK0CzDLxn4GQDUQWMobBCDEsgeM4hP++pqDsqPxiNDAZ40iDCbnLqrDDTUs7H7YrR7tbiYyGdHtSBbmmqFn/bQjoN/+0gPUOLI6Y+DCPDExGkq7We+Diibx0rD0eDPxDYDG+WD7PDoxDr8fYDjQOI1/gm=84DKx0kDYyKIQoD=xDFBhpp7xDz7cdFSCDvDmRmC37LIjxDn=DvKQoD9E4Ds60nB4DCWk=F+ROuKYlr=USfDCKDjPLIeU2QFbfv33Cr5CWQ5Y+F2mAzBrieb0x0RORyxYDFWGtBH+CDFmqiUi4uh/AAFDDWaWd8gD5bemMCfkbju1+YrygYnrpElNYnh72xYm+DL5L2xqBD3BNoDqlYKd0YMdx4D; ssxmod_itna2=Qq+hGKY5AIPU2x0xeKoxjOzDwrDmPOxBP01DpxYK0CzDLxn4GQDUQWMobBCDEsgeM4hP++o4DW+DDwAp=1RmohCMSgByGq3GRaED',
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
