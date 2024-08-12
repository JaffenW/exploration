# 计算机网络与安全
## 1.网络分层
![网络分层](https://img-blog.csdnimg.cn/direct/14545576e61c424ba0a8a8ba4f4badcc.png)

- **物理层**: 规定传输媒体的接口标准，不用管具体传输介质是什么，只要能按物理层规则标准传输数据就行，传输的是比特流，物理层数据的基本单位是比特
- **数据链路层**：基本单位是帧，该层的作用是将数据封装成帧，帧由帧首部、帧数据、帧尾部组成，帧并不是无限大的，由MTU(最大传输单元)限制；`透明传输`确保无论传输的数据为任何，都不会影响到帧的定界，在发送帧之前会对数据部分进行扫描，遇到帧定界符或者转义字符就会插入一个转义字符；该层只负责`差错检测`不负责差错纠正，常见的校验方法有奇偶校验码、循环冗余校验码
- **网络层**：主要是进行地址管理、路由选择和将数据帧封装成数据报，基本单位称为数据报，分为报头和数据本身
- **传输层**：是管理两个节点之间的数据传输，提供可靠传输或者不可靠传输，主要是TCP(传输控制协议)和UDP(用户数据报协议)
- **应用层**：对应用程序的通信提供服务。常见的协议有HTTP(超文本传输协议，互联网中应用最广的协议)、DHCP(UDP的应用层协议，用于动态分配ip地址，接入局域网时就是由DHCP服务器分配ip地址)、DNS(域名系统协议，用户将域名和IP相互映射)、FTP(文件传输协议，传输效率比较高，一般用来传输大文件)、SMTP(简单邮件传输协议，主要用于邮件收发)
[https://juejin.cn/post/7054126143754108935](https://juejin.cn/post/7054126143754108935)
## 2.状态码
1. 100：请求者应当继续请求
2. 101：切换协议
3. 200： 正常返回
4. 301：永久重定向（网站更换了域名，希望原来的网站还能跳转到新的网站）
5. 302：临时重定向（有可能是没有登录，然后又点击个人中心，就会跳转到登录页）  
6. 303：临时重定向（会将post请求改为get请求）
7. 304：not modify（协商缓存内容没有改变）
8. 400:  错误请求，服务器不理解请求的语法
9. 401：请求需要进行身份验证，通常意味着用户要登录
10. 403：服务器能理解这个请求但还是拒绝了，通常是权限问题
11. 404：not found （请求的资源在服务器找不到）
12. 500：内部服务错误（服务器崩了）
13. 502：bad gateway（网关故障）
14. 503：服务不可用（超载，也就是并发请求数量太多了，服务器为了保证自己不被挂掉，拒绝了某些用户的访问）
15. 504：请求超时

[网络请求状态码](https://blog.csdn.net/qq_44848480/article/details/121530195)
## 3.Nginx
[8分钟带你深入浅出搞懂Nginx](https://zhuanlan.zhihu.com/p/34943332)
## 4.HTTP1.0、1.1、2.0、3.0、HTTPS
- **1.0**：无状态（不记录过去的请求）、无连接（每次请求都要建立tcp连接，服务器处理完后立刻断开，网络利用率低）、对头阻塞（必须等上一次请求的响应返回了才能进行下一次请求，响应一直不到达，后面的请求就阻塞了）、不支持断点续传（每次都会传输所有的页面和数据）
- **1.1**：支持长连接（增加Connection字段，设置keep-alive）、支持断点续传（使用请求头的range实现）、使用管道传输（多个请求同时发送，服务端还是按顺序响应）
- **2.0**：二进制分帧（应用层和传输层之间增加了二进制分帧层）、多路复用、头部压缩（1.x头部元数据采用纯文本传输，2.0采用encoder减少传输头的大小，通信双方cache中各维护一份header_file，避免重复的header传输）、服务器推送（服务器可以额外向客户端推送资源）
- **3.0**：放弃TCP，采用谷歌基于UDP的QUIC协议；减少了三次握手的时间；解决了2.0中前一个stream丢包导致后一个stream被阻塞的问题
[HTTP 1.0、1.1、2.0、3.0区别](https://www.jianshu.com/p/cd70b8e90d00)

## HTTP和HTTPS的区别
HTTPS相对于HTTP来说最大的区别就是多了一个ssl层，用于数据加密，因为HTTP是明文传输的，不安全，所以就有了HTTPS进行加密传输，但是加密需要用到一个东西，那就是CA证书，HTTPS加密的过程就是要用到证书中的公钥给会话密钥进行加密，但是这种CA证书免费的少，基本上都要收费，而HTTPS为了区别于HTTP，默认端口采用的是443
[详细解析 HTTP 与 HTTPS 的区别](https://juejin.cn/post/6844903471565504526)
## Restful API
Restful是一种风格，面向资源的，它要求URI中不能有动词，只能有名词，并且所用的名字往往跟数据库的表名对应，采用http动词（get、post、put、delete）表示对服务器资源的操作
[传统url接口与RESTful风格接口的区别](https://blog.csdn.net/weixin_53436351/article/details/123893392)
## CDN
1. cdn即内容分发网络，他会将我们的请求转发到离用户地理位置最近的服务器，cdn针对的对象是静态网络资源
2. 当进行dns域名解析查询目标ip的时候，dns域名服务器会去查询到cdn提供商的dns服务器，cdn服务器会返回一个cname指向另一个查询服务器，这其中可能会经历多次的查询，最终能获取到最近ip的cdn信息，cdn信息中也会记录源服务器的ip地址，如果cdn服务器中没有用户请求的对应资源，那么就是去源服务器中去查询并且存到cdn中

## 域名发散和域名收敛

## XSS(Cross Site Scripting，为了区别css，所以将第一个字母改为x)跨站脚本攻击
1. 攻击者利用网站的漏洞往web页面插入恶意的脚本，当用户访问了带有恶意脚本的网页时，就会触发这些恶意脚本，这些脚本可能会把用户的一些信息给发送到攻击者的服务器上，造成信息的泄漏。其中XSS攻击又分为反射型、存储型和dom型：
	- 反射型是攻击者会构建一个包含恶意脚本的URL，然后诱导用户去点击URL，当用户点击了后就会注入到目标网站的响应中
	- 存储型是指这些恶意的脚本已经存储在网站的数据库里面，当用户访问网站就有可能触发恶意脚本，主要是一些带有评论功能的地方，如博客、论坛等
	- dom型是会修改目标网页的dom结构来实施攻击，这种攻击需要利用前端JavaScript的代码漏洞
[常见安全性问题及解决方案](https://blog.csdn.net/m_sy530/article/details/109162274)
2. 解决：对用户输入的内容进行严格的过滤和转义escapeHTML
## CSRF跨站请求伪造
1. 用户短期内登录某个网站(比如银行)，又去访问了恶意站点，恶意站点添加了访问银行的链接，这时候就会带上用户的认证信息
2. 解决：
	- 采用随机token
	- 自定义请求头字段检查
	- 验证来源站点
	- 常见的验证码人机校验
## SQL注入攻击
由于应用程序对输入没有做好防范，攻击者在要执行的sql查询中插入恶意代码，通过这种形式攻击者可以获取到额外的数据，以及绕开身份验证等
```mysql
外面传入 username
select * from t_user where username = '' or '1' = '1';

外面传入    ' or '1' = '1
```
为了避免sql注入攻击，采用参数化查询的方式进行查询，而不要直接拼接用户的输入
## DDOS攻击
1. ddos攻击就是分布式拒绝服务，通过向目标服务器发送大量的请求，超出目标系统的带宽和处理能力
2. 防御ddos攻击需要专业的防护设备和技术
## 面试题
[计算机网络基础](https://juejin.cn/post/6939691851746279437)

# 设计模式
设计模式的优点：代码复用、代码稳定可拓展、代码可读性提升
## 1.五大原则（开闭原则、单一职责原则、依赖倒置原则、接口隔离原则、里氏替换原则）
1. 开闭原则：
对扩展开放，对修改关闭。已有的场景下，对于需要拓展的功能进行开放、拒绝直接的功能修改
2. 单一职责原则：
岗位职责单一，互不重叠，通过解耦让每一个职责更加独立，一个功能模块只做一件事
3. 依赖倒置原则：
上层不应依赖下层实现，面向抽象进行coding，而不是对实现进行coding。降低需求与实现的耦合
4. 接口隔离原则：
多个专业的接口比单个胖接口好用
5. 里式替换原则：
子类可以增量扩展，但不能改变父类
## 2.模式分类（创建型、结构型、行为型）
#### 创建型
1. 工厂模式：
隐藏创建过程、暴露共同接口，批量生产同类型的商品
	```
  	class GameFactory {
      create(name) {
        return new Game(name);
      }
    }
    
    class Game {
      constructor(name) {
        this.name = name;
      }
      init() {
        console.log('init');
      }
      run() {
        console.log('run');
      }
    }
    
    const factory = new GameFactory();
    const pubg = new factory.create('pubg');
    
    pubg.init();
    pubg.run();
	```
	场景：批量生产同类型应用来满足频繁使用同一种类型需求时  
   实际应用：Button Producer：生产不同类型的按钮 => 生产多个本质相同，利用传参区分不同属性的元素
2. 构造者
	拆分简单模块、独立执行 => 注重过程与搭配  
   每个模块独立解耦，而建造者负责创建串联正题系统
   ```jsx
   class Product {
      constructor(name) {
        this.name = name;
      }
      init() {
        console.log('Product init');
      }
    }
    
    class Skin {
      constructor(name) {
        this.name = name;
      }
      init() {
        console.log('Skin init');
      }
    }
    
    class Shop {
      constructor() {
        this.package = '';
      }
      create(name) {
        this.package = new PackageBuilder(name);
      }
      getGamePackage() {
        return this.package.getPackage();
      }
    }
    
    class PackageBuilder {
      constructor(name) {
        this.game = new Product(name);
        this.skin = new Skin(name);
      }
      getPackage() {
        return this.game.init() + this.skin.init();
      }
    }
    ```
    场景：当我们需要模块化拆分一个大模块，同时使模块间独立解耦分工  
   实际应用：页头组件Header: 包含了title、button、breadcum => 生产多重不同类型的元素
  3. 单例  
   全局只有一个实例
   
	   ```
  	 class PlayStation {
	     constructor() {
	       this.state = 'off'
	     }
	     play() {
	       if (this.state === 'on') {
	         console.log('别闹，已经在happy了');
	         return;
	       }
	       this.state = 'on';
	       console.log('开始happy');
	     }
	     shutdown() {
	       if (this.state === 'off') {
	         console.log('已经关闭');
	         return;
	       }
	       this.state = 'off';
	       console.log('已经关机，请放心');
	     }
	     // static instance = undefined;
	     // static getInstance() {
	     //   return function() {
	     //     if(!PlayStation.instance) {
	     //       PlayStation.instance = new PlayStation();
	     //     }
	     //     return PlayStation.instance;
	     //   }();
	     // }
	   }
	   
	   // main.js
	   PlayStation.instance = undefined;
	   PlayStation.getInstance = (function() {
	     return function() {
	       if(!PlayStation.instance) {
	         PlayStation.instance = new PlayStation();
	       }
	       return PlayStation.instance;
	     }
	   })()
	   
	   const ps1 = PlayStation.getInstance();
	   ps1.play();
	   
	   const ps2 = PlayStation.getInstance();
	   ps2.shutdown();
	   ```
   		场景：全局只需要一个实例，注重统一一体化  
  		实际应用：全局应用 router store => 只需要一个实例

#### 结构型(代码结构)
功能：优化结构的实现方式
1. 适配器  
   适配独立模块，保证模块间的独立解耦且连接兼容
    ```jsx
    // 需求: 买了一个港行PS，插座是国标
    class HKDevice {
      getPlug() {
        return '港行双圆柱插头';
      }
    }
    
    class Target {
      constructor() {
        this.plug = new HKDevice();
      }
      getPlug() {
        return this.plug.getPlug() + '+港行双圆柱转换器';
      }
    }
    
    const target = new Target();
    target.getPlug();
    ```
   场景：中间转换参数、保持模块间独立的时候  
   实际应用：两个模块：筛选器和表格，需要做一个联动。但筛选器的数据不能直接传入表格，需要做数据结构转换=> 模块之间独立，需要做数据结构转换
2. 装饰器
   动态将责任附加到对象上
    ```jsx
    // 设备升级
    class Device {
      create() {
        console.log('PlayStation4');
      }
    }
    
    class Decorator {
      constructor(device) {
        this.device = device;
      }
      create() {
        this.device.create();
        this.update(device);
      }
      update(device) {
        console.log(device + 'pro'); // 给它附加功能
      }
    }
    
    const device = new Device();
    
    const newDevice = new Decorator(device);
    newDevice.create();
    ```
   场景：附着于多个组件上，批量动态赋予功能的时候  
   实际应用：目前有按钮、title、icon三个组件。希望开发一个模块，让三个组件同时具备相同功能 => 套一层装甲对于每个组件有统一的能力提升，且可以动态添加功能进行拓展
3. 代理  
   使用代理人来替代原始对象
    ```jsx
    // 游戏防沉迷
    class Game {
      play() {
        return "playing";
      }
    }
    
    class Player {
      constructor(age) {
        this.age = age;
      }
    }
    
    class GameProxy {
      constructor(player) {
        this.player = player;
      }
      play() {
        return (this.player.age < 16) ? "too young to play" : new Game().play();
      }
    }
    
    const player = new Player(18);
    const game = new GameProxy(player);
    
    game.play();
    ```
   场景：将代理对象与调用对象分离，不直接调用目标对象  
    实际应用：ul中多个li，每个li上的点击事件 => 利用冒泡做委托，事件绑定在ul上

#### 行为型(模式行为总结)
功能：不同的对象之间划分责任和算法的抽象化
1. 命令
   请求以命令的形式包裹在对象中，并传给调用对象
    ```jsx
    // 对于游戏角色的控制
   
    // 接受者
    class Receiver {
      execute() {
        console.log('角色开始奔跑');
      }
    }
    
    // 触发者
    class Operator {
      constructor(command) {
        this.command = command;
      }
      run() {
        console.log('请给我爬');
        this.command.execute();
      }
    }
    
    // 指令器
    class Command {
      constructor(receiver) {
        this.receiver = receiver;
      }
      execute() {
        console.log('执行命令');
        this.receiver.executer();
      }
    }
    
    const soldier = new Receiver();
    const order = new Command(soldier);
    const player = new Operator(order);
    player.run();
    ```
   场景：发出指令，中间层传递命令本身，命中包含执行对象  
   实际应用：调度器在接受到一组新的数据时候，解析数据，并且根据数据类型包裹在对象中传递到下级helper，helper再去执行相应操作
2. 模板  
   在模板中，定义好每个方法的执行步骤。方法本身关注于自己的事情
    ```jsx
    // 想要成功吃个鸡，大概分几步
    
    class Device {
      constructor(executePipeLine) {
        // executePipeLine……
      }
      powerOn() {
        console.log('打开电源');
      }
      login() {
        console.log('登录账号');
      }
      clickIcon() {
        console.log('点击开始游戏');
      }
      enterGame() {
        console.log('进入战场');
      }
    
      play() {
        this.powerOn();
        this.login();
        this.clickIcon();
        this.enterGame();
      }
    }
    ```
   场景：通过模板定义执行顺序，做独立操作  
   实际应用：echart准备工作：canvas、config、init、draw()，规划顺序执行
3. 观察者
   当一个属性发生状态改变时，观察者会连续引发所有的相关状态改变
    ```jsx
    // 通过智能家居一键开始游戏
    class MediaCenter {
      constructor() {
        this.state = '';
        this.observers = [];
      }
      attach(observer) {
        this.observers.push(observer);
      }
      getState() {
        return this.state;
      }
      setState(state) {
        this.state = state;
        this.notifyAllobservers();
      }
      notifyAllobservers() {
        this.observers.forEach(ob => {
          ob.update();
        })
      }
    }
    
    class observer {
      constructor(name, center) {
        this.name = name;
        this.center = center;
        this.center.attach(this);
      }
      update() {
        console.log(`${this.name} update, state: ${this.center.getState()}`);
      }
    }
    
    const center = new MediaCenter();
    const ps = new Observer('ps', center);
    const tv = new Observer('tv', center);
    
    center.setState('on');
    ```
   场景：通过观察者，可以让被观察值统一发生变化，触发相应依赖值的统一更新  
   实际应用：输入框输入的值去判断下拉框显示与否 => 观察input设置show
4. 职责链  
  1.链式调用 2.职责独立 3.顺序执行
    ```jsx
    // 成年高质量男性想要打个游戏，在家里需要过几关
    class Action {
      constructor(name) {
        this.name = name;
        this.nextAction = null;
      }
      setNextAction(action) {
        this.nextAction = action;
      }
      handle() {
        console.log(`${this.name}请审批，是否可以打游戏`);
        if (this.nextAction !== null) {
          this.nextAction.handle();
        }
      }
    }
    
    const dad = new Action('爸');
    const mom = new Action('妈');
    const wife = new Action('夫人');
    
    dad.setNextAction(mom);
    mom.setNextAction(wife);
    
    dad.handle();
    ```
    场景：独立职责的单元通过链式执行，逐步操作流程  
    实际应用：提交表单进行表单逐行校验，链式调用validate，依次执行
# 数据结构与算法
## 1. 数据结构
- 数组Array
- 集合Set
- 队列Queue
- 链表Linked List
- 堆Heap：是一种动态分配的数据结构，它的数据可以随机访问，通常是用来存储对象的值，内存的回收需要垃圾回收机制来支持
- 栈Stack：是一种后进先出的数据结构，通常是用来存储基本数据类型和对象的引用，它数据存入和读取都是在栈顶进行操作，正常来说当数据出栈后内存就被回收了
- 哈希Hash
- 数Tree
- 图标Grap

## 内存溢出和内存泄漏
1. 内存溢出是申请内存的时候内存不够了
2. 内存泄漏是指程序运行过程中分配的内存无法被正常释放
	- 闭包使用不当会引发内存泄漏
	- 控制台打印了某个对象，就保持了这个对象的引用，也会引起内存泄漏
	- 一些遗忘的定时器
	- 全局定义的对象
	- dom元素被移除还有其他地方引用，如对dom元素设置事件，然后把dom元素移除了

[一文带你了解如何排查内存泄漏导致的页面卡顿现象](https://zhuanlan.zhihu.com/p/362236341)
## 垃圾回收（GC）
1. `标记清理:`在js中，最常用的垃圾回收机制是标记清除：当变量进入上下文，就会被加上存在上下文的标记，当变量离开上下文时，也会被加上离开上下文的标记（给变量加标记的方法很多，比如反转某一位，或者维护在上下文和不在上下文的两个变量列表）。垃圾回收器会销毁那些带标记的值并回收它们所占用的内存空间。
2. `查找引用(谷歌浏览器)：`，浏览器不定时去查找当前内存的引用，如果没有被占用了，浏览器会回收它；如果被占用，就不能回收。
3. `引用计数法(IE浏览器)：`，当前内存被占用一次，计数累加1次，移除占用就减1，减到0时，浏览器就回收它。
## 2.算法
1. 贪婪
贪心算法（也叫贪婪算法）是指在对问题求解时，总是做出在当前看来是最好的选择。也就是说，不从整体最优上加以考虑，只做出在某种意义上的局部最优解。贪心算法不是对所有问题都能得到全局最优解，得到的是局部最优解
<b>经典问题：</b>0-1背包，钱币找零问题，最小代价生成树（prim算法和cruskal算法），huffman算法，以及Dijkstra算法
2. 动态规划
动态规划算法与分治法类似，其基本思想也是将待求解问题分解成若干个子问题，先求解子问题，然后从这些子问题的解得到原问题的解。与分治法不同的是，适合于用动态规划求解的问题，经分解得到子问题往往不是互相独立的（即下一个子阶段的求解是建立在上一个子阶段的解的基础上，进行进一步的求解）
<b>经典问题</b>：多段图问题，备忘录方法，求全路径最短路径的Floyd弗洛伊德算法，最长公共子序列，斐波那契数列
3. 分治
分治算法的基本思想是将一个规模为N的问题分解为K个规模较小的子问题，这些子问题相互独立且与原问题性质相同。当分解后的子问题规模足够小时，应能够直接求解。 求出子问题的解，就可得到原问题的解。
<b>经典问题</b>：归并排序、堆排序、快速排序、二分查找、全排列问题、整数划分问题、求第k大元素
4. 回溯
回溯法（探索与回溯法）是一种选优搜索法，按选优条件向前搜索，以达到目标。但当探索到某一步时，发现原先选择并不优或达不到目标，就退回一步重新选择，这种走不通就退回再走的技术为回溯法
<b>经典问题</b>：n皇后，图的着色问题、求子集、字符串的排列
5. 分支界限法
分支限界法的求解目标则是找出满足约束条件的一个解，或是在满足约束条件的解中找出在某种意义下的最优解。
<b>经典问题：</b>01背包，最大团，单源最短路径，装载问题，布线问题
[五大经典算法](https://blog.csdn.net/vivian_ll/article/details/103253664)
[10个常用算法](https://www.jianshu.com/p/4b29805f9fa7)

## 3.常见排序算法
1. `冒泡排序`：从左到右相邻两个对比，前者比后者大则替换，当一次循环后能将最大的置于右边，可以加个标识如果一个循环结束之后都没有替换过，则表示排序好，结束循环，时间复杂度最小为o(n)，最大为o(n^2），相邻元素相等时不会替换，所以是稳定排序。
2. `选择排序`：循环未排序序列，记录最小(或者最大)值的下标，循环结束后将最小值跟起始下标的值替换掉，复杂度固定为o(n^2)，数组实现的选择排序是不稳定的，链表实现的是稳定的
3. `插入排序`：左边为已排序，右边为未排序，每次取出一个未排序的值去已排序的序列中循环判断，当已排序的值不大于取出的值，则往已排序值后面插入，时间复杂度固定为o(n^2)，是稳定排序
4. `归并排序`：申请一个空间，然后将数组递归划分为两个序列，到最小粒度的时候从两个序列的开始位置开始比较，小的存入空间并且指针向后移一位，大的指针不变。时间复杂度为o(nlogn)，空间复杂度最坏为o(n)，最好为o(logn)，是稳定排序
5. `快速排序`：选出一个基准，比基准小的排在前面，比基准大的排在后面，然后将基准两边的数组按照相同的方法递归去排序。平均情况时间复杂度为o(nlogn)，最坏为o(n^2)，不稳定排序
[十大排序算法](https://zhuanlan.zhihu.com/p/42586566)
# 后端相关
## 1.node内置模块（fs、http、os）
[express搭建服务器简单流程](https://www.likecs.com/show-696856.html)
[express + mysql实践](https://www.cnblogs.com/konghaowei/p/14901257.html)
[Nodejs 代码热更新实现](https://blog.csdn.net/xiaobianjava/article/details/79174923)

## 部署
配置jekins打包，打包后将dist文件通过堡垒机传送到服务器上，一些新项目需要配置nginx

# 跳转
## [前端三板斧（html、css、javascript）](https://blog.csdn.net/qq_43565396/article/details/139072665)
## [Vue问题积累](https://blog.csdn.net/qq_43565396/article/details/139072743)
## [React问题积累](https://blog.csdn.net/qq_43565396/article/details/139072810)
## [常用框架问题积累（原生微信小程序、uni-app、taro）](https://blog.csdn.net/qq_43565396/article/details/139072869)
## [工程化问题积累](https://blog.csdn.net/qq_43565396/article/details/139072905)
## [技术方案与项目问题积累](https://blog.csdn.net/qq_43565396/article/details/139073029)
## [面试相关积累](https://blog.csdn.net/qq_43565396/article/details/130794769)