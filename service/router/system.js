const express = require('express')
const router = express.Router()
const filesManage = require('../common/filesManage')
const { insertByOrder } = require('../common/array')

router.use(function timeLog(req, res, next) {
  next()
})

/**
 * 查询系统列表
 */
router.get('/getSystemList', (req,res) => {
  filesManage.readFile('system.json').then(data => {
    console.log('get', data)
    res.json({
      code: 0,
      data: data
    })
  }).catch(err => {
    console.log('err', err)
    res.json({
      code: -1,
      message: err
    })
  })
})

/**
 * 添加或者修改系统
 */
router.post('/addSystem', (req,res) => {
  filesManage.readFile('system.json').then(data => {
    let list = data || []
    const system = {
      ...req.body
    }
    // 如果传了code，则是修改
    if (req.body.code) {
      list = list.filter(i => i.code != req.body.code)
    } else {
      system.code = new Date().getTime()
    }
    list = insertByOrder(list, system)
    filesManage.writeFile('system.json', list).then(data => {
      res.json({
        code: 0,
        message: '提交成功'
      }) 
    }).catch(err => {
      console.log('存入文件失败', err)
      res.json({
        code: -1,
        message: '提交失败'
      }) 
    })
  })
})

/**
 * 删除系统
 */
router.post('/deleteSystem', (req,res) => {
  filesManage.readFile('system.json').then(data => {
    let list = data || []
    list = list.filter(i => i.code != req.body.code)
    filesManage.writeFile('system.json', list).then(data => {
      res.json({
        code: 0,
        message: '删除成功'
      }) 
    }).catch(err => {
      console.log('存入文件失败', err)
      res.json({
        code: -1,
        message: '提交失败:' + err
      }) 
    })
  })
})

/**
 * 查询菜单列表
 */
router.get('/getMenuList', (req,res) => {
  filesManage.readFile('menu.json').then(data => {
    console.log(data, req.query)
    if (req.query.sCode) {
      console.log('--')
      data = data.filter(i => i.sCode === Number(req.query.sCode))
    }
    if (req.query.name) {
      data = data.filter(i => i.name === req.query.name)
    } 
    res.json({
      code: 0,
      data: data
    })
  }).catch(err => {
    console.log('err', err)
    res.json({
      code: -1,
      message: err
    })
  })
})

/**
 * 添加菜单
 */
router.post('/addMenu', (req,res) => {
  filesManage.readFile('menu.json').then(data => {
    let list = data || []
    const menu = {
      ...req.body
    }
    // 如果传了code，则是修改
    if (req.body.code) {
      list = list.filter(i => i.code != req.body.code)
    } else {
      menu.code = new Date().getTime()
    }
    list = insertByOrder(list, menu)
    filesManage.writeFile('menu.json', list).then(data => {
      res.json({
        code: 0,
        message: '提交成功'
      }) 
    }).catch(err => {
      console.log('存入文件失败', err)
      res.json({
        code: -1,
        message: '提交失败'
      }) 
    })
  })
})

/**
 * 查询模板列表
 */
router.get('/getMouldList', (req,res) => {
  filesManage.readFile('mould.json').then(data => {
    console.log(data, req.query)
    if (req.query.name) {
      data = data.filter(i => i.name === req.query.name)
    } 
    res.json({
      code: 0,
      data: data
    })
  }).catch(err => {
    console.log('err', err)
    res.json({
      code: -1,
      message: err
    })
  })
})

/**
 * 添加模板
 */
router.post('/addMould', (req,res) => {
  filesManage.readFile('mould.json').then(data => {
    let list = data || []
    const mould = {
      ...req.body
    }
    // 如果传了code，则是修改
    if (req.body.code) {
      list = list.filter(i => i.code != req.body.code)
    } else {
      mould.code = new Date().getTime()
    }
    list = insertByOrder(list, mould)
    filesManage.writeFile('mould.json', list).then(data => {
      res.json({
        code: 0,
        message: '提交成功'
      }) 
    }).catch(err => {
      console.log('存入文件失败', err)
      res.json({
        code: -1,
        message: '提交失败'
      }) 
    })
  })
})

/**
 * 删除模板
 */
router.post('/deleteMould', (req,res) => {
  filesManage.readFile('mould.json').then(data => {
    let list = data || []
    list = list.filter(i => i.code != req.body.code)
    filesManage.writeFile('mould.json', list).then(data => {
      res.json({
        code: 0,
        message: '删除成功'
      }) 
    }).catch(err => {
      console.log('存入文件失败', err)
      res.json({
        code: -1,
        message: '提交失败:' + err
      }) 
    })
  })
})

/**
 * 添加资源
 */
router.post('/addResource', (req, res) => {
  if (!req.body.fileName) {
    res.json({
      message: '存入资源文件名不能为空',
      code: -1
    })
    return
  }
  try {
    filesManage.readFile(req.body.fileName).then(data => {
      let list = data || []
      const resource = {
        ...req.body
      }
      // 如果传了code，则是修改
      if (req.body.code) {
        list = list.filter(i => i.code != req.body.code)
      } else {
        resource.code = new Date().getTime()
      }
      list = insertByOrder(list, resource)
      filesManage.writeFile(req.body.fileName, list).then(data => {
        res.json({
          code: 0,
          message: '提交成功'
        }) 
      }).catch(err => {
        console.log('存入文件失败', err)
        res.json({
          code: -1,
          message: '提交失败'
        }) 
      })
    })
  } catch(e) {
    console.log('==err', err);
  }
})

/**
 * 查询资源
 */
router.get('/getResourceList', (req,res) => {
  if (!req.query.fileName) {
    res.json({
      message: '读取资源文件名不能为空',
      code: -1
    })
    return
  }
  filesManage.readFile(req.query.fileName).then(data => {
    console.log(data, req.query)
    res.json({
      code: 0,
      data: data
    })
  }).catch(err => {
    console.log('err', err)
    res.json({
      code: -1,
      message: err
    })
  })
})

/**
 * 删除资源
 */
router.post('/deleteResource', (req,res) => {
  if (!req.body.fileName) {
    res.json({
      message: '删除资源文件名不能为空',
      code: -1
    })
    return
  }
  filesManage.readFile(req.body.fileName).then(data => {
    let list = data || []
    list = list.filter(i => i.code != req.body.code)
    filesManage.writeFile(req.body.fileName, list).then(data => {
      res.json({
        code: 0,
        message: '删除成功'
      }) 
    }).catch(err => {
      console.log('存入文件失败', err)
      res.json({
        code: -1,
        message: '提交失败:' + err
      }) 
    })
  })
})

module.exports = router;