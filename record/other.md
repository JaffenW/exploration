# 微信小程序
## 基础信息
1. API三大分类：事件监听API、同步API(名字以Sync结尾)、异步API
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
封装下方法，value中expire设置失效的时间戳，data设置存储的数据
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

## 双线程机制
渲染线程 + 逻辑线程

[小程序的双线程架构，为什么要设计成双线程的，双线程之间如何通信](https://blog.csdn.net/qq_17335549/article/details/136152251)

## 登录流程
1. 调wx.login获取用户登录凭证code
2. 后端拿用户登录凭证调微信的接口获取openId和UnionId，调接口除了需要传入code还要传openId和app密钥appsecret

## 面试题
[那些年我们在微信小程序遇到的坑](https://blog.csdn.net/qq_45406325/article/details/127259537)
# taro
## 1.H5 pdf预览

# uni-app
## 1.pdf预览
[PDF 预览和下载你是怎么实现的？](https://milu.blog/article/141)
## plus和HTML5+
HTML5+是对HTML5的扩展的标准，扩展了大量调用设备的能力，使得web语言可以像原生语言一样强大。uni-app就基于HTML5+的标准实现了HTML5+引擎，plus就是基于HTML5+引擎暴露出来可以调用原生能力的对象，使用这个对象里的方法就可以使用原生能力。需要注意的是小程序和H5等平台是没有HTML5+规范的，只能在app中使用

## uni-app如何适应不同的编译环境
uni-app已经将常用的组件、api等封装到框架里了，我们使用这些组件和api开发很大程度上就能保证多平台兼容。但确实是有一些平台特性是无法跨平台的，这时候就要用到条件编译了，uniapp提供了特殊的注解作为标记，编译时根据这些特殊的标记将代码编译到不同的平台
## 其他
[uniapp开发中遇到的plus.runtime.appid问题](https://blog.csdn.net/ybyshezhang/article/details/109697142)
[uniapp 应用APP跳转微信小程序](https://blog.csdn.net/fbqgdxw/article/details/121676030)

# 跳转
## [前端三板斧（html、css、javascript）](https://blog.csdn.net/qq_43565396/article/details/139072665)
## [Vue问题积累](https://blog.csdn.net/qq_43565396/article/details/139072743)
## [React问题积累](https://blog.csdn.net/qq_43565396/article/details/139072810)
## [工程化问题积累](https://blog.csdn.net/qq_43565396/article/details/139072905)
## [网络、设计模式、算法、后端问题积累](https://blog.csdn.net/qq_43565396/article/details/139072981)
## [技术方案与项目问题积累](https://blog.csdn.net/qq_43565396/article/details/139073029)
## [面试相关积累](https://blog.csdn.net/qq_43565396/article/details/130794769)