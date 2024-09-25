## 什么是前端工程化
我们的项目开发就是一个工程，从最开始的需求、到后面的开发、测试，以及后面的上线部署维护，都是遵循一定的流程的，工程化就是把这一套流程确定下来，采用一系列的手段、思路来提高我们的开发效率，保证我们的产品质量。这其中就会涉及到模块化、组件化、标准化、自动化

[前端工程化指的是什么？](https://www.51cto.com/article/741101.html?u_atoken=66eb6c6b06398c863f53503078811490&u_asession=01ZZwKdpYrlBiUsq2NtN0cuoyb8sAMkiSBYC2Qfoa2GSXgQivTzjzAgmWcfQRjSGdvdlmHJsN3PcAI060GRB4YZGyPlBJUEqctiaTooWaXr7I&u_asig=05vF4wabVJwBU0xI2oZn8lpzvLZqr9cAwkV-mQIH7F1sojhjyJV_yi77QrB2FQxb9TqeSIwlLPa38rueElcHwFanOLQ38XSEQNLljsNpcvN7hgPKSWo0aZWgAuI3Fa9gXwh_tPL2gWGIJckq_KNEhLsz2mWHPvfcRIFZwxzutjf7tg2QMxYs6lyXb1lFWKql56aPpW2tfj05_rQXrdKF9Bhne2eqGTKiiJETKLbeXP6pIugfNZ94d4tQpoI07lxH1gohAEtpeSmQ2fmIRWkgMhiCtb1QLsFS1QfJ9RAg0rn1usTpJ-4hEVCCqo-GZeD3WUZHi7af-9T9DT_5BT1SiXZw&u_aref=Ye%2Be0PqCJ29skYFP94e7SS%2BFKxg%3D)
[前端工程化](https://blog.csdn.net/dyk11111/article/details/133999059)

# 项目中的一些文件
## package.json配置
[package.json的配置项及其用法](https://www.cnblogs.com/onesea/p/15227637.html)
[package.json文件scripts脚本解读](https://www.cnblogs.com/chaoyueqi/p/11232844.html)

## package.json中~和^的区别
npm包的版本号的格式是`大版本.次版本.小版本`，~会更新小版本，^会更新次版本

## 可执行脚本中process.argv参数对象
process.argv是一个数组：
1. process.argv[0]——返回启动Node.js进程的可执行文件所在的绝对路径
2. process.argv[1]——为当前执行的JavaScript文件路径
3. 剩余的元素为其他命令行参数
例如在react-script.js文件中去打印process.argv的结果如下
![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/6af98b593ffa4a05992e1ab00f59b2c1.png)
## process.cwd()与__dirname的区别
1. process.cwd()：执行node命令时文件夹地址
2. __dirname：执行的js文件所在的目录
3. 当node src/index.js时，process.cwd()为根目录，__dirname为/src
[process.cwd()与__dirname](https://blog.csdn.net/weixin_44864084/article/details/120868472)

## 一些常见文件的作用
1. [.nvmrc](https://blog.csdn.net/zhouweihua138/article/details/129762721)：用来确定项目中要使用的node版本
2. [.npmrc](https://zhuanlan.zhihu.com/p/651477901)：npm的配置文件，用来配置npm在执行命令时的行为和参数，如指定一些包的下载镜像源
3. [tailwind.config.js](https://blog.csdn.net/xinyebudaoshi/article/details/135061079)：使用tailwindcss时的配置文件，tailwindcss是用来创建原子化类名的工具
# webpack相关
## webpack的工作流程
1. 初始化参数，从配置文件和shell语句中读取并合并参数，得出最终的配置对象
2. 根据配置对象初始化compiler对象（会用Tabable创建一个个hook实例存到this.hooks）
3. 加载所有配置的插件，也就是调其中apply方法（apply方法会传入compiler对象，方法中主要是通过compiler.hooks.具体hook.tap()去注册事件）
4. 执行编译对象的run方法开始进行编译（会创建一个compilation对象并执行其build方法）
5. 编译首先会找到配置中entry对应的文件作为入口（build方法会判断如果entry是字符串会转为对象，变为entry.main）
6. 从入口开始，会调用配置好的loader对模块进行编译
7. 再找出模块中依赖的模块，一直用loader进行编译，一直递归这种操作知道所有依赖的模块都经过了编译
8. 根据入口和模块的依赖关系，组装成一个个包含多个模块的chunk
9. 这些chunk转为一个单独的文件加入到输出列表
10. 在确定好输出内容后，会根据配置中输出目录和命名规则，将这些chunk输出到文件系统中

[webpack 编译流程](https://blog.csdn.net/weixin_52834435/article/details/126996897)
[Webpack 设计理念](https://mp.weixin.qq.com/s/H7sVfyjF3f-7p2eJmxSuQw)
[浅析webpack](https://www.cnblogs.com/goloving/p/16152555.html)
[webpack及babel配置](https://blog.csdn.net/qq_39111074/article/details/121371923)
## webpack中loader和plugin的区别
1. 区别
	- loader是一个加载器，或者说是一个转换器，用来将其他文件格式的文件转换为webpack支持打包的文件格式，loader会在import或者加载的时候进行处理，是运行在打包之前。loader本质上是一个函数，参数为文件源内容，函数中的this会被改为webpack
	- plugin是对webpack功能的扩展，主要是为了实现loader无法实现的功能，例如打包优化、资源管理、变量注入等，运行在整个编译的生命周期中。plugin是一个函数或者是包含了apply方法的对象，compiler对象会作为方法参数被传入，异步事件需要在插件处理完后调用callback函数，不然会被卡住
2. loader配置方式
	- 配置方式：在webpack.config.js文件中指定loader
	- 内联方式：在import语句中显式指定loader
	- CLI方式：在shell命令中指定loader
3. 常见loader
	- babel-loader：用于将es6的语法编译为浏览器支持的低版本语法，常用的预设由@babel/preset-env（ES2015+ 语法）、@babel/preset-typescript（TypeScript）、@babel/preset-react（react）
	- ts-loader：用于将ts语法转换为js
	- file-loader：用于处理文件资源，如jpg、png等，返回值以publicPath为准
	- url-loader：跟file-loader类似，也是用来处理图片的，不过url-loader可以根据文件大小进行不同的操作，比如小如指定大小，图片转换为base64
	- style-loader：通过注入\<style>标签将css插入到dom中
	- css-loader：处理css中的各种加载语法，如import()、url()等
	- postcss-loader：会编译转换尚未被浏览器支持的先进css语法
	- less-loader：解析less，转换为css
4. plugin的配置方式：在配置文件中的plugins传入plugin的实例就行了
5. 常用的plugin：
	- html-webpack-plugin：用于生成html文件，以及将打包后的chunk插入到html中
	- clean-webpack-plugin：用于清除output.path中的所有文件
	- webpack.HotModuleReplacementPlugin：文件热加载，有两种使用方式，1. plugins中引入webpack.HotModuleReplacementPlugin实例，devServer.hot设置为true，2.package.json启动命令中加入- -hot
	- mini-css-extract-plugin：将css提取到单独的文件中，会把js文件中的css单独提出来创建一个css文件
	- webpack-bundle-analyzer：bundle文件分析工具，可以看项目各个模块的大小，可以按需加载
[webpack里面的plugin和loader的区别](https://www.cnblogs.com/zhilili/p/14721434.html)

## webpack打包规则
- 一个入口文件对应一个bundle
- 按需加载的模块或需要单独加载的模块分块打包成其他bundle

## webpack常见的生命周期有哪些
[webpack 的生命周期/钩子/hooks有哪些，plugin 能用的生命周期](https://blog.csdn.net/qq_17335549/article/details/137561075)

## webpack5的模块联邦
webpack5中新增的跨应用共享模块的功能。需要安装ModuleFederationPlugin插件，在需要共享的应用设置暴露的资源，需要使用共享资源的应用也使用ModuleFederationPlugin配置引入规则。采用模块联邦的应用除了走正常的打包流程外还需要走模块联邦插件的打包流程，将需要导出的资源打包为单独的文件
[微前端解决方案初探 03 模块联邦](https://blog.csdn.net/u012961419/article/details/122946159)
[微前端知识点汇总](https://blog.csdn.net/qq_39207948/article/details/129100561)
## webpack优化
1. 配置多入口
2. 进行SplitChunks（设置cacheGroup），设置拆包规则，哪些模块拆成一个包，公共依赖引用多少次、体积多大分一个包
3. 动态导入，设置懒加载、prefetch（预获取，浏览器空闲的时候去获取）、preload（预加载，告诉浏览器预先请求当前页面所需要的资源，通常是渲染所需要的关键资源，如字体、样式表、脚本等，这可能会影响初始页面的加载性能）
4. runtime相关的代码抽取到一个单独的chunk包（runtime是指在运行环境中，对模块进行解析、加载相关的代码，例如import函数代码
5. 将css提取到单独的文件

[webpack优化](https://blog.csdn.net/lb6514052/article/details/124145599)
[webpack的性能优化（一）——分包优化](https://blog.csdn.net/ICanWin_lll/article/details/135429948)
## webpack跟vite的区别
1. 构建速度：webpack需要打包所有的模块后再启动服务，当模块非常多的时候启动会非常慢，vite不用打包，采取的是即时编译，会直接启动服务，利用现代浏览器原生支持es module的特性，在用到某个文件的时候才去请求编译，这种按需编译的方式在开发模式速度会更快
2. 热更新：webpack会以改动的文件为入口重新build一遍，所有涉及的依赖都会重新加载一遍，vite当某个模块内容修改后，让浏览器重新请求改模块即可
3. vite是用esbuild（用go语言写的，vite本身是用js写的）预构建依赖的，而webpack是基于node，vite会比webpack快10-100倍
4. 配置：webpack相对来说配置比较复杂，需要配置一堆的loader和plugin，vite主张0配置，在大多数情况下不需要我们进行配置
5. 生态：webpack出现的时间久 ，生态会比较丰富，而vite是近几年才流行起来，并且vite内置了很多配置，所以生态相对来说没这么丰富
## 通过webpack解决浏览器兼容问题
postcss + babel
[通过webpack解决浏览器兼容问题](https://blog.csdn.net/weixin_36774307/article/details/128487530)
## webpack热更新原理
[webpack-dev-server、webpack-dev-middleware 和 webpack-hot-middleware 对比](https://baijiahao.baidu.com/s?id=1782502832523078925&wfr=spider&for=pc)
[webpack-dev-middleware 和 webpack-hot-middleware 配置](https://www.cnblogs.com/ly0612/p/7464462.html)
## babel和polyfill的区别
1. Babel主要用于将新版本的JavaScript代码转换为旧版本兼容的代码，而Polyfill则用于为旧浏览器提供缺失的API功能。
2. babel转换js语法靠的是各种插件，单个插件的功能是单一的，一个插件负责转换一个语法，所以为了避免依次写出所有插件很麻烦，就把插件包装成为了一个预设preset，简言之，预设是插件的集合
3. 我们在源码里可能看到过这个`/*#__PURE__*/`，这个是用来标记，如果没有用到这个东西，可以放心删了

[polyfill和babel的关系](https://blog.csdn.net/qq_17335549/article/details/128107490)
[babel预设](https://blog.csdn.net/qq_17335549/article/details/126978888)
[vue源码中的`/*#__PURE__*/`是什么意思](https://blog.csdn.net/yehuozhili/article/details/118081252)

# 模块化
## cmj和esm的区别
1. cmj是运行时加载，也就是动态加载，esm是编译时加载，即静态加载
2. cmj只能加载整个模块，而esm可以加载模块的部分内容，也就是支持tree-shaking
3. cmj是值拷贝，esm是引用拷贝，不能去修改引用的值

补充：esm export是能进行tree shaking的，export default不能进行tree shaking
[ESM和CJS区别](https://www.jianshu.com/p/35a7bbf27781)
[import函数](https://juejin.cn/post/6844903614616436750)
[彻底掌握 Commonjs 和 Es Module](https://www.cnblogs.com/p1967914901/p/15435862.html)
## npm包发布
1. 发布流程
	- npm官网注册账号
	- 本地开发我们的工具包，需要有一个index.js文件
	- package.json设置好我们的包名
	- npm addUser添加用户信息和npm login进行登录
	- npm publish进行发布
	- 可以通过npm uppublish删除包，注意24小时候就不能进行删除了，只能废弃
	- 要更新包的话改下package.json的版本号然后重新npm publish就可以了
2. 本地调试自己的包
	- 如果包和项目在同一个目录可以直接npm link ../xxx进行链接
	- 如果不在同一个目录需要进入包的根目录执行npm link将包链接到全局
	- 然后再在项目中使用npm link xxx链接包
	- 链接包后会在node_moudules中创建一个xxx包的超链接，链接到包的实际位置

[如何发布自己的npm包](https://blog.csdn.net/chaoPerson/article/details/135689521)
[Npm link的作用与使用](https://blog.csdn.net/weixin_42274805/article/details/123474053)

## npm install  @types/xxx的作用
下载第三方库的声明文件，有时候当我们npm install完一个包，却发现 import 的时候 ts 报错，说找不到这个包。其原因是这个包内不含类型声明，所以 ts 并不能识别这个模块。这个时候我们可以去通过 npm install @types/包名 来下载这个包的声明文件，从而解决 ts 的报错。
## npm和npx的区别
npm是包管理功能，但是用npm来执行node包命令和可执行文件比较麻烦，需要执行可执行文件的目录或在package.json配置。npx是npm v5.2.0引入的，是npm包的包执行器，简化了执行npm包命令的步骤，并且可以执行未安装的包命令，执行的时候先临时下载，然后执行完删掉
```js
// npm第一种
npm ./node_modules/.bin/your-package

// npm第二种需要先在package.json配置
{
  "name": "your-application",
  "version": "1.0.0",
  "scripts": {
    "your-package": "your-package"
  }
}
// 然后再执行
npm run your-package

// npx执行
npx your-package
```
[npm和npx的区别](https://blog.csdn.net/qq_45947664/article/details/127856736)
[npm 和 npx的区别](https://blog.csdn.net/weixin_45719444/article/details/127662714)
## npm、yarn、pnpm的区别
1. npm是node包管理和分发的工具，能用它发布、安装和卸载node包
2. yarn是facebook在npm v3推出一款新的开源包管理工具，它弥补了npm当时安装速度慢、包版本不一致的问题，yarn有以下特点
	- 下载速度快，npm是按照队列依次下载，而yarn是同时执行所有任务，并行下载，yarn还采用了缓存，如果之前下载过的包会直接从缓存中去获取
	- 版本统一，yarn通过了yarn.lock记录了每个包的版本，避免版本的不一致，不过后面npm也有了package-lock.json
3. pnpm是2017年问世的，是高性能的npm，解决了npm、yarn重复文件过多、复用率低的问题。
	- npm和yarn安装依赖时会把的package所有的依赖原封不动的下载到node_module，当多个项目使用到了相同的依赖(比如说100个项目用到loash)，每个项目的node_module都会复制一份依赖包。但使用pnpm的话只会下载一次，磁盘中只有一个地方写入，后续再次使用会采用hardlink(硬链接)。高效利用了磁盘空间
	- npm1、npm2依赖是采取嵌套形式的，会存在嵌套层级深，大量重复的包被安装，文件体积大的问题。从npm3开始，包括yarn都是采用扁平化依赖来处理这些问题的，将所有的依赖都拍平在node_module目录中，这也是为什么我们能在node_module中看到很多我们自己没有声明的依赖，当在目录中找到相同版本的依赖就不会去重复下载，解决了体积大的问题。但这种扁平化的方式并不是无懈可击的，如依赖结构具有不确定性，扁平化算法复杂度有点高，会有一定的耗时，还有最主要的就是项目中可以非法使用我们未声明的依赖，这会造成一些安全问题，比如我们引入依赖A，但是A又依赖了B，到时候A和B都会出现在node_module中，我们可以直接使用B，但万一后面A进行了升级，在最小的A中使用的是高版本的B或者是直接移除了B，那么我们直接使用依赖B中内容时就有可能会出错，npm也有想过解决这个问题，就是通过设置- -glocal-style可以禁止变量提升，但这又回到了当时依赖嵌套的时代
	- pnpm采用是硬链接加软链接的方式组织依赖。项目的node_modules只存放声明过的依赖和.pnpm文件，在node_modules中看到的依赖其实都是一个个软链接，这些链接指向的是`.pnpm/依赖包名/node_modules/xxx`，而这些里面又都是硬链接，而不是真正依赖信息，我们真正的依赖是存在`PNPM_HOME`，通过这种
[npm、 yarn 和 pnpm 的区别](https://blog.csdn.net/shaogaiyue9745602/article/details/130365245)
[JavaScript 包管理器](https://cloud.tencent.com/developer/article/2288369)

## 什么是幽灵依赖，怎么解决
- 项目中引用了 A 包， B包依赖B包，项目中直接用了B包，但是如果A包依赖的B包，版本升级了，就会有问题。
- 使用pnpm预防

## 软连接和硬链接
存储设备或者存储设备上分区格式化为文件系统后是分为inode和Block。Block用来存储数据，inode存储这些数据的信息，也就是文件大小、属主、所归属的用户组、读取权限等；软链接是一个单独的文件，它记录的是文件的路径，它可以跨文件系统使用，而硬链接并不是一个文件，而是源文件的另一个名称，硬链接跟源文件共享同一个inode信息。
![软连接和硬链接](https://img-blog.csdnimg.cn/direct/1f4ce5877b814aa8b6936595e0b64092.png)
[软链接与硬链接的区别](https://blog.csdn.net/m0_60861848/article/details/125844816)
[inode是什么](https://blog.csdn.net/wangdeng1314/article/details/4254132)
# git管理
## git常用命令
![git常用命令](https://img-blog.csdnimg.cn/direct/f1a2590bdeea4d20b4e104745caeb230.png)
## 合并代码出现冲突要注意什么
我们正常来说有冲突的话先自己看能不能解决，解决不了就去找有冲突的开发人员过来一起解决，解决完提交代码后自己和对应的人员再测试一下有没有问题。
## 部署
用jenkins打包，然后上跳板机，通过ftp将包传到指定网络的指定目录下，然后配置好nginx
# 编码规范
## 怎么指定团队的编码规范
像我们组之前其实是没有太多明确的编码规范的，很多都是靠口头约定的形式，可能看到了就说一下，没看到就算了只要不影响程序的运行。后面也是跟leader吃饭的时候他有吐槽过这件事，忘了当时是他提还是我提的说要弄个规范出来。他就叫我跟进处理一下，然后我就去网上看一些大公司的规范文档，后面就拿了京东的一个模板下来，然后发个各个组员让他们先看下，后面再组织会议去根据我们组自己的情况去修改，然后形成我们组自己的规范，然后再根据这些规范去配置到eslint和prettier中。当然这也不是一次会议就能确定的，这次会议也只是确定了一个基本，后面可能觉得哪里需要改的也会商量着来改
[团队内编码规范](https://blog.csdn.net/qq_28369007/article/details/130091841)

## 代码规范有哪些
	- 代码格式：tab两个空格，运算符周围要加空格，逗号分号后面加空格，关键字之后要留空格，函数名跟后面的括号不用空格
	- 代码命名：文件名全小写，多个单词用-隔开，变量名、函数名用小驼峰、常量全大写，用_隔开，类名、组件名使用大驼峰，命名应该是有含义的单词组成
	- 注释规范：注释应该简单明了、注释符与内容之间要留一个空格，需要以后解决或复查的可以加TODO
	- 提交规范：要用husky做好提交时的校验，提交前先拉去最新代码，提交注释要统一模板
[前端代码开发规范](https://blog.csdn.net/snowball_li/article/details/124928488)

## 代码规范工具限制
	- 采用的是eslint + prettier + husky，eslint主要配置的是当前是什么环境，要用哪些语法呀，prettier主要是配置格式化问题的，如缩进、单引号、分号那些，安装了husky后执行init的方法根目录会产生一个.husky文件，里面还有一个pre-commit的钩子文件，里面可以配置eslint和格式化的命令，当我们提交代码的时候就会去执行这个钩子

## eslint和prettier的区别
1. eslint这种lint工具是一个检查代码问题的工具，其目的是使代码风格更加一致并避免错误，更专注于检测并修复错误，会帮我修复一些语法上的错误，prettier是一个代码格式化工具，不会检查代码中的语法错误，而是让我们的代码符合一定的格式化规则，比如像制表符宽度、单双引号、尾随逗号、行尾分号等等，保证我们的代码即使由不同的开发人员开发，或者是在不同的编辑器中也能保持一致，以此来保证整个项目中代码风格的一致性。
2. eslint中env指定项目环境，不同的环境有不同预设的全局变量；eslint内置了大量的规则，如果需要启动或关闭这些规则直接在rules里进行设置，每个规则的状态有三种：关闭（"off"或0）、警告（"warn"或1）、错误（"error"或2）；除此外还有插件plugins用于拓展eslint功能和解析器parser来对js进行解析为eslint理解的抽象语法树
# 跳转
## [前端三板斧（html、css、javascript）](https://blog.csdn.net/qq_43565396/article/details/139072665)
## [Vue问题积累](https://blog.csdn.net/qq_43565396/article/details/139072743)
## [React问题积累](https://blog.csdn.net/qq_43565396/article/details/139072810)
## [常用框架问题积累（原生微信小程序、uni-app、taro）](https://blog.csdn.net/qq_43565396/article/details/139072869)
## [网络、设计模式、算法、后端问题积累](https://blog.csdn.net/qq_43565396/article/details/139072981)
## [技术方案与项目问题积累](https://blog.csdn.net/qq_43565396/article/details/139073029)
## [面试相关积累](https://blog.csdn.net/qq_43565396/article/details/130794769)