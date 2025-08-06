---
title: Mihoyo一面
published: 2025-08-06
description: 2026秋招提前批米哈游前端一面
tags:
  - 面试
  - 米哈游
category: 面试
draft: false
---
- 1.自我介绍
- 2.预检请求是什么，什么时候用到

> 预检请求 “OPTIONS”，在发送可能对服务器数据产生影响的跨域请求之前的询问请求。本质上是浏览器的行为。
> 
> 比如 POST，并且Content-Type: application/json
> 
> 此外，如果有自定义的请求头和身份验证的请求头也会触发


- 3.状态码中，304和403有什么差别

 > 304 Not Modified, 403 Forbidden
 > 
 > 一般来说3xx为重定向，4xx为客户端错误
 > 
 > 401 Unauthorized 和 403的区别在于，401是没有认证，403是认证了，但是权限不够

- 4.tostring和instanceof
- 5.js中如何判断数据类型

> 4,5一起说
> 
> js中，因为历史遗留问题，不能仅仅是typeof来判断数据类型
> 
> 'typeof'：无法区分对象、数组和Null，都返回 'Object'， 适合于判断除了 'null'  以外的原始类型和 'function'
> 
> 'instanceof'： 无法判断原始类型 / iframe时会失效， 适合于判断一个对象是否是某个特定类或其子类的实例
> 
> 'Array.isArray()'：只能判断数组
> 
> 'toString()'：最精确，但需要处理返回的字符串

见下表

| 方法                                     | 优点                  | 缺点                          | 最佳用途                                 |
| -------------------------------------- | ------------------- | --------------------------- | ------------------------------------ |
| **`typeof`**                           | 语法简单，性能高            | 无法区分对象、数组、null；都返回 "object" | 判断除 `null` 之外的所有**原始类型**和 `function` |
| **`instanceof`**                       | 能区分数组、日期等不同类型的对象    | 无法判断原始类型；跨窗口/iframe 时会失效    | 判断一个对象是否是某个**特定类或其子类**的实例            |
| **`Array.isArray()`**                  | 最准确、最推荐的数组判断方法      | 只能判断数组                      | **只用于判断数组**                          |
| **`Object.prototype.toString.call()`** | **最精准、最通用**，能判断所有类型 | 语法稍显繁琐，返回的字符串需要处理           | 编写需要精确判断所有类型的**通用工具函数**              |



- 6.箭头函数和普通函数的区别

> 最核心最主要的区别就是 'this'的指代，对于普通函数，this会根据使用场景变化；对于箭头函数，this永远指向被定义时所在的环境。
> 
> 此外，普通函数可以作为构造函数，使用 ‘new’ 调用； 有内置的 ‘arguments’ 对象。
> 
> 在.map(), .filter(), .setTimeout(), addEventListener() 等场景中，箭头函数可以避免 this指向的混乱

- 6.slice和splice的区别

> 最核心的区别： splice会修改原始数组， slice不会； slice切片， splice剪接
> 
> slice: 提取数组的一部分，返回一个新数组
> 
> splice: 通过删除替换、添加元素来修改原数组

- 7.什么时候会用到this，要注意什么

> 在对象的方法中，函数作为对象的方法被调用时， 'this' 指向该对象；
> 
> 构造函数中，'this' 指向新创建的实例对象
> 
> 函数作为时间监听器中， this指向触发对象的 DOM 元素

> 需要注意： 'this' 的指向是动态的，在运行时决定。不注意容易出现 this 丢失问题
> 
> 如果想要手动绑定this， 可以用 call(), apply(), bind()

```js
function introduce(city, country) {
  console.log(`I am ${this.name}, from ${city}, ${country}.`);
}

const personA = { name: 'David' };
const personB = { name: 'Eva' };

// 使用 call
introduce.call(personA, 'New York', 'USA'); // 输出: "I am David, from New York, USA."

// 使用 apply
introduce.apply(personB, ['Tokyo', 'Japan']); // 输出: "I am Eva, from Tokyo, Japan."

// 使用 bind (常用于事件处理和回调)
const introduceDavid = introduce.bind(personA);
introduceDavid('London', 'UK'); // 输出: "I am David, from London, UK."
```

