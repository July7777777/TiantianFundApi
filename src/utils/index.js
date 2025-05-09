const axios = require('axios');
const glob = require('glob');

const headers = {
  validmark: 'aKVEnBbJF9Nip2Wjf4de/fSvA8W3X3iB4L6vT0Y5cxvZbEfEm17udZKUD2qy37dLRY3bzzHLDv+up/Yn3OTo5Q==',
  // 雪球游客cookie
  // cookie:
  // 'cookiesu=891746520886829; device_id=adba02bd1669aaa80786efca39b259a7; xq_a_token=a9afe36f1d53c5f7180395537db631d013033091; xqat=a9afe36f1d53c5f7180395537db631d013033091; xq_r_token=8381269ec9b02e5fc66996c2868a95087d02ea0e; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOi0xLCJpc3MiOiJ1YyIsImV4cCI6MTc0ODY1Mzc0OSwiY3RtIjoxNzQ2NjA2MDUyMTc3LCJjaWQiOiJkOWQwbjRBWnVwIn0.MbA1gmSdwBLvItTaaFb4dC6yBSTxEBgixj3cnFclqKL5PzwmS6gyRPRIJAKd3KwN1GTNQCjxZnlT-Q-cUf5qudMiEvZBuz-oXsAbccuK3yE4uu10JeadmlXSEQCza2DJ0jaZ0pWb9nPEs31ZYegXoGg7mBFy97D4pcIemKCCbvw-xIOJjtX1irG3iAiO1O-JFC87Kf-j6s68hhTBH_6lSLeQtMTYSWsqma_io8rJb18Kh2L2H7pvFMJ_1g1BFNqHRtrT-0KZXhqsN7nDQZB7kQmpFZOUKipJy9pVhrDYnJdtVsp-EoyiU-hAFwo3KeNme97Zr8j5gsu5n6f6pPClmA; u=891746520886829; Hm_lvt_1db88642e346389874251b5a1eded6e3=1746520894,1746606097; HMACCOUNT=F437B6175EC25A27; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1746694539; ssxmod_itna=Qq+hGKY5AIPU2x0xeKoxjOzDwrDmPOxBP01DpxYK0CzDLxn4GQDUQQ5MobBCC1xDq0eYKfu2P1DBw04rDnqD8XDQeDveZSimsSUBBy4qoFKurrIqUmQRpqdHedbb5e+plyZyqmuUoxrDCPDExGkqewYrY4DxaPD5xDTDWeDGDD3axGaDmeDe6g+D04p8SoAWSAoD7eDXxGCk74pDneD7r0DVCgNDGyNV/ut5noDEiOv4SfokDD1qnExW4G1fD0HdW6UDDvc7VuA1/jxevmwjR3DvxDkRUohkQupp/g+edbQUhXYCPvYdjWx+i4t0Nbuxe2xY0NW0t+w+/RP3TQDRxgRDn2/exDG4htDhywdoeoId1jwbUqzob5UOYd2pCoQVBdRWhSYKHW7/GxdB5rGv=OxoDq50x2DtOQKoiDD; ssxmod_itna2=Qq+hGKY5AIPU2x0xeKoxjOzDwrDmPOxBP01DpxYK0CzDLxn4GQDUQQ5MobBCC1xDq0eYKfu2PrDGbHjeVbYSbmdDFOiQfe8/eDsd/rcxxLdB8h8j2PQsYkMxqQ5h84L5BFHIcBef/fSDpEPaXBGaVY5heQG1C2AQQ45HXjD8AogsF3owG=0PCaP75WFpXlFCGEyDt0PFXQFNGb7a+gAs50A4C=ydcog7XIpPtb7kSbifafMw7=01DLFC/=Ixj95aXZQGW6DxIrP7deu4oGH7MOK7DzH1K3OQK9masKqwwkpyYs/IGwzvCwYccYZnjBAvgCxFEvPhUGPoqtK0ewsei4PEMeQ3gN4aiUDItZP1CGqewqAq00GfewgGDb/j2mbn0RUANm=GSjA9ChPZoqmpsCujBjjmKrlw/lwYljYGY4WIsnDN9vzIKulWCOKNOI7YvRc5NtPujAlZEsQtgnuRSjYYcro+xlqreq10mx7mzCxKlpYlpP7nVtygbDxD',
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
