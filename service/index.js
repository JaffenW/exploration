const express = require('express')
const bodyParser = require('body-parser')
const config = require('./common/config')
const system = require('./router/system')

console.log('cofig=', config);

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/system', system)

app.get('/', (req,res) => {
  res.send('hello world')
})

app.get('/user', (req,res) => {
  res.send('hello world user')
})

app.use(express.static('public'))

app.listen(config.port, () => {
  console.log('启动成功了')
})