- 8.js如何实现继承，从原型链的角度
- 9.原型链最终指向

> 原型链最终指向 null，返回undefined
> 
> ES6中，可以通过class，construct，extends，super等关键字实现继承，本质上也是一种语法糖，底层仍然是原型继承
> 
> 原形继承的主要思路：使用构造函数继承来继承父类的实例属性；使用原型链继承来继承父类的原形方法

```js
function Animal(name) {
  this.name = name;
  this.colors = ['black', 'white'];
}

Animal.prototype.eat = function() {
  console.log(this.name + ' 正在吃东西。');
};

function Dog(name, age) {
  // 步骤1: 借用构造函数继承属性
  Animal.call(this, name);
  this.age = age;
}

// 步骤2 (核心优化): 创建一个空对象，其原型指向父类的原型
// 这样就只继承了父类原型上的方法，而没有执行父类的构造函数
Dog.prototype = Object.create(Animal.prototype);

// 步骤3: 修正 constructor 指向
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  console.log(this.name + ' 正在汪汪叫！');
};

const myDog = new Dog('旺财', 3);
myDog.eat(); // 输出: 旺财 正在吃东西。
console.log(myDog instanceof Animal); // true
console.log(myDog instanceof Dog);    // true
```

- 10.css如何实现一个三角形

> 经典的边框法和现代的clip-path法

- 11.bfc是什么，有什么用

> BFC: Block Formatting Context 块级格式化上下文
> 
> 就像是在大房间里放进了一个独立的“玻璃箱”，箱子里面的元素和箱子外不会互相影响，但是箱子本身作为一个整体参与到外面的布局中。

一个元素只要满足**以下任意一个条件**，就会创建 BFC：

1. **根元素** (`<html>`) 本身就是一个 BFC。
2. **浮动元素**：`float` 的值不为 `none`。
3. **绝对定位元素**：`position` 的值为 `absolute` 或 `fixed`。
4. **行内块元素**：`display` 的值为 `inline-block`。
5. **表格单元格**：`display` 的值为 `table-cell`。
6. **`overflow`** 的值不为 `visible`（即 `hidden`, `auto`, `scroll`）。
7. **`display: flow-root;`** (这是**专门**用来创建 BFC 的现代 CSS 属性，没有副作用，是最佳选择)。

在过去，开发者最常用 `overflow: hidden` 来“hack”出一个 BFC，但现在更推荐使用 `display: flow-root`。

> 作用在于：防止外边距折叠；清除浮动；防止元素被浮动元素覆盖

目前主要用来防止外边距折叠

- 12.事件委托是什么

> 举个简单例子，没有事件委托：需要给每一个`<li>`都绑定一个点击事件；事件委托：只需要给父元素`<ul>`绑定一个点击事件。
> 
> 也就是说，不直接将事件监听器绑定在目标元素上，而是将它绑定在这些元素的共同父元素上。

核心原理：**事件冒泡（Event Bubbling）**
在一个元素上触发一个事件的时候，这个事件会从该元素开始，逐级向上传播（冒泡）到它的父元素、祖父元素，一直到`document`和`window`

事件委托正是利用这一特性，在半路（父元素）拦截并处理这个事件。

> 主要解决问题：性能（不需要为每一个子元素都绑定一个事件监听器）；动态元素问题（不需要为每一个新增的子元素再次手动绑定事件）

>缺点/注意事项：不是所有事件都能冒泡（focus、blur、load等事件默认不冒泡）；如果一个父元素内部的子元素之间的事件处理逻辑差异巨大，就没必要使用。


- 13.promise中all和race的区别

> all中，如果有一个promise返回reject，就catch这个reject；只有全部resolve的情况，才会正常返回；
> 
> race返回第一个返回了结果的promise

- 14.项目中的难点

- 15.使用React的时候如何优化

> 内置钩子、函数方面：React.memo包装函数组件，useMemo缓存计算结果， useCallback缓存函数，使用稳定的key

> 不要过度提升状态；避免过大的Context和State

> 代码分割和懒加载：React.lazy和Suspense

- 16.React Fiber的作用

- 17.抽象类和内部类的区别

> 抽象类：半成品蓝图，是什么的继承关系

> 内部类：核心部件，一部分的组织关系