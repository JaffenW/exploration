const fs = require('fs')

const baseUlr = './public/resource/'

/**
 * 读取文件
 * @param {String} fileName 
 * @returns 
 */
exports.readFile = function (fileName) {
  fileName = baseUlr + fileName
  return new Promise((resolve, reject) => {
    try {
      // 需要加utf-8，要不然获取的是一个字节流
      fs.readFile(fileName, 'utf-8', (err, data) => {
        if (!err) {
          console.log('data=', data)
          resolve(data && JSON.parse(data))
        } else {
          console.log('err1', err)
          reject(err)
        }
      })
    } catch (e) {
      console.log('err2', e)
      reject(e)
    }
  })
}


/**
 * 存入文件
 * @param {String} fileName 
 * @param {Object} data
 * @returns 
 */
exports.writeFile = function (fileName, data) {
  fileName = baseUlr + fileName
  return new Promise((resolve, reject) => {
    try {
      fs.writeFile(fileName, JSON.stringify(data), (err) => {
        if (!err) {
          console.log('存入成功')
          resolve()
        } else {
          console.log('err3', err)
          reject(err)
        }
      })
    } catch (e) {
      console.log('err4', e)
      reject(e)
    }
  })
}