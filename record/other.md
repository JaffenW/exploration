# 微信小程序
## 基础信息
1. API三大分类：事件监听API(以on开头)、同步API(名字以Sync结尾)、异步API(大部分都是异步的)
2. 小程序权限分为项目组权限(都有体验权限)和体验者权限，项目组权限又分为运营者、开发者、数据分析者
3. 全局配置(pages、subpackges、window、tabBar)，默认pages第一个路径为首页，tabBar的路径要放在pages里最前面，tabBar最少2个，最多5个，顶部tabBar不展示icon
4. 通过设置app.json中tabBar中属性custom为true可以自定义tabBar，但是为了低版本兼容和区分哪些是tabBar页面，原有list中定义的信息不能删除，还要在根目录创建一个custom-tab-bar组件
6. 小程序使用npm安装第三方包的限制
	- 不支持依赖node内置库的包
	- 不支持依赖浏览器内置对象的包
	- 不支持依赖C++插件的包
  
## 组件
1. 通过Component()函数创建，json文件中usingComponents属性引入，分为全局引入跟局部引入
2. 组件的**样式隔离**
	- app.wxss中的全局样式对组件无效
	- 只有class选择器会有样式隔离，id选择器、属性选择器、元素选择器对样式隔离无效
	- 可以通过组件json中的styleIsolation控制样式隔离选项
3. data全等于**properties**，都是可读可写的
4. 监听器用observers(类似于Vue的watch)，多个属性同时监听可以加逗号隔开`'a,b': function (a,b) {}`
5. 插槽slot用法跟Vue一样，不过使用多个插槽需要在组件options属性中设置`mutipleSlots：true`
6. 父子组件通信
	- 通过properties/triggerEvent('自定义事件名', {参数对象})
	- this.selectComponent('id选择器或者类选择器')获取组件实例
7. behaviors用于组件间代码共享(类似于Vue中的mixins)，通过Behavior()函数创建并导出，里面的属性跟Component()函数一样，组件中通过behaviors: []属性引入

## 组件和页面的区别
1. json文件需要设置"component": true
2. js中组件通过Component()函数创建、页面通过Page()函数创建
3. 组件的事件处理函数需要放到methods中，页面的事件处理函数只需要放在跟data、onload等同级就行了

## 分包（单个分包不超过2M，所有分包加起来不超过20M）
1. 在app.json中通过subpackage属性设置分包，subpackage中的每一项都是一个分包，会在根目录创建对应的一个分包目录，分包外的所有资源都会打包到主包中
2. 主包不能使用分包中的私有资源，但分包能使用主包中的公共资源
3. 独立分包能在不下载主包的情况下运行，subpackage设置的时候将independent设置为true就是独立分包，独立分包是不能引用主包内的公共资源的
4. 分包预下载，在进入某个页面时，由框架自动下载可能需要的分包。在跟subpackage平级的地方添加preloadRule设置分包预下载规则，里面是键值对，key为触发预下载的路径，在一个分包中预下载其他包大小的限额共2M，超过了会下载失败

## 分包预加载
在访问到小程序的某个页面时，预先去下载分包中的代码和资源，可以在app.json中preloadRule字段去设置预加载的规则，preloadRule是一个对象，key是触发预加载的页面路径，value则是一个具体的配置对象，对象有两个值packages（预加载分包的名字）、netword（指定网络情况下载，有all，wifi）
## 文件分类

## 全局配置（tabbar、pages、subpackges、window）和页面配置

## 生命周期
应用的生命周期有：
- onLaunch
- onShow
- onHide：切到后台5分钟后会被微信销毁

页面的声明周期有：
- onLoad
- onShow
- onReady
- onHide
- onUnload

