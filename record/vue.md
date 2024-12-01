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
1. 定义指令
	- 全局注册Vue.directive(name, options)
	- 局部注册，跟data等同级directives({ name: options })
2. options参数，里面都是一些类似生命周期的钩子
```js
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode) {}
}
```
3. 钩子中的参数
	- el：指令绑定到元素，可以用来直接操作dom
	- binding
		- value：传递给指令的值。例如在 v-my-directive="1 + 1" 中，值是 2。
		- oldValue：之前的值，仅在 beforeUpdate 和 updated 中可用。无论值是否更改，它都可用。
		- arg：传递给指令的参数 (如果有的话)。例如在 v-my-directive:foo 中，参数是 "foo"。
		- modifiers：一个包含修饰符的对象 (如果有的话)。例如在 v-my-directive.foo.bar 中，修饰符对象是 { foo: true, bar: true }。
		- instance：使用该指令的组件实例。
		- dir：指令的定义对象
	- vnode：代表绑定元素的底层 VNode。
	- prevVnode：代表之前的渲染中指令所绑定元素的 VNode。仅在 beforeUpdate 和 updated 钩子中可用
4. 注意： 只有当所需功能只能通过直接的 DOM 操作来实现时，才应该使用自定义指令。其他情况下应该尽可能地使用 v-bind 这样的内置指令来声明式地使用模板，这样更高效，也对服务端渲染更友好

## 用delete和Vue.delete删除数组有什么区别
delete是将数组对应下标设置为empty或者undefined，并不会改变数组长度和触发响应式更新，Vue.delete是将对应下标的数据彻底删除，数组长度会改变并且会触发响应式更新
## MVVM和MVC的区别
- MVC和MVVM这些设计模式都是为了使视图跟数据职责分离，减少耦合
- 其中MVC最早的话是出现在后端，当视图有改变的时候会通过controller去修改数据，数据变更了后会通知view进行更新，视图跟模型是存在耦合，视图是能直接访问模型的
- MVVM的视图和模型是完全解耦的，视图由更新的话通过viewmodel绑定的事件去更新数据，数据有变化的话也通过viewmodel更新到视图，其最主要的通过实现一套响应式机制去自动更新视图，避免了大量dom操作，使得开发人员只用关注业务逻辑，提高了开发效率

