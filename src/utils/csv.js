const { log } = require('console');
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

/**
 * 将数据保存到 csv 文件
 * @param {Array} data - 要保存的数据数组，数组元素为对象
 * @param {string} filePath - 保存的 csv 文件路径
 */
async function saveDataToCsv(data, filePath) {
  return new Promise((resolve, reject) => {
    const fileExists = fs.existsSync(filePath);
    const ws = fs.createWriteStream(filePath, { flags: fileExists ? 'a' : 'w' });

    // 提取数据对象的键作为 CSV 头部信息
    const headers = data.length > 0 ? Object.keys(data[0]) : [];

    // 将数据对象转换为二维数组
    const csvData = data.map(row => headers.map(key => row[key]));

    csv
      .write(fileExists ? csvData : [headers, ...csvData], {
        headers: !fileExists
      })
      .pipe(ws)
      .on('finish', () => {
        resolve();
      })
      .on('error', (error) => {
        log('写入文件出错:', error);
        reject(error);
      });
  });
}

/**
 * 从 csv 文件读取数据
 * @param {string} filePath - 读取的 csv 文件路径 路径加文件名 例如：./localDate/share.csv
 * @returns {Array} - 包含文件数据的对象数组
 */
async function readDataFromCsv(filePath) {
  return new Promise((resolve, reject) => {
    const fileExists = fs.existsSync(filePath);
    if (!fileExists) {
      return resolve([]);
    }

    const data = [];
    fs.createReadStream(filePath)
      .pipe(csv.parse({ headers: true }))
      .on('data', (row) => {
        data.push(row);
      })
      .on('end', () => {
        resolve(data);
      })
      .on('error', (error) => {
        log('读取文件出错:', error);
        reject(error);
      });
  });
}

module.exports = {
  saveDataToCsv,
  readDataFromCsv
};