组件的声明周期设置在pageLifetimes对象属性中，有
- created
- attached
- ready
- moved
- detached
- error
这里其实还有一个linked生命周期，存在父子关系时会触发
当采用hidden控制组件隐藏时，组件的生命周期会正常执行（会正常渲染dom，获取尺寸返回为0），使用wx:if控制隐藏时，组件生命周期不会触发
## 顶部导航栏设置
[自定义顶部、底部导航栏以及获取胶囊体位置信息](https://blog.csdn.net/qq_42785250/article/details/128950332)
## 获取经纬度问题
## 数据埋点
[前端埋点实现方案](https://blog.csdn.net/hsany330/article/details/125070076)
[小程序无痕全埋点SDK方案](https://zhuanlan.zhihu.com/p/423235244)
## 路由跳转的方式有哪些
navigateTo、redirectTo、navigateBack、switchTab、reLaunch

## 封装拦截器
![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/273b4726f1884a4d8b06c339e8720c20.png)
[微信小程序封装request请求，包含请求拦截器，响应拦截器和请求重试功能](https://blog.csdn.net/m0_53215500/article/details/130735475)

## setStorage加上有效期
1. 封装公共方法setStorage和getStorage，存了对应key值的内容后判断有没有传过期时间（多少秒后过期），有的话将过期时间转化为具体过期时间戳，key+'_deadtime'作为key存入，获取缓存的时候根据这个key获取过期时间，如果有并且过期了返回空或者返回默认值，封装的setStorage中如果没有传入过期时间还会去删除对应key+'_deadtime'的值
2. 存入value中包含deadtime和data两个属性，deadtime是经过处理后的失效时间戳，data设置存储的数据，获取缓存的方法中判断deadtime是否存在并且是否过期，过期返回空或者默认值，不存在则直接返回data
[小程序中给localStorage加上有效期](https://juejin.cn/post/6992518324210892830)

## 使用web-view要做什么
1. 要配置业务域名（将验证文件放到对方域名的根目录下）
[微信小程序使用webview注意事项：](https://blog.csdn.net/wbb1126/article/details/131935541)

## 微信H5跟微信小程序H5有什么不一样
1. 打开方式不一样，微信H5是点击链接或者扫码进行打开，小程序H5则是在小程序里面同一个页面去渲染H5的页面
2. 微信H5是在浏览器打开，可以通过浏览器地址栏前进后退等操作进行跳转，可以使用浏览器的提供的各种功能和API，小程序H5是在小程序的一个沙箱环境中，只能通过小程序进行导航和跳转，一些敏感的API会限制，如不能调用摄像头、文件读写等
3. 微信H5可以直接打开，而小程序中则要配置对应的域名白名单才能打开

## 微信小程序跟uni-app的区别
1. 微信小程序开发采用的是微信自己的语言，uni-app是用的vue框架
2. 微信小程序只能在微信环境运行，uni-app是可以一套代码生成多个平台的应用程序，包括小程序、H5、APP，在编译的时候能转换成不同平台需要的代码

## wxml和标准的hmtl有什么异同
1. 都是用来描述页面结构的，都是由标签、属性组成
2. wxml会有类似于vue的一些指令，如果wx:if、wx:for
3. 标签名字不一样，小程序的标签会更少一些
4. 宿主环境也不一样，小程序的宿主是微信，html的宿主是浏览器
5. 小程序中无法使用window、document对象

## wxss和css有什么不一样
1. wxss有css大部分的特性，但也做了一些扩充
2. wxss多了rpx的属性

## 双线程机制
渲染线程 + 逻辑线程
[小程序的双线程架构，为什么要设计成双线程的，双线程之间如何通信](https://blog.csdn.net/qq_17335549/article/details/136152251)

## 登录流程
1. 调wx.login获取用户登录凭证code
2. 后端拿用户登录凭证调微信的接口获取openId和UnionId，调接口除了需要传入code还要传openId和app密钥appsecret

## 怎么进行性能优化
1. 分包：将首页以外的页面资源分包出去，加快进入小程序的速度
2. 分包预加载：将其他页面分包出去之后我们选取一些常用的功能页面配置预加载，在进入首页的时候去加载这些包（在app.json添加预加载规则preloadRule,其中key为路径，value中的package为需要预加载的分包root或者name的数组，network为指定网络下载）
3. 有些不依赖于主包的资源我们可以设置为独立分包
4. 微信也提供了数据预拉取的方式去获取数据(参保地市功能的开通情况)
5. 微信小程序提供了周期性更新数据的方式（12小时更新一次）
6. 跳转页面时注意清除定时器，在小程序中我们打开多个页面，一个页面会对应一个webview（渲染层），但他们却共享同一个js运行环境，也就是当我们跳转到另一个页面时，定时器并不会被销毁
7. setData涉及到逻辑层和渲染层的通信，所以我们要注意不要太频繁的setData（每秒不超过20次），setData的数据量不要太大（JSON转化后不超过256kb），与渲染无关的变量不要放在data中，而是直接挂在页面的this上
8. 短时间请求太多的图片会触发小程序并发请求的限制，应当使用雪碧图技术并且加上缓存
[微信小程序优化指南](https://zhuanlan.zhihu.com/p/135983160)

## 面试题
[那些年我们在微信小程序遇到的坑](https://blog.csdn.net/qq_45406325/article/details/127259537)
# taro
## 1.H5 pdf预览

# uni-app
## uni-app的优点
1. 跨平台：一套代码可以同时开发多个平台的应用，提高了开发效率
2. 性能表现好：uni-app采用原生的渲染技术，在不同平台运行时能获得接近原生应用的性能表现，用户体验会更好
3. 开发效率高：uni-app是基于Vue框架的，开发者可以用Vue的语法和组件来开发应用，减少了我们的学习成本
[浅谈uniapp优缺点](https://blog.csdn.net/Miller777_/article/details/137013399)

## uni-app的不足
1. 虽然uni-app能获得接近原生应用的性能，但实际来说还是原生的性能会更好，特别是处理一些复杂的图形和动画时，可能会出现性能瓶颈
2. 由于特定的平台可能无法实现某些功能，所以有时需要针对不同的平台做特定的调整和优化
3. 插件生态相对较少
4. 虽然是Vue的，但是uni-app本身也是有一些特有的api和组件，也是需要额外的学习成本

## 1.pdf预览
[PDF 预览和下载你是怎么实现的？](https://milu.blog/article/141)
## plus和HTML5+
HTML5+是对HTML5的扩展的标准，扩展了大量调用设备的能力，使得web语言可以像原生语言一样强大。uni-app就基于HTML5+的标准实现了HTML5+引擎，plus就是基于HTML5+引擎暴露出来可以调用原生能力的对象，使用这个对象里的方法就可以使用原生能力。需要注意的是小程序和H5等平台是没有HTML5+规范的，只能在app中使用

## uni-app如何适应不同的编译环境
uni-app已经将常用的组件、api等封装到框架里了，我们使用这些组件和api开发很大程度上就能保证多平台兼容。但确实是有一些平台特性是无法跨平台的，这时候就要用到条件编译了，uniapp提供了特殊的注解作为标记，编译时根据这些特殊的标记将代码编译到不同的平台
## 其他
[uniapp开发中遇到的plus.runtime.appid问题](https://blog.csdn.net/ybyshezhang/article/details/109697142)
[uniapp 应用APP跳转微信小程序](https://blog.csdn.net/fbqgdxw/article/details/121676030)

# electron
## 是什么
electron是一个基于web技术去开发桌面应用的框架，应用嵌入了谷歌浏览器内核和node，可以实现跨平台，缺点是包体积比较大

## electron的两个主要模块
1. app：管理应用程序的事件生命周期
2. BrowserWindow：负责创建和管理应用窗口

## 两个进程
1. 主进程：管理整个应用的生命周期和其他的页面BroswerWindow。主进程是一个拥有着完全操作系统访问权限的 Node.js 环境，可以访问 Node.js 内置模块 和所有通过 npm 安装的包
2. 渲染进程：展示图像内容，不能访问node环境的接口

## 进程通信（预加载脚本）
1. 预加载脚本运行于渲染线程但会在加载网页之前注入，预加载脚本与浏览器共享同一个全局Window，但不能直接改动window，因为他是默认上下文隔离的（contextIsolation），取而代之的使用contextBridge进行交互，使用contextBridge.exposeInMainWorld方法将属性设置到渲染器的window中，预加载脚本中除了能访问到页面dom外、还能访问到node和Electron API的有限子集访问权限，v20版本后只有node的部分权限。要使用预加载脚本，需要在实例化BrowserWindow的时候传入`webPreferences: { preload: path.join(__dirname, 'preload.js')}`参数。
2. electron提供了ipcMain和ipcRenderer两个对象，通过它们可以实现主进程和渲染进程之间的通信
- 渲染进程到主进程的单向通信：`ipcRender.send('eventName', data)`和`ipcMain.on('eventName', (event, data) => {})`
- 渲染进程到主进程的双向通信：`ipcRender.invoke('eventName', data)`和`ipcMain.handle('eventName', (event, data) => {})`,invoke是一个异步的方法，可以接受来自handle的返回值
- 主线程到渲染进程的单向通信：发送时需要指定渲染器接受，所以需要借助BrowserWindow示例来进行发送`mainWindow.webContents.send('eventName', data)`,预加载脚本中使用`ipcMain.on('eventName', (event, data) => {})`接收
- 渲染进程到渲染进程之间通信：没有直接的方法可以直接渲染进程到渲染进程通信，只能通过主线程进行中转
```js
// preload.js
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
  // 除函数之外，我们也可以暴露变量
})
```

## 为啥官方推荐使用whenReady
1. 避免触发后才注册的这种边界情况
2. ready之后这个事件就没啥用了，避免对这个触发后就没有必要监听的事件留用

## macOs特殊处理
1. Window和Linux关闭所有页面后退出，需要监听'window-all-closed'事件，然后调用app.quit()退出
2. macOS中即使没有打开任何窗口，应用也会继续运行。我们要ready后去监听activate事件，事件触发后重新创建窗口

## Vue + Electron
1. 正常vue项目添加electron-builder`vue add electron-builder`,过程中下载electron等依赖会比较慢，推荐使用cnpm，相比之前vue项目，src下会多一个background.js的文件，可以进行一些应用的配置，如窗口大小、是否进行缩放等
2. 打包过程中可以会出现部分依赖长时间downloading导致失败的情况，这时候需要将对应downloading的文件下载下来放到/users/admistrator/appdata/local/electron/cache目录下
[Electron + Vue 搭建前端桌面应用](https://segmentfault.com/a/1190000040326098?decode__1660=n40xgDRDcDy73xiqGNDQTiQQ0QcBVuERYTD)

# 跳转
## [前端三板斧（html、css、javascript）](https://blog.csdn.net/qq_43565396/article/details/139072665)
## [Vue问题积累](https://blog.csdn.net/qq_43565396/article/details/139072743)
## [React问题积累](https://blog.csdn.net/qq_43565396/article/details/139072810)
## [工程化问题积累](https://blog.csdn.net/qq_43565396/article/details/139072905)
## [网络、设计模式、算法、后端问题积累](https://blog.csdn.net/qq_43565396/article/details/139072981)
## [技术方案与项目问题积累](https://blog.csdn.net/qq_43565396/article/details/139073029)
## [面试相关积累](https://blog.csdn.net/qq_43565396/article/details/130794769)