[React基础学习笔记](https://blog.csdn.net/qq_43565396/article/details/113146249)
## jsx
- 是JavaScript和xml的缩写，可以在js中编写html的模板结构，既有html声明式模板写法的优势，又有js可编程能力	
- jsx的{}里面只能用表达式，不能用语句
## 有状态组件和无状态组件、类组件和函数组件
是否有维护内部的状态，在16.8之前函数组件就是无状态组件，没有自身的状态，数据仅靠props传入，一般作为展示组件
注意：组件命名大驼峰

## 受控表单和不受控表单
1. 受控表单是将state和表单的值绑定起来，改变state的值能改变表单的值（例如将state的值传入到input的value，input的onChange事件里修改state的值）
2. 不受控表单的值没有与state绑定，修改和获取表单的值需要通过dom操作，通常就是使用ref

[React系列之表单处理（受控表单组件、非受控表单组件）](https://blog.csdn.net/SmartJunTao/article/details/125155877)
## 事件绑定（this指向的问题）

## 异步组件
使用lazy函数去加载组件，Suspense组件去占位
```js
import React, { lazy, Suspense } from 'react';
 
// 异步加载的组件
const SomeComponent = lazy(() => import('./SomeComponent'));
 
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SomeComponent />
    </Suspense>
  );
}
```
## 高阶组件（高阶函数）的概念和使用场景
1. 高阶函数是接受函数作为参数或将函数作为返回值的函数
2. 高阶组件是接受一个组件并返回一个新组件的函数
3. 使用场景:
	- 需要代码重用时，如多个组件都用到了同一段逻辑
	- 对组件进行增强时

## PureComponent
PureComponent与普通函数相比在于它默认实现了一个浅比较的shouldComponentUpdate函数，当组件的props或state发生变化时，PureComponent会对新旧props和state进行浅比较，如果没有变化，则不重新渲染组件。这种优化可以减少不必要的渲染，提高性能。
[React Component和Purecomponent区别](https://blog.csdn.net/weixin_59525879/article/details/135280567)
## 生命周期（16.x前和16.x后）
生命周期主要是组件从创建到更新到卸载一系列过程，主要分为挂载阶段、更新阶段、卸载阶段
1. 挂载阶段
	- constructor()
	- componentWillMount：一般不用
	- render
	- componentDidMount：在这里发送网络请求
2. 更新阶段
	- componentWillReceiveProps（nextProps）：并不是因为props变化被触发，而是因为父组件re-render所以才会执行，在需要将props属性设置为state属性时会用到
	- ShouldComponentUpdate（nextProps, nextState, nextContext）：返回一个boolean值，如果为false跳过更新，this.forceUpdate会无视这个钩子
	- componentWillUpdate（nextProps，nextState）
	- render
	- componentDidUpdate（prevProps, prevState, snapshot）
3. 卸载
	- componentWillUnmount：组件被销毁执行，可能是在父组件中被移除，也有可能是设置了key然后跟上一次不一样
![v16前的生命周期](https://img-blog.csdnimg.cn/direct/d192099c4895483091b287fb4b8cc9b5.png)
4. 从16版本开始生命周期发生了变化，其中又分为16.3及之前的和16.3之后的
	- 废弃了 componentWillMount 与 componentWillUpdate 及 componentWillReceiveProps
	- 新增了 getDerivedStateFromProps 与 getSnapshotBeforeUpdate
	- 新增了 getDerivedStateFromError 与 componentDidCatch 错误处理函数
![16.3之前](https://img-blog.csdnimg.cn/direct/5525bca951794aaa9d1700ce32d6e2bd.png)
![16.3之后](https://img-blog.csdnimg.cn/direct/ba9c78d1094e455fb7dc1ac20346edb2.png)
	- static getDerivedStateFromProps（）：返回一个对象来更新state，如果返回null则不更新
	- getSnaphotBeforeUpdate（）：
5. getDerivedStateFromProps为啥要设置成静态方法
	- 设置为静态方法开发者就获取不到this，也就不能调用实例的方法和setState了，强制开发者在render之前只做无副作用的操作
6. 生命周期钩子与hooks对比
![对比](https://img-blog.csdnimg.cn/direct/037219e7b5124ceab21f26bc53fbc24d.png)
7. 为啥废弃了componentWillMount 与 componentWillUpdate 及 componentWillReceiveProps
	- react16之后render阶段在执行的过程中是可以被打断的，而这几个生命周期钩子又是在render阶段的，并且可以进行一些副作用操作，当进行副作用操作的时候任务被打断重新执行，会操作一些不可预料严重bug
[理解 React 生命周期](https://zhuanlan.zhihu.com/p/429909925)
## 生命周期变化的原因
1. 为 Fiber 架构落地清除障碍，引入增量渲染的机制解决同步渲染引起的应用卡顿风险
2. 以废弃改进 API 的方式避免开发者滥用生命周期函数，推行强制性的最佳实践
## Fiber是干嘛的
fiber是react对它核心算法的一次重写，react原来是同步渲染的，每一次触发组件的更新都会进行虚拟dom的diff对比，这个对比过程是一个递归的过程，当嵌套层级比较深的时候就会很慢，并且这个过程是不可中断的，同步渲染一旦开始，主线程就会一直被占用，直到递归彻底完成，当这过程中有一些优先级比较高事情会处理，所以react就对它的核心算法进行了重写，将一个大的渲染任务划为多个小任务，每一个小任务执行完就将主线程交出，如果有其他优先级高的任务就可以执行，避免主线程被长期占用而卡顿，这种可以被打断的渲染过程就是所谓的异步渲染。这也是fiber带来的两个特性，任务拆解 与 渲染过程可打断
[万字长文介绍React Fiber架构的原理和工作模式](https://zhuanlan.zhihu.com/p/670914853)
## 为什么要使用hook
使用hook主要是因为使用类组件会有两个比较大的问题，一个就是代码逻辑复用会很困难，另一个就是类中的逻辑混乱且分散。
1. 在类中我们虽然可以使用render props和高阶组件的形式去实现代码的复用，但他们都会有一些局限性，render props可能会造成嵌套地狱的问题，高阶组件会对props进行劫持，如果没有遵守约定可能会造成props冲突
2. 在类中我们处理同一个事情的逻辑可能会分散在各个生命周期方法中，同一个生命周期中也包含很多其他的逻辑，这回导致我们不方便去组织和阅读我们的代码
3. 封装的高阶组件
	- 在我们的开发中很多审核页面都会根据事件流水号查事件详情的逻辑，这些都是重复的逻辑，我们在类组件中就只能去封装高阶组件去处理这公共的逻辑
[React Hooks的出现解决了什么问题？](https://blog.csdn.net/qq_37834631/article/details/136949642)
## hook的使用
1. react hooks的使用规则
	- hook只能在组件或者自定义hook中使用
	- 只能在组件的顶层调用，不能嵌套到if、for和其他函数中使用
2. useState：创建状态变量和修改状态变量的方法
3. useRef：用于创建一个引用对象，将引用对象作为ref值传入到要操作的dom节点，当dom节点挂载后会将引用对象的current属性设置为该dom节点
4. useContext：用于创建Context上下文，
5. useEffect()：用于组件中创建不是与事件引起而是由渲染本身引起的操作，如ajax请求，更改dom，`useEffect(副作用处理函数, 依赖项)`
	- 依赖项为 []，组件初始渲染时执行一次
	- 依赖项为空，组件初始渲染和更新时执行
	- 特定依赖项，组件初始渲染和依赖项变化时执行
	- 副作用函数中可以返回一个函数，这个函数最常见的执行时机是在组件销毁时自动执行，我们可以在这个函数中做一些清除副作用的操作，比如说清除定时器
6. [useCallback((value) => {}, depenArr)](https://blog.csdn.net/weixin_43804496/article/details/131072953)：用来创建缓存函数，如果不缓存，每次组件更新都会创建新的函数，如果将函数作为事件处理函数，因为每次事件函数都是新的，所以即使对子组件进行优化也会引起子组件的重新渲染
7. useMemo(() => {}, depenValue)：初始的时候会执行函数一次，会缓存计算结果，后续等依赖的数据变化了才会重新执行
8. 封装自定义hook
	- 声明一个use开头的函数，将复用逻辑写在函数内，return暴露出组件要用到的状态和回调，哪个组件中要使用直接执行这个函数然后将状态和回调中结构出来用就行了

[React Hooks —— useState异步更新队列、闭包、浅比较深入理解](https://blog.csdn.net/m0_46569480/article/details/131433524)
## hook为啥要按顺序定义（原理）
因为定义的这个hook是用链表来存的，到时候重新渲染也是按照链表的顺序一个个去匹配值的，它里面会通过一个memoizedState的字段去存储hook的值，不同类型的hook存数的逻辑也不一样

[React Hooks 原理](https://zhuanlan.zhihu.com/p/540415887)
[React Hook的实现原理](https://blog.csdn.net/kelly0721/article/details/127495025)
## hooks常见的坑
1. setXxx数据异步更新，setXxx后再使用该值还是修改前的
2. 多次setXxx修改同个状态，只会执行最后一个，因为维护了一个更新队列
3. useEffect中使用到的状态，如果没依赖该状态，是不会进行更新的
[React hooks 闭包陷阱](https://blog.csdn.net/weixin_42232622/article/details/127150053)
## useCallback和useMemo的区别
- useCallback是用于缓存函数，确保只有在依赖项发生变化时才会重新创建函数。useCallback的实现方式是缓存函数本身，当依赖项发生变化时，重新创建函数并返回。
- useMemo是用来缓存计算结果，确保只有在依赖项发生变化时才会重新计算。useMemo的实现方式是通过缓存计算结果，当依赖项发生变化时，重新计算结果并返回。

[关于useCallback和useMemo的详解](https://blog.csdn.net/weixin_51060775/article/details/124393619)
## react.Component和react.createClass
[react.Component和react.createClass的区别](https://blog.csdn.net/cheyanjing9409/article/details/100924490)

## 当父组件重新渲染时，子组件即使没有值改变也会重新渲染，如何优化
1. shouldComponentUpdate：类组件中生命周期钩子，返回false即为不更新
2. PureComponent
3. React.memo：函数组件中避免无效更新的方式，会返回一个新组件，第一个参数为要传入的组件，第二个为自定义对比函数，memo会自动对props进行浅层对比（Object(before, after)，Object.is({}, {})是不相等的，所以如果传入的是对象props，希望用useMemo缓存一下），如果相同则不会重新渲染，但如果使用到了useContext并且context发生变化时任会重新渲染
```js
// PureComponent的shouldComponentUndate会通过shallowEqual判断states和props是否浅比较相等
function shallowEqual(objA: mixed, objB: mixed): boolean {
    // 一样的对象返回true
    if (Object.is(objA, objB)) {
        return true;
    }
    
    // 不是对象或者为null返回false
    if (
        typeof objA !== 'object' || objA === null ||
        typeof objB !== 'object' || objB === null
    ) {
        return false;
    }
    
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    
    // key数量不同返回false
    if (keysA.length !== keysB.length) {
        return false;
    }
    
    // 对应key的值不相同返回false
    for (let i = 0; i < keysA.length; i++) {
        if (
            !hasOwnProperty.call(objB, keysA[i]) ||
            !Object.is(objA[keysA[i]], objB[keysA[i]])
        ) {
            return false;
        }
    }
    
    return true;
} 
```
[React-如何跳过子组件更新？](https://blog.csdn.net/weixin_53312997/article/details/125238205)
[React.memo](https://blog.csdn.net/linfeng_meng/article/details/131473320)

## 渲染过程
1. setState做了什么
	- 会有_pendingStateQueue和_pendingCallbacks两个队列去存setState的两个参数
	- 存完后会调enqueueUndate的一个方法
	- 然后会判断是否在批量更新中，如果是则组件实例放进dirtyComponents数组中，如果没在更新则开始进行批量更新
	- 批量更新其实会采用事务的形式进行更新，也就是通过perform的形式去执行方法
	- 后面看_pendingStateQueue其实会循环使用Object.assign去进行合并，合并的时候会判断是否是函数，如果是函数会先执行，执行的时候会传入上一个循环合并后的state和props，也就是nextState
2. 16.8后会先转成虚拟dom，然后转为fiber链表，确定节点操作，再执行实际的节点操作
[setState源码分析](https://juejin.cn/post/6844903573453537287)
## React的事务
事务一般在数据库中使用的比较多，能保证出错的时候进行rollbakc恢复。但是react的事务则是用wrapper去给我们要执行的方法前后加上一些方法，比如方法前执行initialize，方法后执行close。只要使用事务提供的perform方法，将需要执行的方法传入，这个时候就会按顺序执行wrapper.initalize，anyMethod,wrapper.close
[React事务机制解析](https://blog.csdn.net/handsomexiaominge/article/details/86183735)
1. 为啥要使用事务机制
为了保证数据的一致性和做一些前置准备和后置清理工作
## diff算法
## 单项数据流
## react事件机制
1. 当解析到dom中的onXxx事件会将对应的回调根据事件类型和dom ID记录起来，并在document注册对应的原生事件，原生的事件的回调通过一个dispatch方法去根据原生事件去封装react事件，然后根据事件类型和dom ID去调对应记录的事件
[React事件机制](https://blog.csdn.net/qq_43539854/article/details/125209305)
## React中的优化
1. 避免组件重复渲染方面，主要是处理props方面的问题
	- 使用PureComponent组件和memo函数
	- 避免使用内联对象，使用内联对象每次都会创建新的引用
	- 避免组件绑定事件中使用箭头函数，函数组件中使用useCallback缓存函数
2. 使用lazy函数和Suspense组件延迟加载不是立刻需要的组件
3. 使用useMemo缓存计算结果
4. 使用Fragment避免额外的dom
5. 列表项添加唯一key
[React性能优化的8种方式](https://blog.csdn.net/qq_15911201/article/details/132362178)
## redux是干什么的，有什么优缺点
1. redux是一个集中式的状态管理工具，可以维护不同组件需要共享的状态。
2. 优点：它是单一数据源的，也就是它通过维护一个全局状态树来保存和管理应用程序的状态，这种形式使得程序的状态变得可预测，方便进行调试和测试。并且它是比较灵活的，除了跟react了还可以跟其他框架进行继承，还通过了一些中间件的机制去拓展它的能力
3. 缺点：它本身并不支持异步的操作，需要通过一些中间件来进行处理，相对来说会有点复杂，较小的项目不适合去用，也有比较高的学习成本
## redux的数据是怎么流转的
1. 通过store.getState()获取到数据
2. 使用store.subscribe去订阅数据的更新
3. dispatch一个action触发reducer的更新
4. reducer里返回一个新的state然后就会触发更新

## react-redux的原理
react-redux主要就提供了Provider组件和connect函数。
1. Provider主要是用到了Context.Provider组件，将store传入进去
```js
import React, { Component } from 'react';
import Context from './context';

// 给connect等方法提供store
export default class Provider extends Component {
  render() {
    return (
      <Context.Provider value={{store: this.props.store}}>
        {this.props.children}
      </Context.Provider>
    )
  }
}
```

2. connect函数其实是一个高阶组件，里面封装了获取store的逻辑，并订阅了store的更新，它会把store.getState()的数据传入到mapStateToProps中，并将返回值设置到高阶组件中state中，最后会将该state通过props的形式放到被包裹的组件中
```js
import React, { Component } from 'react';
import Context from './context';
import { bindActionCreators } from 'redux';

/**
 * 
 * @param {function} mapStateToProps 绑定state到组件的props
 * @param {funtion|object} mapDispatchToProps  返回actions对象
 */
export default function(mapStateToProps, mapDispatchToProps) {
  return function(WrappedComponent) {
    return class extends Component {
      static contextType = Context;
      constructor(props, context) {
        super(props);
         // 被映射的state, 即mapStateToProps的返回值, 绑定到组件的props上
        this.state = mapStateToProps(context.store.getState());
      }
      componentDidMount() {
        this.unsubscribe = this.context.store.subscribe(() => {
          // setState的用法；传一个state对象
          this.setState(mapStateToProps(this.context.store.getState()));
        })
      }
      componentWillUnmount() {
        this.unsubscribe();
      }
      render() {      
        const { dispatch } = this.context.store;
        let actions = {};
        if (typeof mapDispatchToProps === 'object'){
          actions = mapDispatchToProps;
        } 
        if (typeof mapDispatchToProps === 'function') {
          actions = mapDispatchToProps(dispatch);
        }
        const bindActions = bindActionCreators(actions, dispatch)
        return (
          <WrappedComponent dispatch={dispatch} {...this.state} {...bindActions} />          
        )
      }
    }
  }
}
```
## Flux是什么
flux是一种架构思想，而redux就是flux的具体实现

## react-router使用方式的改变
1. 2.x和3.x的时候使用Router和Route
```js
import { Router, Route, browserHistory } from 'react-router';
 
<Router history={browserHistory}>
  <Route path="/" component={App}>
    <Route path="about" component={About} />
    <Route path="inbox" component={Inbox}>
      <Route path="messages/:id" component={Message} />
    </Route>
  </Route>
</Router>
```
2. 4.x的时候Router替换为了BrowserRouter和HashRouter，引入的地方改为了react-router-dom
```js
import { BrowserRouter, Route } from 'react-router-dom';
 
<BrowserRouter>
  <Route path="/" component={App}>
    <Route path="about" component={About} />
    <Route path="inbox" component={Inbox}>
      <Route path="messages/:id" component={Message} />
    </Route>
  </Route>
</BrowserRouter>
```
3. 5.x增加了Switch标签，Route增加了exact属性，设置为true则表示要完全匹配
```js
import { BrowserRouter, Route, Switch } from 'react-router-dom';
 
<BrowserRouter>
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/inbox" component={Inbox}>
      <Route path="/inbox/messages/:id" component={Message} />
    </Route>
  </Switch>
</BrowserRouter>
```
4. 6.x移除了Route的component与render属性，使用element属性替代，将Switch组件改为了Routes组件，Redirect组件改为了Navigate，增加了如vue-router那种配置路由的方式，不依赖路由组件
```js
// src/router/index.js文件
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter ([
	{
		path: '/a',
		element： ComponentA,
	},
	{
		path: '/b',
		element： ComponentB,
	}
])
export default router；

// src/index.js
import router from '../router/index.js'
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
```
[react-router详解](https://blog.csdn.net/qq_45297578/article/details/116332601)
[React-router v5和v6的区别对比](https://blog.csdn.net/weixin_57935165/article/details/122844132)

## react路由懒加载
1. 使用lazy（）函数导入组件
2. 使用Suspense组件包裹路由中element选项对应的组件
```js
// src/router/index.js文件
import { createBrowserRouter } from 'react-router-dom'
const ComponentA = lazy(() => import('@components/ComponentA')
const ComponentB = lazy(() => import('@components/ComponentB')

const router = createBrowserRouter ([
	{
		path: '/a',
		element： <Suspense callback={'加载中'}><ComponentA/></Suspense>,
	},
	{
		path: '/b',
		element： <Suspense callback={'加载中'}><ComponentB/></Suspense>,
	}
])
```
## umi主要做了什么
umi是一个基于路由的框架，采用约定式路由，以文件目录结构作为路由路径
## dva做了什么
dva是一个基于redux和redux-saga的数据流方案，还内置了react-router和fetch
[dva & redux](https://blog.csdn.net/qq_41918834/article/details/118379901)
[react如何使用dva](https://blog.csdn.net/glorydx/article/details/115473367)

## 业务组件跟技术组件
业务组件是业务逻辑比较紧密的，是基于业务逻辑的封装，比如我们之前封装过医院药店查询弹框。技术组件是跟业务逻辑无关的，比较通用的，比如说loading框、确认弹框
## Vue和React的区别
1. 大方向上的区别
	- 定位：vue是一个mvvm框架，支持双向数据绑定，但是在我的感觉中它更像是一个数据响应式框架，他们mvvm也只是体现在v-model的双向数据绑定，而react是单项数据流的
	- 模板语法：vue用的是基于html的模板语法，允许开发者在html标签中使用vue特定的指令来编写模板，而React采用的是jsx语法，可以在js中类似html的结构，在编译时会换成React.createElement，当然Vue也能用jsx语法，只是用的人不是很多
	- hooks：react16.8是推出了hooks，vue2是没有hooks，但vue3也是借鉴hooks推出了组合式api
	- 更新：vue采用的是数据响应式更新，检测数据的变化更加精准，更新的粒度也更小，而react通过setState触发更新，这是会所有组件都会进行更新，当然我们也可以在showComponentUpdate钩子来控制更新
	- 生态：在生态上，Vue基本上都给你准备好了，推出了vuex、vue-router、vue-cli，而react就推出了react和脚手架，其他都要你自己去找支持
	---
	- React相对来说更加灵活和自由，但学习的难度也更大一点，Vue相对来说更容易上手；
	- React有着更加庞大且灵活的生态系统，第三方库和工具选择更多一些，Vue生态相对来说较小一些，但也是很成熟
	- vue通过v-model可以实现双向数据绑定，通过template去定义页面的结构，而react是单项数据流的，使用的是JSX，HTML和Javascript耦合在一起；
	- vue采用数据劫持的方式，检测数据的变化更加精准，动了什么就更行什么，更新的粒度比较小，而react推崇函数式，手动通过setState触发更新，但这种情况是不知道哪些组件需要进行刷新，全部组件都要重新渲染，说白了就是直接无脑刷，这样性能肯定没这么好，所以就需要shouldComponentUpdate钩子来进行控制

	[一文带你了解Vue 和 React的区别](https://www.jb51.net/javascript/2857053fl.htm)
	[Vue和React的区别—详细介绍](https://blog.csdn.net/YN2000609/article/details/131739018)

2. 组织代码方式：react jsx，vue template模板文件
3. 状态：react状态是只读的，不能进行修改，只能替换，并且异步更新，vue状态是能直接修改的，同步更新，异步渲染
4. 事件：react onXxx，自定义传参需要采用箭头函数形式onClick={() => this.handleClick('aaa')}，vue @xxx，可以直接传参，也就是@click="handleClick"和@click="handleClick('aaa')"都是可以的
5. 组件：react必须大驼峰，导入就能使用，vue可以大驼峰也可以连字符，推荐连字符，vue2需要导入并注册组件
6. hook：react必须放在作用域顶部，不能放在条件逻辑中，vue没有这些要求
7. class样式：react改为className，vue还是叫class
8. 获取dom节点：react需要用createRef或者useRef创建一个引用，然后将引用传入到dom中ref属性，通过引用的.current就能获取到dom，vue2直接在dom中设置ref属性，然后就可以this.$ref.刚才设置的属性名去访问到dom节点，vue用ref创建一个状态变量，然后传入到dom节点中的ref属性，onMouted后就能获取到dom节点
9. 父子传值：react可以传任意值，包括函数（用来子传父 ）和jsx，子组件直接通过props接受，vue不能传函数（可以声明事件处理函数），子组件需要通过defineProps和defineEmit接受，不能传模板，但可以通过插槽实现类似效果

## 面试题
[2021年React常见的面试题以及答案](https://blog.csdn.net/qq_44182284/article/details/116979015)
[面试题记录之react](https://blog.csdn.net/jiaojsun/article/details/129721969)
# 跳转
## [前端三板斧（html、css、javascript）](https://blog.csdn.net/qq_43565396/article/details/139072665)
## [Vue问题积累](https://blog.csdn.net/qq_43565396/article/details/139072743)
## [常用框架问题积累（原生微信小程序、uni-app、taro）](https://blog.csdn.net/qq_43565396/article/details/139072869)
## [工程化问题积累](https://blog.csdn.net/qq_43565396/article/details/139072905)
## [网络、设计模式、算法、后端问题积累](https://blog.csdn.net/qq_43565396/article/details/139072981)
## [技术方案与项目问题积累](https://blog.csdn.net/qq_43565396/article/details/139073029)
## [面试相关积累](https://blog.csdn.net/qq_43565396/article/details/130794769)