[MVC，MVP和MVVM架构解析](https://blog.csdn.net/java521666/article/details/126054377)
## 自定义组件双向数据绑定
1. v-model：vue2中使用model指定v-model传入的数据名和触发事件名，默认是value和input事件，只能声明一个，vue3中使用defineProps和defineEmits去指定，可以声明多个
2. v-bind:xxx.sync：实际上传入的是xxx和update:xxx，可以声明多个，xxx可以是对象，如果是对象则会将对象中的每一个属性都设置一个单独的update:xxx事件
```html
<!-- 父组件中 -->
<UserName
  v-model="name"
  :firstName.sync="first"
  :lastName.sync="last"
/>
```
v-model标签在组件中其实相当于传入了一个modelValue的参数跟一个update:modelValue的事件
```js
<script>
export default {
  props: {
    xxxValue: String,
    first: String,
    last: String
  },
  model: {
	prop: 'xxxValue', // 随便取名，只要跟props中一样就行，默认value
	emit: 'change' // 也是随便取名，默认input
  },
}
</script>

<template>
  <input
    type="text"
    :value="xxxValue"
    @input="$emit('change', $event.target.value)"
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
vue3中采用组合式api defineProps和defineEmit来声明props和emit(v3.4前)，v3.4后推荐使用的方式是defineModel()宏，defineModel返回的是一个ref，它可以像其他ref一样修改和访问，它的`.value`和父组件的`v-model`值同步，意味着它的值改变后父组件的值也会更新
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
[v-model与.sync的区别](https://blog.csdn.net/gkx19898993699/article/details/133777090)
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
## 混入规则

## 组件之间的参数传递，兄弟组件怎么传
- props/emit，\$parent/\$children，provide/inject，$ref，Vuex
- 父组件作为中介进行传递、Vuex、事件总线$bus
- vue3中defineProps/defineEmit、子组件中使用defineExpose将数据和方法暴露，父组件通过设置ref属性可以获取到组件实例并使用这些数据和方法，provide/inject方法

## 事件总线
创建一个Vue示例，然后需要用到的地方引入并且用$on订阅事件，在销毁的时候可以通过$off取消订阅，其他组件中可以通过$emit去发布事件

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
3. 更高效的虚拟dom。静态树提升是指在编译阶段对静态的内容进行优化，并作为静态节点提升到组件setup函数中，该静态节点会作为组件实例的属性，每次渲染的时候直接使用，不会再进行对比和创建新的虚拟dom节点。这个优化技术适合用于静态节点比较多的场景，因为静态提升会增加编译和构建的复杂性，如果都是动态属性反而效率没这么高。
4. 生命周期变了，取消了beforeCreate、created，其它在原有api的基础上加个on，并且生命周期api需要进行导入
5. 支持多个根节点
6. 更好的支持了TS，Vue2中如果要用ts要额外安装和配置一些类型定义文件，比较麻烦
7. 更好的支持了tree-shaking，可以生成更小的包
[静态树提升对Vue生态系统的影响和发展](https://blog.csdn.net/m0_49768044/article/details/132548723)

## vue3中对编译做了哪些优化
1. 元素标记，patchFlag，对不同的元素类型进行标记，(二进制向左运算符<<)
2. hoisted，静态节点提升，对于模板中永远不会变化的节点进行提升，如文本节点等。template -> render 中存在diff比对过程，将不会变化的节点进行提升，减少diff 比对，提升性能。
3. BlockTree，找到需要动态比对的节点，转为为Block VNode，BV中会有dynamicChildren。(详细的不阐述，核心也是diff 优化)
4. 对于连续的hostied，这里会进行静态节点"字符串化"，即将连续的静态节点转为一个字符串，后续直接innerHTML挂载，减少大量的VNode的创建，也是很大的一个编译优化。(源码:stringifystatic)

## vue-cli和vite
vite在开发环境是用esbuild来构建依赖的，在生产环境是用rollup进行打包。随着esm得到了广泛的支持，但是由于嵌套导入会导致额外的网络往返，为了在生成环境获得更佳的性能，所以使用了rollup，来进行一些tree-shaking、懒加载、chunk分割
[Vite 基本介绍](https://zhuanlan.zhihu.com/p/382624283)
[vite和esbuild/roolup的优缺点](https://blog.csdn.net/qq_35094120/article/details/129112694)

## 封装过哪些hook
1. 获取字典项的hook，传入字典码值的数组，返回结果数组，使用useEffect执行

# 原理
## new Vue() 做了什么
1. new Vue()其实就是去调它_init（init.js）的一个方法，在这过程中会去初始化一些以下划线和\$开头的属性，会去注册事件和处理插槽等东西，会去调用beforeCreate和create的钩子，在这两个钩子中间会去处理inject、provide和初始化响应式数据方法这些，包括data、props、method、computed、watch这些，其中会做一些重名的校验，例如data不能跟props和methods同名，methods不能跟props同名，最后会去判断有没有el属性，有的话就去调用$mount方法
2. $mount（entry-runtime-with-compiler.js）中首先会对el进行校验，判断el对应的元素不能是body和documentElement文档节点，然后会判断我们参数中有没有render函数，有的话后面就直接用这个render函数去渲染dom树，没有的话就要去通过我们传入的template或者el去转为render函数，其中el是获取它的outerHTML去转render函数的
3. 后面会调到mountComponent方法。该方法里面会判断有没有render方法，如果没有的话就用创建空节点的方法，然后会有beforeMount和mounted的钩子，在这过程中会创建一个观察者示例Watcher，并将更新函数作为参数传进去，更新函数中就会用到render方法（这里用的是_render，但是_render中也是用的$options.render）
4. 在观察者示例中更新函数是会赋值给getter，并且因为不是懒加载，所以创建观察者实例的时候会调用一次getter方法，来触发Vue的渲染
[new vue 实例发生了什么呢？](https://www.cnblogs.com/ifannie/p/12334091.html)
[$mount实现](https://zhuanlan.zhihu.com/p/39685427)
## Vue2响应式原理（数据劫持、观察者模式、vue2和vue3中实现的不同）
1. vue定义响应式数据是通过observe方法来实现，调用该方法会返回一个Observer实例，创建实例的时候会判断是对象还是数组，如果是数组则调用observeArray方法，循环数组的每一项去调用observe方法，对象则调用walk方法，，walk方法会去循环对象的keys，然后调用defineReactive方法，该方法其实就是使用defineProperty方法定义该属性的getter和setter，getter中会判断静态变量Dep.target是否存在(该值是一个Watcher实例)，这个观察者实例会将响应式数据的dep实例存到newDeps数组，也会将它本身存到响应式数据dep的subs数组中，深层的数据也会将这个Dep.target存一遍，setter中会调用该响应式数据的dep.notify方法，该方法会便利dep.subs中每一个watcher实例去执行update方法，后面会调到patch方法
2. vue2为啥不用defineProperty监听数组下标的变更
	- defineProperty其实是可以针对数组下标进行监听的，在使用习惯来说，数组一般长度会很大，如果对每个下标进行劫持会带来性能问题，导致框架的不稳定，所以vue2放弃了劫持数组下标的方式，而是提供了$set方法操作数组
3. vue为什么只重写了push、pop、shift、unshift、splice、sort、reverse方法，没有重写其它方法
	- 因为这些方法比较常用并且会改变原数组，其他方法要么不会改变原数组，要么使用频率很低（fill、copyWithin）
2. vue3为啥要换成proxy？
	- definProperty只能对单个属性进行拦截，当处理嵌套层级比较深的对象，需要去递归遍历这个，把每一层的每一个属性都用defineProperty设置成响应式，动态新增删除属性需要通过\$set和$delete，proxy提供了更多的钩子和选项，拦截能力更强，但ie完全不支持proxy，并且vue3的响应式是惰性，也就是proxy并不能对深层次的数据设置响应式，只有用到了才会通过get设置响应式
[数据劫持的基本原理](https://blog.csdn.net/ccuucc/article/details/124325558)
[数据劫持](https://blog.csdn.net/qq_41632427/article/details/126256517)
[Watcher和Dep的关系](https://blog.csdn.net/bb_xiaxia1998/article/details/127582651)
## Vue3响应式原理
1. vue2vue3都会在get的时候去收集依赖，在vue2中收集的是watcher，vue3中收集的是effect。vue3中收集依赖主要用到的是trackEffects的方法，触发更新用的是triggerEffects的方法
2. ref
	- 首先判断是不是ref实例，是的直接返回，不是的话创建一个refImpl对象，其实就是对传入的值包了一层对象，传入的值赋值到了对象的value中，然后使用defineProperty对value进行劫持，构造函数中会判断是否是对象，对象的话会使用reactive进行代理
3. reactive
	- reactive实质就是用的proxy进行代理，这过程中会判断是否只读，是否是非对象，是否已经是代理对象，这些情况都会直接返回，还会根据传入的对象去代理的集合里面去找看没有没被代理过，如果有则返回代理对象，没有则创建一个代理对象，代理对象会有分集合和非集合，不同类型会有不同的代理逻辑。
	- 非集合的getter中会判断被代理的对象是否是数组，如果是采用数组的方法去获取值，不是的话则通过key获取到值后判断是否浅层响应式，是的话直接返回值，不是的话判断是否是ref类型，是的话判断是否解构返回，再之后会判断是否是对象，是的话会根据是否可读来返回只读数据或者重新用reactive去往下代理。
	- 在返回值之前会对非只读的数据使用track方法去收集依赖,根据被代理对象和被代理对象的key可以获取到该key对应的依赖集，然后把activeEffect收集起来
	- setter中最主要的就是调用trigger触发更新，不过在此之前会判断一种特殊情况，也就是旧值市ref类型，新值不是ref类型，这时候会直接将新值赋值到旧值的value上
	- trigger中会做一些操作的类型判断，判断是新增、删除、修改还是清空，还有判断数组的，收集需要更新的effect，然后会调用triggerEffects方法遍历每一个effect去调scheduler或者run方法
4. 简略说一下
	- vue2通过defineProperty去对数据进行劫持，在get的时候会对每一个属性都创建一个依赖收集器dep.subs，当其他地方用到这个属性时就会触发get，然后就将观察者实例收集起来，当数据变更时会触发set，这时候会去调用依赖收集器中每一个watcher实例的update方法进行页面的更新
	- vue3则是通过proxy进行代理，不过proxy只会代理对象的第一层，当触发代理的对象的get方法的时候，会判断获取到的值是否为对象类型，如果是的话会再次通过reactive进行代理
[【Vue3】源码解析-响应式原理](https://blog.csdn.net/weixin_44231544/article/details/134685548)
[reactive,effect,ReactiveEffect](https://blog.csdn.net/qq_42531108/article/details/127598506)
## nextTick的原理
其实就是创建一个微任务或者宏任务，并在这个微任务或者宏任务中去执行nextTick的回调。它会有一个回调队列，并且有一个pending，当pendding为false的时候就会去开启一个任务并且将pendding设置为true，后续队列执行完后才会重新设置为false。它内部会依次降级去使用promise.then、mutationObserver、setImmediate、setTimeout生成微任务或宏任务
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
[vue3源码之diff算法](https://blog.csdn.net/qq_33396780/article/details/138865043)
- vue2和vue3都是双端比较，vue3做了一些细节的优化，对于有key值的内容会生成一个最大递增子序列来进行最小代价的dom操作
- vue2中会对整个组件树进行完整的遍历和比较，vue3编译的时候会做静态节点的提升，这些节点在更新的时候不会再创建，而是直接复用
- 对于那些静态的内容会预字符串化，也就是转换为字符串，运行的时候可以直接设置为innerHTML，其实我们大部分页面动态的内容都是比较少的，进行静态提升可以说是很大的提升了性能
- vue3还做了一些编译上的优化，也就是block tree，它会将模板编译为多个block(块)，每个block代表模板中一段连续的渲染代码，它会根据这些block生成更高效的渲染代码，例如一些条件判断、循环渲染会生成单独的block
- 在vue3中使用patchflag为动态的内容打上标记，diff对比只对比有patchflag的元素
[vue2与vue3中diff算法的区别](https://blog.csdn.net/qq_42220848/article/details/140442940)
[为什么Vue3比Vue2效率更高！](https://blog.csdn.net/xiaolouuuu/article/details/143500669)
## Vue2 computed的原理
1. 初始化computed的时候会做两件主要的事情，一是把每一个computed都创建为一个观察者实例，并放到vue实例的一个数组中，二是会根据计算属性名去vue实例中用defineproperty去设置属性劫持。
2. 计算属性本质上就是一个惰性观察者实例watcher（创建的时候会传入lazy为true），他会有一个dirty属性判断是否重新计算值，这属性初始化是为true的，还有它里面用到了响应式数据更新了也会设置为true，当进行了计算之后就会设置为false。虽然它初始值为true，但是并不会计算值，只有当有地方用到这个计算属性时，触发到get才会去计算它的值
3. 当这个计算属性所依赖的状态发生变化时就会通知到这个watcher，并重新设置这个dirty为true
4. 然后会判断有没有地方用到这个计算属性，也就是有没有订阅者，有的话才回去重新计算值，并且它做了一个优化，判断新旧值有没有变化，只有变化了才会重新渲染。
5. 每一个计算属性都会创建一个watcher，并将计算属性的函数会存在watcher的getter中，当使用到计算属性的时候，就会拿出对应的watcher判断dirty为true则将watche推入Dep的targetStack栈中，再调getter方法计算值，计算完后watcher会出栈，并将计算的值返回
[vue computed原理](https://blog.csdn.net/weixin_44730897/article/details/123129264)
## Vue3 computed原理
1. 首先判断传入的参数是函数还是对象，函数的话作为getter，对象的话取出get作为getter，取出set作为setter
2. 根据getter和setter去创建一个ComputedRefImpl实例，在这个实例里面实际上创建的就是effect
## watch的原理
会去遍历我们定义的每一个watch，在源码中最终会调用$watch去创建一个watcher，然后加入到组件的_watchers队列里，
[watch/computed的实现逻辑和区别](https://blog.csdn.net/qq_36384657/article/details/137138375)
## 组件事件触发原理
1. 事件最主要的是Vue原型上的$on方法，在初始化的时候会去到组件实例$options参数中的_parentListeners参数去循环使$on去注册事件，当然注册过程中还可能会对一些旧的事件进行对比移除。$on最主要的就是在组件实例中的_events去添加对应名称的事件集，事件集是一个数组，也就是一个事件名称会对应多个事件处理方法。$off方法也就是将_events中对应名称的事件集置为null。$emit方法就是根据事件名称取出事件集进行循环使用apply或者call进行处理。$once也是调用$on去注册事件，不过注册的时候会对事件回调包一层方法，方法里面会执行原回调前(确实是执行前前)调用$off注销事件。
## props和methods的原理
1. props：没做什么很多处理，只是校验了一下prop然后用跟data一样的defineReactive方法去对props每一个属性去实现响应式
2. methods：将方法设置到vue实例中，并用bind给每一个方法绑定this到vue实例
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