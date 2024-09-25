# 基本
##  说说对Vue的理解
Vue就是一个js的库，或者说是工具，用来提高我们的开发效率的，它让我们只用关注于业务逻辑，而不用再去考虑怎么进行dom操作，怎么把我们获取到的数据给渲染到页面上去。还有它也提供了一些组件化的方式让我们分割和组织代码，提高代码的可读性，降低后续的维护成本。还提供了一种叫渐进式的方式，或者说是插件机制，让我们可以去拓展它的功能、能力。但因为它只有一个页面，是单页面应用，所以他是不利于SEO的
## data为啥是一个函数
如果是对象话每个组件实例都会指向同一个内存地址，会产生数据污染
## 对象和数组数据的追加
\$set、\$delete
## computed和watch的使用场景
computed会有缓存，擅长处理依赖多种响应式数据的情况，会产生一个新的数据，但computed中不能进行异步操作，watch比较擅长处理含有一些副作用的场景，vue3的watch可以同时监听多个数据的变化
## 组件注册（全局注册和局部注册、组件名的规范）
1. `Vue.component('MyComponent', MyComponent)`、`components: { MyComponent }`、在Vue3的setup中导入就可以直接使用，不用进行注册
2. 组件名使用PascalCase（大驼峰）
## 插槽（默认插槽和具名插槽）
```html
<!-- 子组件 -->
<slot ></slot>
<slot name="header"></slot>

<!-- 父组件 -->
<Child><div></div></Child>
<Child><div slot="header"></div></Child>
```
[了解vue插槽slot篇](https://blog.csdn.net/weixin_33681778/article/details/93168434)
## 动态组件`<component :is="componentName" />`
## 组件缓存`<keep-alive include="componentName"></keep-alive>`
## 异步组件和路由懒加载
都是采用`MyComponent: () => import('../components/MyComponent.vue')`形式的，异步组件是使用在页面文件路由注册的时候，路由懒加载 是定义路由映射页面文件的时候
## 事件修饰符、按键修饰符、表单修饰符
## 插件的结构和注册插件Vue.use()
Vue的插件就是一个带有install方法的对象，Vue.use()的时候会自动调用install方法并将Vue构造器传入
## 过滤器Vue.filter
## 自定义指令

## 用delete和Vue.delete删除数组有什么区别
delete是将数组对应下标设置为empty或者undefined，并不会改变数组长度和触发响应式更新，Vue.delete是将对应下标的数据彻底删除，数组长度会改变并且会触发响应式更新
## MVVM和MVC的区别
- MVC和MVVM这些设计模式都是为了使视图跟数据职责分离，减少耦合
- 其中MVC最早的话是出现在后端，当视图有改变的时候会通过controller去修改数据，数据变更了后会通知view进行更新，视图跟模型是存在耦合，视图是能直接访问模型的
- MVVM的视图和模型是完全解耦的，视图由更新的话通过viewmodel绑定的事件去更新数据，数据有变化的话也通过viewmodel更新到视图，其最主要的通过实现一套响应式机制去自动更新视图，避免了大量dom操作，使得开发人员只用关注业务逻辑，提高了开发效率

[MVC，MVP和MVVM架构解析](https://blog.csdn.net/java521666/article/details/126054377)
## 组件中使用v-model
```html
<!-- 父组件中 -->
<UserName
  v-model="name"
  v-model:first-name="first"
  v-model:last-name="last"
/>
```
v-model标签在组件中其实相当于传入了一个modelValue的参数跟一个update:modelValue的事件
```js
<script>
export default {
  props: {
    modelValue: String, // 默认情况
    firstName: String, // 指定参数的形式
    lastName: String
  },
  emits: ['update:modelValue', 'update:firstName', 'update:lastName']
}
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```
vue3中使用的方式跟vue2差不多，不过采用组合式api defineProps和defineEmit来声明props和emit(v3.4前)，v3.4后推荐使用的方式是defineModel()宏，defineModel返回的是一个ref，它可以像其他ref一样修改和访问，它的`.value`和父组件的`v-model`值同步，意味着它的值改变后父组件的值也会更新
```html
<!-- Child.vue -->
<script setup>
const model = defineModel() // 可以传入字符串v-model的指定的参数名一样

function update() {
  model.value++
}
</script>

<template>
  <div>parent bound v-model is: {{ model }}</div>
</template>
```
## 生命周期
1. vue2中有beforeCreate、created、beforeMount、mounted、beforeDestroy、destroyed、beforeUpdate、updated，还有keep-alive组件中使用的钩子activated、deactivated，过渡动画使用的钩子beforeEnter、enter，还有errorCaptured、render
![生命周期](https://img-blog.csdnimg.cn/direct/aaeff8b5d0e245c393fb75059db750b7.png)
2. vue3中beforeCreate、created被废弃(但还是可以用的，向下兼容)，转为采用组合式API setup()，其他也变为组合式API onBeforeMount、onMounted、onBeforeUnmount、onUnmounted、onBeforeUpdate、onUpdated，还有调试用钩子onRenderTriggered、onRenderTracked
3. **为什么vue3中要废弃beforeCreate、created**：setup()的执行时间早于beforeCreate，这时候实例都已经创建好了，beforeCreate和created就有点多余了

[vue2、vue3，生命周期详解](https://blog.csdn.net/lwzhang1101/article/details/135849769)
[对比vue2生命周期做了哪些改变](https://blog.csdn.net/pagnzong/article/details/130301179)

## 父子组件生命周期
父（beforeCreate、created、beforeMount），子（beforeCreate、created、beforeMount、mounted），父mounted
## privide和inject
## vue.config.js配置
## vue2和vue3中怎么动态引入图片
1. vue2的采用require来引入，vue3的话要使用import来引入`const img = new URL('../asset/img/icon.img', import.meta.url).href`。其中URL第一个参数如果是相对路径，则需要传递第二个参数(基础路径），import.meta.url就是获取当前模块的路径。
2. 在vue官网中对静态资源解释如下
	- 在js、template、css中使用相对路径，会经过webpack的处理，例如url(./image.png)会被翻译为require(./image.png)
	- 在public目录下或者是绝对路径的，这类资源会直接拷贝，不经过webpack的处理

[解决Vue中动态渲染图片路径报错问题](https://blog.csdn.net/weixin_75115821/article/details/134063604)
[vue3图片不显示？vue3正确动态渲染图片和背景图片](vue3图片不显示？vue3正确动态渲染图片和背景图片)

## 为啥要有key

## 双向数据绑定、单项数据流
## 为啥要有虚拟dom
虚拟dom是对真实dom树的一种抽象，它会更轻量级，因为真实dom需要实现一些规范，考虑更多的一些事情，所以会比较重。如果只是很简单的一些操作，增加这样一个虚拟dom并不会说带来效率的提高，但是如果遇到一些大批量的数据修改或者是复杂的dom操作，采用虚拟dom形式效率会更高，它会将多次修改进行合并，会进行虚拟dom的对比，然后找出最小代价更新dom的方法去进行页面的更新。而且采取虚拟dom也是一种跨平台跨端的需要，因为浏览器、移动端、服务器端中真实dom其实是不一样，而虚拟dom正是一种与平台无关的抽象层。也正是考虑到效率、跨平台的这些需要，所以Vue、React这些框架才会采用虚拟dom的这种形式。
## render函数（runtime-only和runtime-complier的区别）
[Vue的完整版和运行时版的区别](https://zhuanlan.zhihu.com/p/358414662)
## vue2为啥不用defineProperty监听数组下标的变更
defineProperty其实是可以针对数组下标进行监听的，在使用习惯来说，数组一般长度会很大，如果对每个下标进行劫持会带来性能问题，导致框架的不稳定，所以vue2放弃了劫持数组下标的方式，而是提供了$set方法操作数组
## 混入规则

## 组件之间的参数传递，兄弟组件怎么传
- props/emit，\$parent/\$children，provide/inject，$ref，Vuex
- 父组件作为中介进行传递、Vuex、事件总线
## new Vue()发生了什么？
[new vue 实例发生了什么呢？](https://www.cnblogs.com/ifannie/p/12334091.html)
[$mount实现](https://zhuanlan.zhihu.com/p/39685427)
## 页面优化
[SPA（单页应用）首屏加载速度慢怎么解决？](https://blog.csdn.net/weixin_44475093/article/details/110675962)
[Vue 包大小优化--从 1.72M 到 94K](https://juejin.cn/post/6929839648542425102)
[vue项目你一定会用到的性能优化！](https://juejin.cn/post/7089241058508275725)
## 观察者模式和发布订阅模式的区别
- 观察者模式主要有观察者和目标，观察者提供更新方法，然后将本身注册到目标上，目标有变化直接调用观察者的更新方法，目标和观察者是存在耦合的，vue中数据的响应式用的就是观察者模式，watcher直接记录到响应式数据的dep中，数据变化了直接调用watcher的update方法
- 发布订阅模式相对来说多了一个事件中心，订阅者将想订阅的事件注册到事件中心上，发布者发布事件到事件中心，事件中心再统一调度订阅者注册的处理代码，订阅者和发布者是完全解耦的。vue中的事件总线就是用的发布订阅模式，订阅者通过\$on注册事件，发布者通过\$emit发布事件

[观察者模式和发布订阅模式的区别](https://blog.csdn.net/u012372941/article/details/98445536)

# Vue3
## 为啥vue3提出了组合式api
随着组件越来越复杂，业务逻辑分散在各个选项当中，不利于代码复用和组织代码，vue2中虽然有mixin来进行代码的复用，但使用mixin也有一些问题，比如数据来源不清晰，有可能命名冲突，采用组合式api可以将重复的逻辑封装成hook
[使用组合式API替换mixins](https://blog.csdn.net/qq_38998250/article/details/128851970)

## 组合式api和react hooks的异同点
都是为了不创建类的情况能在组件中使用状态、副作用等一些东西，实现我们之前在类中才能使用到的一些功能。react hook有严格的顺序并且不能写在条件分支上，而组合式api不限制顺序，也可以写在条件分支上
[Vue3 中组合式API 与 React Hooks 的区别是？](https://www.cnblogs.com/gqx-html/p/17449615.html)
## 组合式api的使用
1. ref()
2. reactive()
3. computed(() => {} || {})
	```js
	const count = ref(1)
	const plusOne = computed(() => count.value + 1)
	console.log(plusOne.value) // 2
	plusOne.value++ // 错误
	
	const count = ref(1)
	const plusOne = computed({
	  get: () => count.value + 1,
	  set: (val) => {
	    count.value = val - 1
	  }
	})
	plusOne.value = 1
	console.log(count.value) // 0
	```
4. readOnly()：传入一个对象然后创建一个只读响应式数据，传入的对象可以是普通的或者响应式对象
5. watch(source, callback, options)：监听一个或多个响应式数据，source可以是响应式数据、数组、函数，懒监听只在数据变化时触发回调，可以设置immediate在创建时触发
	```js
	watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
	  /* ... */
	})
	```
6. watchEffect((onCleanUp) => {}, options)：出现在 watchEffect 中的响应式的状态，就会被纳入监听，当响应式状态发生改变时，会自动触发侦听器的逻辑。options.flush可以控制刷新的时机（'pre'在组件渲染前执行，’post‘在组件渲染后执行，'async'响应式数据修改后立即触发)
## ref和reacive的区别
- ref可以定义基本数据类型和对象类型，reactive只能定义对象类型，将一个对象传给ref，对象会通过reactive转为深层次的相应对象(官网说的)
- ref通过.value完全替换掉值任然保留响应式，reactive完全替换掉值会失去响应式
- ref并没有用proxy代理，而是创建一个新对象并设置value的get和set，reactive是通过proxy设置了响应式

## ref为什么要.value
因为ref可以定义基本类型的数据，而proxy方法getter、setter的拦截是针对对象的，所以需要用对象包一层，通过.value去取值，然后定义value的getter、setter就行了
## vue3有哪些改变
1. 响应式数据defineProperty改为了proxy
2. 引入了组合式api
3. 更好的支持了TS，Vue2中如果要用ts要额外安装和配置一些类型定义文件，比较麻烦
4. 更好的支持了tree-shaking，可以生成更小的包
5. 更高效的虚拟dom。静态树提升是指在编译阶段对静态的内容进行优化，并作为静态节点提升到组件setup函数中，该静态节点会作为组件实例的属性，每次渲染的时候直接使用，不会再进行对比和创建新的虚拟dom节点。这个优化技术适合用于静态节点比较多的场景，因为静态提升会增加编译和构建的复杂性，如果都是动态属性反而效率没这么高。

[静态树提升对Vue生态系统的影响和发展](https://blog.csdn.net/m0_49768044/article/details/132548723)

## vue3中对编译做了哪些优化
1. 元素标记，patchFlag，对不同的元素类型进行标记，(二进制向左运算符<<)
2. hoisted，静态节点提升，对于模板中永远不会变化的节点进行提升，如文本节点等。template -> render 中存在diff比对过程，将不会变化的节点进行提升，减少diff 比对，提升性能。
3. BlockTree，找到需要动态比对的节点，转为为Block VNode，BV中会有dynamicChildren。(详细的不阐述，核心也是diff 优化)
4. 对于连续的hostied，这里会进行静态节点"字符串化"，即将连续的静态节点转为一个字符串，后续直接innerHTML挂载，减少大量的VNode的创建，也是很大的一个编译优化。(源码:stringifystatic)

## vue-cli和vite
vite在开发环境是用esbuild来构建依赖的，在生产环境是用rollup进行打包。随便esm得到了广泛的支持，但是由于嵌套导入会导致额外的网络往返，为了在生成环境获得更佳的性能，所以使用了rollup，来进行一些tree-shaking、懒加载、chunk分割
[Vite 基本介绍](https://zhuanlan.zhihu.com/p/382624283)
[vite和esbuild/roolup的优缺点](https://blog.csdn.net/qq_35094120/article/details/129112694)

# 原理
## 响应式原理（数据劫持、观察者模式、vue2和vue3中实现的不同）
1. Vue2原理实现
vue定义响应式数据是通过observe方法来实现，调用改方法会返回一个Observer实例，创建实例的时候会判断是对象还是数组，如果是对象则调用walk方法，数组则调用observeArray方法，walk方法会去循环对象的keys，然后调用defineReactive方法，该方法其实就是使用defineProperty方法定义该属性的getter和setter，getter中会判断静态变量Dep.target是否存在(该值是一个Watcher实例)，这个观察者实例会将响应式数据的dep实例存到newDeps数组，也会将它本身存到响应式数据dep的subs数组中，深层的数据也会将这个Dep.target存一遍，setter中会调用该响应式数据的dep.notify方法，该方法会便利dep.subs中每一个watcher实例去执行update方法，后面会调到patch方法
2. vue3为啥要换成proxy？
definProperty只能对单个属性进行拦截，当处理嵌套层级比较深的对象，需要去递归遍历这个，把每一层的每一个属性都用defineProperty设置成响应式，动态新增删除属性需要通过\$set和$delete，proxy提供了更多的钩子和选项，拦截能力更强，但ie完全不支持proxy，并且vue3的响应式是惰性，也就是proxy并不能对深层次的数据设置响应式，只有用到了才会通过get设置响应式
3. Vue3原理实现
有一个track去专门收集依赖，在vue2中收集的是watcher，vue3中收集的是effect
4. 简略说一下
vue2通过defineProperty去对数据进行劫持，在get的时候会对每一个属性都创建一个依赖收集器dep.subs，当其他地方用到这个属性时就会触发get，然后就将观察者实例收集起来，当数据变更时会触发set，这时候会去调用依赖收集器中每一个watcher实例的update方法进行页面的更新。vue3则是通过proxy进行代理，不过proxy只会代理对象的第一层，当触发代理的对象的get方法的时候，会判断获取到的值是否为对象类型，如果是的话会再次通过reactive进行代理
[数据劫持的基本原理](https://blog.csdn.net/ccuucc/article/details/124325558)
[数据劫持](https://blog.csdn.net/qq_41632427/article/details/126256517)
[Watcher和Dep的关系](https://blog.csdn.net/bb_xiaxia1998/article/details/127582651)
[【Vue3】源码解析-响应式原理](https://blog.csdn.net/weixin_44231544/article/details/134685548)
[reactive,effect,ReactiveEffect](https://blog.csdn.net/qq_42531108/article/details/127598506)
## nextTick的原理
其实就是创建一个微任务或者宏任务，并在这个微任务或者宏任务中去执行nextTick的回调。它会有一个回调队列，并且有一个pending，当第一次会设置pendding为true，后续队列执行完后才会重新设置为false。它内部会依次降级去使用promise.then、mutationObserver、setImmediate、setTimeout生成微任务或宏任务
[$nextTick底层原理(详细) - vue篇](https://juejin.cn/post/7314493016497684520?searchId=2024042322304407721945538F6934CE56)
[nextTick实现原理，必拿下!](https://juejin.cn/post/7087866362785169416?searchId=2024042322304407721945538F6934CE56)
## diff算法内容及原理
1. 当数据更新后会产生一个新的虚拟dom，这时候就需要去跟旧的虚拟dom去对比来确保页面正确的更新
	- vue2会采用一种首位双指针的对比方法，让新旧节点头部跟头部、尾部跟尾部、头尾交叉去对比，除此之外还会将旧节点key跟index的映射收集起来，然后用新节点的key去优先查找对比，当有一种情况就是新节点没有key，那就会去遍历每一个旧节点去对比，如果对比成功就会打补丁就行更新并将旧节点设置为undefined，如果实在是没找到对应的节点就直接创建一个新的节点，当旧节点全部都比较完之后剩下的新节点就会创建新节点，如果是新节点对比完那剩下的旧节点会被删除（新旧节点要key、tag相同，data都是有定义或者没定义，input标签还要对比相同才是对比成功）
	- vue3会使用两个while循环去从头和尾开始对比，相同则patch，不同则退出循环，然后会判断新节点或者旧节点是否全部对比完，对比完则会对剩下的新旧节点patch或者unmount，没对比完则会创建一个Map去收集新节点key和下标的映射。然后会根据剩余新节点的长度创建一个数组并将每一个值都设置为0，然后会遍历旧节点去查找新节点的index下标放到刚才的数组里，如果旧节点有key就直接去新节点的映射中查找，旧节点没有key则直接遍历新节点一个个去匹配查找index，实在没有匹配到就调用unmount方法卸载节点，最后会根据数组获取到一个最长递增子序列，然后以这个子序列为参考对乱序的节点进行移动
3. 详细流程：
	- 数据改变后触发setter，然后触发Dep.notify去通知订阅者，然后去调用patch(oldNode, newNode)，这个方法里面会调用sameVnode方法判断是否是同类型标签，如果不是则直接替换，如果是同类标签则调用patchVnode方法，判断新旧虚拟节点是否完全相等，相等直接return，不相等分情况处理：新旧都有文本节点，用新的文本替换旧的文本；oldvnode没有子节点，newvnode有子节点，新增子节点；oldvnode有子节点，newvnode无子节点，删除旧子节点；新旧都有子节点，调用updateChildren对比子节点
	- updateChildren采用首尾指针法，只做同级的比较，先判断头跟头，尾跟尾，旧头跟新尾，旧尾跟新头，然后会将旧节点key跟index的映射收集起来，然后拿新节点头部的key去查找就节点的下标（没key就会去遍历每一个旧节点去对比），找到后会进行对比，对比成功后就会调patchNode去更新，对比失败后就调createElm创建一个新的节点，最后当旧节点先对比完那就将剩余的新节点进行新增，如果新节点先对比完那就将剩余的旧节点删除
	- patchKeyedChildren会数组的最左边开始循环对比，如果新旧节点不一样则退出循环，然后从数组的最右边开始循环对比，遇到不一样的也是退出循环，在之后会判断左边下标i如果大于旧节点的结束下标e1，则会对新节点数组剩余的节点进行patch，如果左边下标i大于新节点的结束下标e2，则会循环剩余的旧节点调unmount方法卸载，如果新旧节点都还有剩余则会创建一个Map去收集新节点key和下标的映射。然后会根据剩余新节点的长度创建一个数组并将每一个值都设置为0，然后会遍历旧节点去key映射查找新节点index，key映射没有再对比type相同找出index并存入数组中，最后会根据数组获取到一个最长递增子序列，然后以这个子序列为参考对乱序的节点进行移动

[vue的diff算法原理](https://blog.csdn.net/weixin_44582045/article/details/121004484)
[vue3源码之diff算法                                                                                                                                                                                                ](https://blog.csdn.net/qq_33396780/article/details/138865043)

- vue2是基于递归的双指针的diff算法，vue3是基于数组的动态规划diff算法，采用了按需更新、静态标记等优化手段
- vue2的diff算法会对整个组件树进行完整的遍历和比较，vue3会跳过静态子树的比较，只对动态节点进行更形，
- vue2对于列表渲染(v-for)时的元素重新排列会比较低效，需要给每个元素设置唯一的key来提高性能，vue3的diff算法在列表渲染时，通过跟踪元素的移动，更好的处理元素的重新排列，不用设置key
- vue3的diff算法对静态节点的处理更加高效，静态节点只在首次渲染时进行处理，后续更新时会跳过对比和更新操作，减少了不必要的计算
[vue2与vue3中diff算法的区别
](https://blog.csdn.net/m0_71125105/article/details/131638076)

## computed的原理
- 它的本质上就是一个惰性观察者实例watcher（创建的时候会传入lazy为true），他会有一个dirty属性判断是否重新计算值，一开始dirty是为true的，但是并不会计算值，只有当有地方用到这个计算属性时，触发到get才会去计算它的值；当这个计算属性所依赖的状态发生变化时就会通知到这个watcher，并重新设置这个dirty为true，然后会判断有没有地方用到这个计算属性，也就是有没有订阅者，有的话才回去重新计算值，并且它做了一个优化，判断新旧值有没有变化，只有变化了才会重新渲染。
- 每一个计算属性都会创建一个watcher，并将计算属性的函数会存在watcher的getter中，当使用到计算属性的时候，就会拿出对应的watcher判断dirty为true则将watche推入Dep的targetStack栈中，再调getter方法计算值，计算完后watcher会出栈，并将计算的值返回
[vue computed原理](https://blog.csdn.net/weixin_44730897/article/details/123129264)
## watch的原理
会去遍历我们定义的每一个watch，在源码中最终会调用$watch去创建一个watcher，然后加入到组件的_watchers队列里，
[watch/computed的实现逻辑和区别](https://blog.csdn.net/qq_36384657/article/details/137138375)

## 同步代码中多次修改响应式数据会渲染几次，用户setTimeout修改响应式数据会渲染几次
Vue是异步渲染的，数据修改后先存起来再生成一个渲染任务，渲染任务依次考虑用promise.then、mutationObserver、setImmediate、setTimeout生成，会有一个变量pending，pending为false的时候才会去生成微任务

[浅析VUE中的异步渲染机制、nextTick原理及如何改为同步渲染 ](https://www.cnblogs.com/goloving/p/14086357.html)

# 服务端渲染
## 服务端渲染SSR
[Vue SSR服务端渲染改造踩坑指南](https://zhuanlan.zhihu.com/p/137319440)

# Vuex
## vuex的使用（state、mutations、actions、getters、modules）
## vuex的mapState、mapGetter、mapMutations、mapActions

## Vuex的实现原理

[深入了解vuex的实现原理](https://www.php.cn/faq/502523.html)

## 为啥Vuex中要分同步和异步
在Vuex中修改数据的唯一方式是mutation，并且约定不能在mutation中做异步操作，这是为了让状态的变更是可追踪、可预测的，方便在devtools进行调试，如果多个mutation依赖于同一个状态，其中一个mutation是异步的，这会导致其他mutation中用到状态不准确

## vuex和pinia的区别
vuex是集中式状态管理，pinia是采用去中心化的架构，将状态分布在每个模块中
[Vuex和Pinia 的区别是什么](https://blog.csdn.net/GY2077/article/details/131797229)

# Vue-router
## vue-router的使用（路由映射、展示路由、路由跳转、传递参数、多级路由、命名路由）
## 路由生命周期

## 路由守卫（多个守卫执行的顺序）
1. 全局路由守卫
	- router.beforeEach((to, from, next) => next() ) ：前置路由，可以用来做一些权限校验，只有next()才会执行跳转
	- router.afterEach((to, from) =>  ) 后置路由
2. 组件路由守卫
	- beforeRouteEnter:(to,from,next)=>{}： 这里的next跟全局路由的不一样，因为直接在路由守卫中data还没有创建，所以用不了data，使用data需要在next((vm) => {vm.name})回调中使用
	- beforeRouteLeave:(to,from,next)=>{}：离开路由页面前，确认离开需要调用next()
3. 路由独享守卫
	- beforeEnter:(to,from,next)=>{}：用法与全局守卫一致。只是，将其写进其中一个路由对象中，只在这个路由下起作用。
[vue路由守卫哪几种?](https://www.php.cn/faq/463437.html)

## 实现权限校验

## hash和history的区别（实现原理）
- hash：最早使用就是hash，#后面的内容改变不会重新发送请求，只会记录到历史栈中，可以通过浏览器的前进后退进行切换，hash的改变会触发hashChange事件，可以监听这个事件来进行页面的重新渲染
- history：后来html5发布，新增了pushState和replaceState方法，用这两个方法改变url不会向浏览器发起请求，只会修改访问记录栈，当我们调用这两个方法时，会触发popState事件。不过history模式有个缺点，就是当我们进行刷新的时候会重新向服务器发送请求，不在首页的话会报404，所以需要后端配置nginx将其他请求重定向到首页

# 结合TS
## TS如何封装一个组件类型
可以通过defineProps和defineEmits函数来设置组件props属性和事件属性。有两种形式，一种是将类型对象当作入参传入，一种是TS定义类型的方式传入

# Axios
## axios为啥在浏览器和服务器（node）都能运行
axios底层有做判断，如果XMLHttpRequest 存在则表明是浏览器环境，就用XMLHttpRequest ，如果process存在，表明在node环境，会用到node内置的核心模块http
[axios](https://blog.csdn.net/weixin_39808181/article/details/114103504)

## 面试题
[2021年Vue最常见的面试题以及答案](https://blog.csdn.net/qq_44182284/article/details/111191455)

# 跳转
## [前端三板斧（html、css、javascript）](https://blog.csdn.net/qq_43565396/article/details/139072665)
## [React问题积累](https://blog.csdn.net/qq_43565396/article/details/139072810)
## [常用框架问题积累（原生微信小程序、uni-app、taro）](https://blog.csdn.net/qq_43565396/article/details/139072869)
## [工程化问题积累](https://blog.csdn.net/qq_43565396/article/details/139072905)
## [网络、设计模式、算法、后端问题积累](https://blog.csdn.net/qq_43565396/article/details/139072981)
## [技术方案与项目问题积累](https://blog.csdn.net/qq_43565396/article/details/139073029)
## [面试相关积累](https://blog.csdn.net/qq_43565396/article/details/130794769)