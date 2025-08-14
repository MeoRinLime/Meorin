---
title: 前端面试常见题-JS篇
published: 2025-08-11
description: 收集的前端常见问题和借助Gemini得出的解答
tags:
  - 面试
category: 面试
draft: false
sourceLink: https://www.yuque.com/baiyueguang-rfnbu/tr4d0i/rz15kr
---

Source: [前端常见八股文](https://www.yuque.com/baiyueguang-rfnbu/tr4d0i/rz15kr)

## JavaScript
1. [谈谈对原型链的理解](#谈谈对原型链的理解)
2. [Js 如何实现继承](#js-如何实现继承)
3. [Js 有哪些数据类型](#js-有哪些数据类型)
4. [Js 有哪些判断类型的方法](#js-有哪些判断类型的方法)
5. [如何判断一个变量是否数组](#如何判断一个变量是否数组)
6. [Null 和 undefined 的区别](#null-和-undefined-的区别)
7. [Call bind apply 的区别](#call-bind-apply-的区别)
8. [防抖节流的概念？实现防抖和节流](#防抖节流的概念实现防抖和节流)
9. [深拷贝、浅拷贝的区别？如何实现深拷贝和浅拷贝](#深拷贝浅拷贝的区别如何实现深拷贝和浅拷贝)
10. [对比一下 var、const、let](#对比一下-varconstlet)
11. [ES next 新特性有哪些](#es-next-新特性有哪些)
12. [箭头函数和普通函数区别是什么](#箭头函数和普通函数区别是什么)
13. [使用 new 创建对象的过程是什么样的](#使用-new-创建对象的过程是什么样的)
14. [This 指向系列问题](#this-指向系列问题)
15. [手写 bind 方法](#手写-bind-方法)
16. [谈谈对闭包的理解？什么是闭包？闭包有哪些应用场景？闭包有什么缺点？如何避免闭包](#谈谈对闭包的理解什么是闭包闭包有哪些应用场景闭包有什么缺点如何避免闭包)
17. [谈谈对 js 事件循环的理解](#谈谈对-js-事件循环的理解)
18. [谈谈对 promise 理解](#谈谈对-promise-理解)
19. [手写 Promise](#手写-promise)
20. [实现 Promise.all 方法](#实现-promiseall-方法)
21. [Typescript 中 type 和 interface 的区别是什么](#typescript-中-type-和-interface-的区别是什么)
22. [讲讲 Typescript 中的泛型](#讲讲-typescript-中的泛型)
23. [Typescript 如何实现一个函数的重载](#typescript-如何实现一个函数的重载)
24. [CmmonJS 和 ESM 区别](#cmmonjs-和-esm-区别)
25. [柯里化是什么？有什么用？怎么实现](#柯里化是什么有什么用怎么实现)
26. [讲讲 js 垃圾回收机制](#讲讲-js-垃圾回收机制)
27. [实现一个发布订阅](#实现一个发布订阅)
28. [如何实现数组扁平化](#如何实现数组扁平化)
29. [如何实现数组去重](#如何实现数组去重)



## 谈谈对原型链的理解

当你试图访问一个对象的某个属性（比如 `person.sayHello()`）时：

1. **先在自己身上找**：JavaScript 引擎会先检查 `person` 对象本身有没有 `sayHello` 这个属性。
2. **找不到就去“原型”上找**：如果 `person` 对象自己没有，它就会顺着一个隐藏的链接，去它的“原型对象”（可以理解为它的“父辈”或“蓝图”）上找。
3. **再找不到就继续向上找**：如果原型对象上还是没有，引擎就会沿着原型对象的原型对象（“祖父辈”）继续向上找。
4. **直到终点**：这个寻找过程会一直持续，直到链条的顶端——`Object.prototype`。如果连它都没有，那么就确定这个属性不存在，最终返回 `undefined`。

这个由对象及其原型、原型的原型……组成的**单向链条**，就叫做 **原型链**。

讲清楚原型链，需要理解清楚这三个概念 `__proto__`, `prototype`, `constructor`

#### 1. `prototype` (原型)

- **谁拥有？** **函数**（特指构造函数）。
- **是什么？** 当你定义一个函数时，它会自动获得一个 `prototype` 属性。这个属性是一个**对象**，我们称之为**原型对象**。
- **干什么用？** 这个原型对象就是它所创建的所有实例的“公共储物间”。你可以把所有实例需要共享的属性和方法（比如 `sayHello`）都放在这个对象里，以节省内存。

```js
function Person(name) {
  this.name = name;
}

// Person.prototype 就是那个“公共储物间”
// 我们把 sayHello 方法放进去
Person.prototype.sayHello = function() {
  console.log('Hello, I am ' + this.name);
};

// Person.prototype 是一个对象，它看起来像这样：
// {
//   sayHello: function() { ... },
//   constructor: function Person(...) { ... }
// }

```

#### 2. `__proto__` (隐式原型)

- **谁拥有？** **对象实例**。
- **是什么？** 每一个 JavaScript 对象（`null` 除外）在创建时都会被关联上另一个对象，这个关联就是通过 `__proto__` 属性实现的。它是一个**内部链接**，指向了创建这个对象的构造函数的 `prototype`。
- **干什么用？** 这就是原型链的**实际链接**！当对象实例在自身找不到属性时，就是通过 `__proto__` 这条路去它的原型对象上寻找的。

> **注意**: `__proto__` 是一个非标准的、历史遗留的访问器属性。在现代 JavaScript 中，推荐使用 `Object.getPrototypeOf(obj)` 来读取，使用 `Object.create(proto)` 或 `Object.setPrototypeOf(obj, proto)` 来设置。但为了教学和理解，`__proto__` 更直观。

```js
let alice = new Person('Alice');
let bob = new Person('Bob');

// alice 和 bob 都是由 Person 创建的实例
// 它们的 __proto__ 都指向同一个地方：Person.prototype

console.log(alice.__proto__ === Person.prototype); // true
console.log(bob.__proto__ === Person.prototype);   // true

// 当调用 alice.sayHello() 时：
// 1. alice 自己没有 sayHello。
// 2. 顺着 alice.__proto__ 找到 Person.prototype。
// 3. 在 Person.prototype 上找到了 sayHello 方法，执行它。
alice.sayHello(); // "Hello, I am Alice"

```

#### 3. `constructor` (构造函数)

- **谁拥有？** **原型对象** (`prototype` 对象)。
- **是什么？** 在原型对象中，有一个 `constructor` 属性，它默认指回**拥有该原型对象的构造函数本身**。
- **干什么用？** 主要用于识别对象的类型，或者在某些高级用法中重新创建实例。

```js
console.log(Person.prototype.constructor === Person); // true
console.log(alice.constructor === Person); // true
// (alice 自己没有 constructor，所以顺着 __proto__ 找到了 Person.prototype.constructor)

```


让我们把整个链条拉长，看看继承是如何发生的

```js
// "动物" 构造函数
function Animal(name) {
  this.name = name;
}
Animal.prototype.eat = function() {
  console.log('eating...');
};

// "狗" 构造函数
function Dog(name, breed) {
  Animal.call(this, name); // 继承属性
  this.breed = breed;
}

// 关键一步：实现原型继承
// 创建一个新对象，这个新对象的 __proto__ 指向 Animal.prototype
// 然后让 Dog.prototype 指向这个新对象
// 下面代码等效于 Dog.prototype.__proto__ = Animal.prototype
Dog.prototype = Object.create(Animal.prototype);

// 修复 constructor 指向
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  console.log('Woof! Woof!');
};

let myDog = new Dog('Buddy', 'Golden Retriever');

```

现在，我们来分析 `myDog` 的原型链：

1. **`myDog` 实例**: 拥有 `name` 和 `breed` 属性。
    - `myDog.__proto__` 指向 `Dog.prototype`。
2. **`Dog.prototype`**: 拥有 `bark` 方法和 `constructor` 属性。
    - `Dog.prototype.__proto__` 指向 `Animal.prototype` (因为 `Object.create`)。
3. **`Animal.prototype`**: 拥有 `eat` 方法和 `constructor` 属性。
    - `Animal.prototype.__proto__` 指向 `Object.prototype` (所有对象默认的最终原型)。
4. **`Object.prototype`**: 拥有 `toString()`, `hasOwnProperty()` 等通用方法。
    - `Object.prototype.__proto__` 指向 `null`。**这是原型链的终点。**

**当调用 `myDog.eat()` 时，寻宝之旅开始：**

1. 在 `myDog` 上找 `eat`？没有。
2. 顺着 `myDog.__proto__` 找到 `Dog.prototype`，在上面找 `eat`？没有。
3. 顺着 `Dog.prototype.__proto__` 找到 `Animal.prototype`，在上面找 `eat`？**找到了！** 执行它。

ES 6 中的 class 语法本质上就是原型链的语法糖，我们可以用 class 语法来重写上面那一段代码

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  eat() {
    console.log('eating...');
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // 等同于 Animal.call(this, name)
    this.breed = breed;
  }
  bark() {
    console.log('Woof! Woof!');
  }
}

let myDog = new Dog('Buddy', 'Golden Retriever');

```

## Js 如何实现继承
见上

## Js 有哪些数据类型

|    分类    | 数据类型        | 描述                  | 示例                         | `typeof` 返回值             |
| :------: | ----------- | ------------------- | -------------------------- | ------------------------ |
| **基本类型** | `String`    | 文本字符串               | `"hello"`                  | `"string"`               |
|          | `Number`    | 数字、`NaN`、`Infinity` | `123`, `NaN`               | `"number"`               |
|          | `Boolean`   | 逻辑值                 | `true`, `false`            | `"boolean"`              |
|          | `Undefined` | 已声明但未赋值             | `let a;`                   | `"undefined"`            |
|          | `Null`      | 有意设置的空值             | `let a = null;`            | `"object"` (历史bug)       |
|          | `Symbol`    | 独一无二的值              | `Symbol('id')`             | `"symbol"`               |
|          | `BigInt`    | 任意精度整数              | `99n`                      | `"bigint"`               |
| **对象类型** | `Object`    | 键值对的集合              | `{}`, `[]`, `function(){}` | `"object"`, `"function"` |

### 如何检测数据类型？

- **`typeof`**: 最常用，但对 `null` 和具体对象类型（如 `Array`）有局限性。
- **`instanceof`**: 用于检测一个对象是否是某个构造函数的实例，可以区分数组和对象。
- **`Object.prototype.toString.call()`**: 这是最准确、最推荐的通用检测方法。
- **`Array.isArray`**: 用于判断是否为数组，返回布尔值

```js
Object.prototype.toString.call("hello"); // "[object String]"
Object.prototype.toString.call(123);     // "[object Number]"
Object.prototype.toString.call(true);    // "[object Boolean]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(null);      // "[object Null]"
Object.prototype.toString.call([]);        // "[object Array]"
Object.prototype.toString.call({});        // "[object Object]"
Object.prototype.toString.call(function(){}); // "[object Function]"

```

## Js 有哪些判断类型的方法
见上

## 如何判断一个变量是否数组
见上

## Null 和 undefined 的区别

- `undefined` 通常是 JavaScript 引擎自动赋予的，表示“缺少值”。
- `null` 通常是开发者手动设置的，表示“有意为空”。
- 一个有趣的怪癖：`typeof undefined` 返回 `"undefined"`，而 `typeof null` 返回 `"object"`。这是一个历史遗留的 bug。

## Call bind apply 的区别

共同点：**改变函数内部 this**的指向

### 一句话总结

- **`call`** 和 **`apply`**：立即执行函数，区别在于传参方式。`call` 像打电话，挨个报参数；`apply` 像打包，把参数放进一个数组里。
- **`bind`**：不立即执行函数，而是返回一个**绑定了新 `this` 的新函数**，像一个“预约”或“模板”，可以稍后调用。

| 特性       |     `call()`      |       `apply()`       |       `bind()`        |
| -------- | :---------------: | :-------------------: | :-------------------: |
| **执行时机** |     **立即执行**      |       **立即执行**        |   **不立即执行**，返回一个新函数   |
| **参数传递** |      逐个传递参数       |     将参数作为**数组**传递     |  逐个传递参数（可在绑定时或调用时传）   |
| **返回值**  |      函数的执行结果      |        函数的执行结果        | 一个绑定了 `this` 的**新函数** |

我们先准备一个对象和一个函数来方便演示

```js
const person = {
  name: 'Alice'
};

function sayHello(greeting, punctuation) {
  console.log(`${greeting}, my name is ${this.name}${punctuation}`);
}

// 直接调用，this 指向全局对象 (window in browser, undefined in strict mode)
sayHello('Hi', '!'); // "Hi, my name is !" (在浏览器非严格模式下)

```

#### 1. `Function.prototype.call()`

**语法**：`func.call(thisArg, arg1, arg2, ...)`

- `thisArg`: 函数执行时内部 `this` 的指向。
- `arg1, arg2, ...`: 传递给函数的参数，必须**逐个列出**。

```js
// 使用 call
sayHello.call(person, 'Hello', '.');
// 输出: "Hello, my name is Alice."

// 解释：
// 1. sayHello 函数被立即执行了。
// 2. 函数内的 this 指向了第一个参数 person 对象。
// 3. 'Hello' 作为第一个参数 greeting 传入。
// 4. '.' 作为第二个参数 punctuation 传入。

```

#### 2. `Function.prototype.apply()`

**语法**：`func.apply(thisArg, [argsArray])`

- `thisArg`: 函数执行时内部 `this` 的指向。
- `[argsArray]`: 一个**数组或者类数组对象**，包含所有要传递给函数的参数。

```js
// 使用 apply
sayHello.apply(person, ['Hi there', '!!!']);
// 输出: "Hi there, my name is Alice!!!"

// 解释：
// 1. sayHello 函数被立即执行了。
// 2. 函数内的 this 指向了第一个参数 person 对象。
// 3. 数组 ['Hi there', '!!!'] 中的元素被依次作为参数传入函数。

```

#### 3. `Function.prototype.bind()`

**语法**：`func.bind(thisArg, arg1, arg2, ...)`

- `thisArg`: 新函数内部 `this` 的指向。
- `arg1, arg2, ...`: （可选）预先设置的参数，也叫**柯里化 (Currying)**。

```js
// 使用 bind
const boundSayHello = sayHello.bind(person, 'Welcome');

// 1. bind 不会立即执行 sayHello，而是创建并返回了一个新函数 boundSayHello。
// 2. 这个新函数的 this 已经被永久地绑定为了 person。
// 3. 'Welcome' 这个参数也被预先设置好了。

console.log(typeof boundSayHello); // "function"

// 稍后，在需要的时候再调用它
boundSayHello('?'); // 只需要传入剩余的参数
// 输出: "Welcome, my name is Alice?"

```

### 核心使用场景

- **`call` / `apply` 的场景**：
    
    - 需要**立即调用**一个函数，并临时改变其 `this` 指向。
    - **伪数组借用数组方法**：比如 `arguments` 对象或 `NodeList`，它们本身没有 `forEach` 方法，可以借用 `Array.prototype.forEach`

```js
function logArgs() {
  // arguments 是一个伪数组
  Array.prototype.forEach.call(arguments, function(item) {
    console.log(item);
  });
}
logArgs('a', 'b', 'c'); // 依次输出 a, b, c

```

**`bind` 的场景**：

- **回调函数**和**事件处理**：这是 `bind` 最常见的用途。在 `setTimeout`, `addEventListener` 或 React 的事件处理中，回调函数里的 `this` 默认会指向 `window` 或 `undefined`。使用 `bind` 可以确保它指向我们期望的对象。

```js
const button = document.getElementById('myButton');

class Logger {
  constructor() {
    this.count = 0;
  }
  logClick() {
    this.count++;
    console.log(`Button clicked ${this.count} times.`);
  }
}

const logger = new Logger();

// 如果直接用 logger.logClick，回调函数里的 this 会是 button 元素或 window
// button.addEventListener('click', logger.logClick); // 错误！this 指向错误

// 使用 bind 修正 this
button.addEventListener('click', logger.logClick.bind(logger));

```

- **函数柯里化 (Currying)**：创建一个已经预设了部分参数的新函数。

```js
function add(a, b) {
  return a + b;
}
const add5 = add.bind(null, 5); // 创建一个新函数，第一个参数 a 永远是 5
console.log(add5(10)); // 15 (相当于调用 add(5, 10))

```


## 防抖节流的概念？实现防抖和节流

**简单来说：**
- 如果你希望一个动作在用户停止操作后才执行，用**防抖**。
- 如果你希望一个动作在固定时间内最多执行一次，用**节流**。

总结和对比

|特性|防抖 (Debounce)|节流 (Throttle)|
|---|---|---|
|**核心**|将多次触发**合并为一次**|**稀释**触发的频率|
|**执行时机**|在最后一次触发后的 `delay` 时间后执行|在 `delay` 时间内最多执行一次|
|**比喻**|电梯关门（等人进完再关）|技能冷却（固定CD）|
|**结果**|如果事件持续触发，函数**可能永远不会执行**|只要事件持续触发，函数会**周期性地执行**|
|**适用场景**|`resize`, `input` 等，用户操作完成后才需要响应的场景|`scroll`, `mousemove` 等，需要平滑处理高频事件的场景|

**实现**

防抖：

```js
function debounce(func, delay) {
  let timer = null;

  return function(...args) {
    if (timer) {
      clearTimeour(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
      timer = null;
    }, delay)
  }
}
```

节流：

```js
// 定时器版，保证最后一次触发也能够被响应
function throttle(func, delay) {
  let timer = null;

  return function(...args) {
    if (timer) return;
    timer = setTimeout(() => {
      func.apply(this, args);
      timer = null;
    }, delay);
  }
}

// 时间戳版
// 这种方式会在周期的开始立即执行，而不是结束时
function throttle(func, delay) {
  let previous = 0;

  return function(...args) {
    let now = Date.now();
    if (now - previous > delay) {
      func.apply(this, args);
      previous = now;
    }
  }
}
```


## 深拷贝、浅拷贝的区别？如何实现深拷贝和浅拷贝

浅拷贝只复制引用；深拷贝复制一个相同的对象

具体地：
#### 浅拷贝 (Shallow Copy)

- **定义**：只复制对象或数组的**第一层**属性。
- **行为**：
    - 如果属性是**基本类型**（`String`, `Number`, `Boolean`等），则复制其**值**。
    - 如果属性是**对象类型**（`Object`, `Array`等），则复制其**内存地址（引用）**。
- **结果**：新旧对象共享同一个内存地址中的嵌套对象。修改其中一个对象的嵌套内容，会影响到另一个对象。

#### 深拷贝 (Deep Copy)

- **定义**：递归地复制一个对象的所有层级的属性。
- **行为**：创建一个全新的、完全独立的对象，与原始对象没有任何引用关系。
- **结果**：新旧对象完全隔离。修改任何一个，都不会影响另一个。

#### 实现浅拷贝

```js
const original = { 
  name: 'Alice', 
  age: 25, 
  hobbies: ['reading', 'music'] // 这是一个嵌套的对象（数组） 
};

const originalArray = [1, 2, { a: 3}];

// 使用Object.assign()，用于对象
const shallowCopy = Object.assign({}, original)

// 使用扩展运算符，用于对象和数组
const shallowCopyObject = { ...original };
const shallowCopyArray = [ ...originalArray ];

// Array.prototype.slice()，用于数组
const shallowCopyArray = originalArray.slice();

// Array.prototype.concat()，用于数组
const shallowCopyArray = originalArray.concat();

```


#### 实现深拷贝

```js
// JSON.prase(JSON.stringify(obj))，最简单，但是有很多缺点，比如会忽略undefined,Symbol类型的属性，同时不能序列化函数，不能处理循环引用，会把Date对象转化字符串，RegExp转为空对象
const deepCopy = JSON.parse(JSON.stringify(original));

// structuredClone，现代标准API，支持循环引用，但不能克隆函数和Symbol，同时需要注意兼容性
const deepCopy = structuredClone(original);

// lodash的 _.cloneDeep()方法
const deepCopy = _.cloneDeep(original);

// 自己实现
function deepClone(obj, hash = new WeakMap()) {
  // 处理null 或 非对象类型
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 处理Date 和 RegExp
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  // 检查是否已经拷贝过此对象，防止循环引用
  if (hash.has(obj)) return hash.get(obj);

  const newObj = Array.isArray(obj) ? [] : {};

  hash.set(obj, newObj);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = deepClone(obj[key], hash);
    }
  }

  return newObj
}


```


## 对比一下 var、const、let
（你的答案）

## ES next 新特性有哪些


## 箭头函数和普通函数区别是什么

最大的区别是 `this` 指向

| 特性                 | 普通函数 (`function`)         | 箭头函数 (`=>`)                        |
| ------------------ | ------------------------- | ---------------------------------- |
| **`this` 指向**      | **动态的**。谁调用它，`this` 就指向谁。 | **词法的 (静态的)**。它捕获定义时所在作用域的 `this`。 |
| **作为构造函数**         | **可以** (`new`关键字)         | **不可以** (`new`会报错)                 |
| **`arguments` 对象** | **有**，包含所有传入的参数           | **没有**，但可以用 rest 参数 (`...args`) 代替 |
| **语法**             | 较长                        | 非常简洁                               |
| **`prototype` 属性** | **有**                     | **没有**                             |

## 使用 new 创建对象的过程是什么样的

1. 创建一个全新的空对象
2. 链接到原型
3. 绑定 this 并执行构造函数
4. 返回新对象

理解这四个步骤后，你就能明白为什么箭头函数不能用 `new` 了：因为它没有自己的 `this`（无法执行第3步）也没有 `prototype` 属性（无法执行第2步）。

## This 指向系列问题

**`this` 的值是在函数被调用时才确定的，而不是在函数定义时。**（箭头函数除外）

#### 1. 默认绑定 (Default Binding)

**场景**：当一个函数是独立、直接调用的，没有任何修饰。

**`this` 指向**：

- **非严格模式下**：指向全局对象 (`window` in browsers, `global` in Node.js)。
- **严格模式下 (`'use strict'`)**：指向 `undefined`。

```js
function sayHi() {
  console.log(this);
}

sayHi(); // 非严格模式: Window
         // 严格模式: undefined

const obj = {
  name: 'Alice',
  sayHi: function() {
    console.log(this.name);
  }
};

const standaloneSayHi = obj.sayHi;
standaloneSayHi(); // 'this' is lost! 
                   // 非严格模式: this 指向 window, this.name 是 undefined
                   // 严格模式: this 是 undefined, this.name 会报错

```

#### 2. 隐式绑定 (Implicit Binding)

**场景**：当函数作为对象的一个方法被调用时，即通过 `.` 操作符调用。

**`this` 指向**：指向调用该方法的那个对象（`.` 前面的对象）。

```js
const person = {
  name: 'Bob',
  greet: function() {
    console.log(`Hello, I am ${this.name}`);
  }
};

person.greet(); // 'Hello, I am Bob' (greet 由 person 调用，this 指向 person)

const school = {
  name: 'MIT',
  student: person
};

school.student.greet(); // 'Hello, I am Bob' (this 指向 student，也就是 person)

```

#### 3. 显式绑定 (Explicit Binding)

**场景**：当使用 `call()`, `apply()`, 或 `bind()` 方法来调用函数时。

**`this` 指向**：强制指向这些方法的第一个参数。

- **`call(thisArg, arg1, arg2, ...)`**: 立即执行函数，参数逐个传递。
- **`apply(thisArg, [arg1, arg2, ...])`**: 立即执行函数，参数以数组形式传递。
- **`bind(thisArg, arg1, ...)`**: **不立即执行**，而是返回一个**新函数**，这个新函数的 `this` 被永久绑定到了 `thisArg`

```js
function introduce() {
  console.log(`I am from ${this.city}`);
}

const location1 = { city: 'Beijing' };
const location2 = { city: 'Shanghai' };

introduce.call(location1);  // 'I am from Beijing'
introduce.apply(location2); // 'I am from Shanghai'

const introduceFromBeijing = introduce.bind(location1);
introduceFromBeijing(); // 'I am from Beijing' (无论何时何地调用，this 都指向 location1)

```

#### 4. `new` 绑定 (New Binding)

**场景**：当使用 `new` 关键字调用一个函数（构造函数）时。

**`this` 指向**：指向一个新创建的、空的对象实例。

```js
function Car(make) {
  // 1. 在背后创建一个新对象 {}
  // 2. 将 this 指向这个新对象
  this.make = make;
  // 3. 自动返回这个新对象 (this)
}

const myCar = new Car('Tesla');
console.log(myCar.make); // 'Tesla' (this 指向 myCar 实例)

```

#### 箭头函数

箭头函数没有自己的 `this`，他捕获定义时所在上下文的 `this` 值，作为自己的 `this`，且永远无法被改变。

```js
const myObject = {
  name: 'My Object',
  
  // 普通函数，this 由调用方式决定
  regularMethod: function() {
    console.log('Regular method this:', this.name); // 'My Object'
    
    setTimeout(function() {
      // 回调函数应用了“默认绑定”，this 指向 window
      console.log('setTimeout regular this:', this.name); // undefined
    }, 500);
  },
  
  // 箭头函数，this 是词法绑定的
  arrowMethod: function() {
    console.log('Arrow method this:', this.name); // 'My Object'
    
    setTimeout(() => {
      // 箭头函数没有自己的 this，它捕获了外层 arrowMethod 的 this
      // 而 arrowMethod 的 this 指向 myObject
      console.log('setTimeout arrow this:', this.name); // 'My Object'
    }, 1000);
  }
};

myObject.regularMethod();
myObject.arrowMethod();

```

## 手写 bind 方法

在开始写代码前，我们先分析一下原生 `bind` 的功能：

1. `func.bind(thisArg, arg1, arg2, ...)`
2. 它会返回一个**新的函数**（我们称之为 `boundFunc`）。
3. 调用 `boundFunc` 时，`this` 会被永久地设置为 `thisArg`。
4. `bind` 时传入的参数 (`arg1`, `arg2`) 会作为 `boundFunc` 的预设参数。
5. 调用 `boundFunc` 时传入的参数，会接在预设参数的后面。
6. **一个关键的特性**：如果 `boundFunc` 被用作构造函数（通过 `new` 调用），那么 `this` 会指向新创建的实例，而不是 `thisArg`。并且，新实例的原型应该继承自原始函数 `func` 的原型


基础实现

```js
// 这个版本实现了 `bind` 的核心功能：绑定 `this` 和预设参数。
Function.prototype.myBind_v1 = function(thisArg, ...bindArgs) {
  const originalFunc = this;
  return function(...callArgs) {
    return originalFunc.apply(thisArg, [...bindArgs, ...callArgs]);
  }
}
```


为了支持 `new` 操作符，我们需要做两件事：

1. 在返回的函数中判断，它是否被 `new` 调用。一个常见的技巧是使用 `this instanceof fBound`。如果被 `new` 调用，`this` 就是新创建的实例，它会是 `fBound` 的一个实例。
2. 处理原型链。`new boundFunc()` 创建的实例，其原型应该指向 `originalFunc.prototype`，这样才能继承原型上的方法。我们可以使用 `Object.create()` 来实现。

```js
Function.prototype.myBind = function(thisArg, ...bindArgs) {
  const originalFunc = this;

  if (typeof originalFunc !== 'function') {
    throw new TypeError ('');
  }

  const fBound = function(...callArgs) {
    const finalThis = this instanceof fBound ? this : thisArgs;
    return originalFunc.apply(finalThis, [...bindArgs, ...callArgs])'
  }

  if (originalFunc.prototype) {
    fBound.prototype = Object.create(originalFunc.prototype);
  }
  fBound.prototype.constructor = fBound;
  return fBound;
}
```


## 谈谈对闭包的理解？什么是闭包？闭包有哪些应用场景？闭包有什么缺点？如何避免闭包

### 1. 什么是闭包？

关于闭包的定义，有两种常见的说法，一种是理论上的，一种是实践中的。

- 理论定义 (MDN)：闭包（Closure）是函数以及该函数被声明时所在的词法环境（Lexical Environment）的组合。

这个定义比较学术，简单来说就是：一个函数“记住”了它被创建时的环境，即使它在那个环境之外被调用，也能访问到那个环境中的变量。

- 实践定义 (更易理解)：当一个函数能够访问并操作其外部函数作用域中的变量时，即使外部函数已经执行完毕，这个内部函数和它所引用的外部变量的组合就构成了闭包。

### 2. 闭包的应用场景

1. 创建私有变量和方法
2. 函数柯里化（高阶函数）
3. 防抖和节流
4. 循环中的异步问题

### 3. 闭包有什么缺点？

闭包的主要缺点在于**内存消耗**。

- **内存泄漏 (Memory Leak)**：由于闭包会使其外部函数的变量一直保存在内存中，无法被垃圾回收机制回收，如果滥用闭包，或者闭包中引用的对象非常大，就可能导致内存消耗过多，甚至造成内存泄漏。
    
    例如，在一个不再需要的 DOM 元素上绑定了一个闭包事件处理器，而这个闭包又引用了大量的外部变量，那么即使这个 DOM 元素从页面移除了，这些变量和 DOM 元素本身也可能因为事件处理器的引用关系而无法被回收。

### 4. 如何避免闭包 (的缺点)？

1. 及时释放引用
2. 减少不必要的变量捕获
3. 使用现代 JS 特性，比如 let，const 代替 var


## 谈谈对 js 事件循环的理解

#### 为什么我们需要事件循环？

JavaScript 是一门**单线程**语言。这意味着在任何给定时刻，它只能执行一个任务。如果一个任务耗时很长（比如一个复杂的计算或网络请求），那么整个程序就会被阻塞，用户界面会卡住，无法响应任何操作。这显然是不可接受的。

为了解决这个问题，JavaScript 引入了**异步**机制。事件循环就是实现这种异步机制的核心。它允许主线程在等待耗时任务（如 I/O 操作）完成时，继续执行后面的代码，从而保持程序的响应性。


#### 事件循环的核心组成部分

想象一下 JavaScript 的运行环境（比如浏览器）是一个高效的工厂，它有以下几个关键部门：

1. **调用栈 (Call Stack)**：这是 JavaScript 的主工作区，一个“后进先出”（LIFO）的结构。所有同步任务都在这里排队执行。当一个函数被调用，它被推入栈顶；当函数执行完毕，它被弹出。
    
2. **堆 (Heap)**：这是内存分配区，用于存储变量、对象等数据。它与事件循环的直接关系不大，但构成了完整的运行环境。
    
3. **Web APIs (浏览器提供的 API)**：这不是 JS 引擎的一部分，而是浏览器提供的。像 `setTimeout`, `setInterval`, `fetch`, DOM 事件监听等异步操作，在被调用后会立即被移交给 Web APIs 去处理。它们在这里“倒计时”或“等待网络响应”，而不会阻塞调用栈。
    
4. **任务队列 (Task Queue / Callback Queue)**：一个“先进先出”（FIFO）的队列。当 Web APIs 中的异步任务完成后（比如 `setTimeout` 的时间到了，或者 `fetch` 拿到了数据），它们的回调函数（Callback）会被放入这个队列中等待执行。
    
5. **事件循环 (Event Loop)**：这是总调度员。它的工作非常简单但至关重要：**不断地检查调用栈是否为空。如果为空，就去任务队列里取出一个任务（回调函数），并将其推入调用栈中执行。** 这个过程是循环不断的。

上面的模型解释了基本的异步流程，但要精确理解执行顺序，我们必须引入**宏任务 (Macro-task)** 和 **微任务 (Micro-task)** 的概念。任务队列实际上被分为了两个：

- **宏任务队列 (Macro-task Queue)**
- **微任务队列 (Micro-task Queue)**

##### 1. 宏任务 (Macro-task)

可以理解为“独立的、较大的工作单元”。

- **常见的宏任务**：
    - `script` (整个脚本的执行)
    - `setTimeout`, `setInterval`
    - `requestAnimationFrame` (浏览器)
    - I/O 操作, UI 渲染

##### 2. 微任务 (Micro-task)

可以理解为“当前任务的附属工作，需要尽快完成”。

- **常见的微任务**：
    - `Promise.then()`, `Promise.catch()`, `Promise.finally()`
    - `process.nextTick` (Node.js 环境，优先级最高)
    - `MutationObserver`

#### 事件循环的精确执行流程

现在，我们可以描述事件循环的完整工作流程了，这是理解所有异步代码执行顺序的关键：

1. **执行一个宏任务**。最开始，这个宏任务就是整个 `<script>` 标签里的代码。
2. 执行过程中，如果遇到同步代码，直接在调用栈中执行。
3. 如果遇到宏任务（如 `setTimeout`），将其回调函数注册到**宏任务队列**。
4. 如果遇到微任务（如 `Promise.then`），将其回调函数注册到**微任务队列**。
5. **当前宏任务执行完毕后**，检查**微任务队列**。
6. **执行并清空所有微任务**。如果在执行微任务的过程中又产生了新的微任务，那么这些新的微任务也会被添加到队列的末尾，并**在本轮**一并执行完毕。
7. 微任务队列清空后，进行一次 UI 渲染（如果需要）。
8. 回到步骤 1，从**宏任务队列**中取出一个任务，开始下一轮循环。

**一句话总结：一次事件循环 = 执行一个宏任务 + 执行所有微任务。**


分析一下下面这一段代码

```js
console.log('script start'); // 1. 宏任务开始

setTimeout(function() {
  console.log('setTimeout'); // 4. 宏任务的回调
}, 0);

new Promise(function(resolve) {
  console.log('promise executor'); // 2. Promise 构造函数是同步的
  resolve();
}).then(function() {
  console.log('promise then'); // 3. 微任务的回调
});

console.log('script end'); // 5. 宏任务继续

```

输出：
```js
script start
promise executor
script end
promise then
setTimeout
```

## 谈谈对 promise 理解

**Promise 是一个对象，它代表了一个异步操作的最终完成（或失败）及其结果值。**
为了解决回调地狱诞生

### Promise 如何工作？

一个 Promise 对象有且只有三种状态，并且状态一旦改变，就永远不会再变（这是 Promise 最重要的特性）。

1. **Pending (进行中)**：初始状态，既不是成功，也不是失败。你刚拿到取餐牌，咖啡还在做。
2. **Fulfilled (已成功)**：意味着操作成功完成。店员喊你的号了，咖啡做好了。此时 Promise 有一个**值 (value)**。
3. **Rejected (已失败)**：意味着操作失败。店员告诉你咖啡机坏了。此时 Promise 有一个**原因 (reason)**，通常是一个 Error 对象。

从 `Pending` 状态可以转变为 `Fulfilled` 或 `Rejected`，但不能逆转。这个过程被称为 **Settled (已敲定)**。

#### 核心方法：`.then()`, `.catch()`, `.finally()`

你拿着取餐牌（Promise 对象），可以通过以下方法来定义当咖啡做好或做坏时，你该做什么。

- **.then(onFulfilled, onRejected)**: 这是 Promise 最核心的方法。
    
    - `onFulfilled`: 当 Promise 状态变为 `Fulfilled` 时被调用，接收成功的值作为参数。
    - `onRejected`: (可选) 当 Promise 状态变为 `Rejected` 时被调用，接收失败的原因作为参数。
- **.catch(onRejected)**: 专门用来处理 `Rejected` 状态，是 `.then(null, onRejected)` 的语法糖，让错误处理更清晰。
    
- **.finally(onFinally)**: 无论 Promise 最终是 `Fulfilled` 还是 `Rejected`，`finally` 中的回调函数都会被执行。非常适合做一些清理工作，比如隐藏 loading 动画。
    

#### 关键特性：链式调用 (Chaining)

`.then()` 或 `.catch()` 方法执行后，会**返回一个新的 Promise 对象**。这使得我们可以像链条一样把多个异步操作串联起来，解决了回调地狱的问题。

**用 Promise 改造回调地狱：**

```js
step1()
  .then(result1 => {
    return step2(result1); // 返回一个新的 Promise
  })
  .then(result2 => {
    return step3(result2); // 返回一个新的 Promise
  })
  .then(result3 => {
    console.log(result3);
  })
  .catch(error => {
    // 任何一步出错，都会被这个 catch 捕获
    console.error('出错了:', error);
  });

```

#### Promise API

Promise 提供了一些非常有用的静态方法来处理多个 Promise 的组合场景。

- **`Promise.all(iterable)`**: 并行执行多个 Promise，**全部成功**才算成功。
    
    - 接收一个 Promise 数组。
    - 返回一个新的 Promise，当所有 Promise 都 `Fulfilled` 后，它会 `Fulfilled`，结果是一个包含所有 Promise 结果的数组。
    - 只要有一个 Promise `Rejected`，它就会立即 `Rejected`，并返回第一个失败的原因。
    - **场景**：同时加载多个互相不依赖的资源，等全部加载完再进行下一步。
- **`Promise.race(iterable)`**: “赛跑”，**第一个 settled** 的 Promise 决定最终结果。
    
    - 只要有一个 Promise `Fulfilled` 或 `Rejected`，它就会立即用那个 Promise 的结果来 `Fulfilled` 或 `Rejected`。
    - **场景**：给一个请求设置超时。比如 `Promise.race([fetch(url), timeoutPromise])`。
- **`Promise.allSettled(iterable)`**: 等待所有 Promise 都 **settled** (无论是成功还是失败)。
    
    - 它永远不会 `Rejected`。
    - 返回的 Promise 在所有 Promise 都 settled 后会 `Fulfilled`，结果是一个描述每个 Promise 结果的对象数组 `{status: 'fulfilled', value: ...}` 或 `{status: 'rejected', reason: ...}`。
    - **场景**：你需要知道一组异步操作中每一个的结果，而不管它们是否成功。
- **`Promise.any(iterable)`**: **第一个成功**的 Promise 决定最终结果。
    
    - 只要有一个 Promise `Fulfilled`，它就会立即 `Fulfilled`。
    - 只有当所有 Promise 都 `Rejected` 时，它才会 `Rejected`。

### Await 和 async

`async/await` 是在 ES2017 中引入的，它被誉为“异步编程的终极解决方案”。但它的本质就是 **Promise 的语法糖**。

```js
// Promise.then 写法
function fetchData() {
  return fetch('api/data').then(res => res.json());
}

// async/await 写法 (更像同步代码，更易读)
async function fetchDataAsync() {
  try {
    const response = await fetch('api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('获取数据失败:', error);
  }
}

```

## 手写 Promise


## 实现 Promise.all 方法

```js
function myAll(promises) {
  return new Promise((resolve, reject) => {
    if (!promises || !Array.isArray(promises)) {
      return reject(new TypeError(''));
    }

    const promisesArray = Array.from(promises);//  可以接受一个可迭代或类数组的值，并从中获取一个“真正的”数组
    const results = new Array(promises.length);
    let completedCount = 0;
    
    promisesArray.forEach((promise, index) => {
      Promise.resolve(promise).then(
        value => {
          results => {
            results[index] = value;
            completedCount++;
            if (completedCount === promisesArray.length) {
              resolve(results);
            }
          }
        },
        reason => {
          reject(reason);
        }
      )
    })
  })

}
```

## Typescript 中 type 和 interface 的区别是什么

- **`interface`** 主要用于**描述数据结构（如对象、类）的“形状”**，并且是“开放的”，可以被合并声明。可以把它想象成一份**蓝图或合同**。
- **`type`** 是一个更通用的**类型别名**，它可以表示任何类型，包括联合类型、交叉类型、元组、原始类型等。可以把它想象成一个**标签或别名**。

### 核心差异详解

#### 1. 声明合并 (Declaration Merging) - `interface` 的独有特性

```js
interface User {
  name: string;
}

interface User {
  age: number;
}

// User 接口现在同时拥有 name 和 age 属性
const user: User = {
  name: "Alice",
  age: 30,
};

type Point = {
  x: number;
};

// 错误: Duplicate identifier 'Point'.
type Point = {
  y: number;
};


```

#### 2. 定义非对象类型 - `type` 的优势

```js
// 联合类型
type Status = "success" | "error" | "pending";

// 原始类型别名
type UserID = string;

// 元组
type NameAndAge = [string, number];

// 函数类型
type GreetFunction = (name: string) => void;

```

#### 3. 扩展 (Extending)

两者都可以扩展，但语法和方式不同。

```js
// interface 使用 extends实现扩展
interface Animal {
  name: string;
}

interface Dog extends Animal {
  bark: () => void;
}

const myDog: Dog = { name: "Buddy", bark: () => console.log("Woof!") };

// type 通过 & 实现合并，达到类似“扩展”的效果
type Shape = {
  color: string;
};

type Circle = Shape & {
  radius: number;
};

const myCircle: Circle = { color: "red", radius: 10 };

```

#### 4. 实现 (Implements)

类可以 `implements` 一个 `interface` 来确保它满足接口的“合同”。虽然不那么常见，但类也可以 `implements` 一个 `type`（只要这个 `type` 定义的是一个对象结构）。

```js
interface ICar {
  drive(): void;
}

class MyCar implements ICar {
  drive() {
    console.log("Driving...");
  }
}

// 同样可以工作
type TCar = {
  drive(): void;
};

class YourCar implements TCar {
  drive() {
    console.log("Driving...");
  }
}

```


### 使用建议：何时使用 `interface`，何时使用 `type`？

这是一个在社区中长期存在讨论的话题，但目前已经形成了一些广泛接受的最佳实践。

**优先使用 `interface` 的场景：**

1. **定义对象的形状或类的结构时**：这是 `interface` 的本职工作，其语法更清晰，意图更明确。
2. **需要利用声明合并特性时**：例如，当你想为第三方库（如 Express 的 `Request` 对象）添加自定义属性时，`interface` 是唯一的选择。

**优先使用 `type` 的场景：**

1. **定义联合类型、元组、或任何非对象类型时**：这是 `type` 的独有优势。
2. **需要使用映射类型或条件类型等高级类型操作时**：`type` 在类型编程方面能力更强。
3. **当你只想给一个已存在的类型起一个别名时**：`type` 的语义“类型别名”更贴切。

#### 团队协作和一致性原则

- **官方建议**：TypeScript 团队的官方文档和一些核心成员曾经建议：“**在定义公共 API 的形状时使用 `interface`，因为它能更好地模拟软件工程中的‘合同’概念。而在需要使用联合类型或元组等 `type` 独有特性时，再使用 `type`。**”
- **一致性是关键**：在一个项目中，最重要的原则是保持一致。如果你的团队决定优先使用 `type`，那就坚持下去（除非遇到必须用 `interface` 的声明合并场景）。反之亦然。

**总结一下我的个人建议：**

> **用 `interface` 来描述数据结构（对象、类），用 `type` 来进行类型操作（联合、交叉、映射等）。**


## 讲讲 Typescript 中的泛型
（你的答案）

## Typescript 如何实现一个函数的重载
（你的答案）

## CmmonJS 和 ESM 区别
（你的答案）

## 柯里化是什么？有什么用？怎么实现
（你的答案）

## 讲讲 js 垃圾回收机制
（你的答案）

## 实现一个发布订阅
（你的答案）

## 如何实现数组扁平化

新标准（ES2019）提供了原型方法`Array.prototype.flat()`

```js
const nestedArray = [1, [2, 3], [4, [5, 6, [7]]], 8];

// 1. 扁平化一层
const flattenedOnce = nestedArray.flat();
console.log(flattenedOnce); // [1, 2, 3, 4, [5, 6, [7]], 8]

// 2. 完全扁平化
// 传入 Infinity 作为参数可以展开任意深度的嵌套数组
const fullyFlattened = nestedArray.flat(Infinity);
console.log(fullyFlattened); // [1, 2, 3, 4, 5, 6, 7, 8]

```

手写

```js

// 使用递归实现
function flattenArray(arr) {
	let result =[];

	arr.forEach(item => {
		if (Array.isArray(item)) {
			result = result.concat(flattenArray(item));
		} else {
			result.push(item);
		}
	});
	
	return result;
}

// 使用reduce实现
function flattenArray(arr) {
	return arr.reduce((acc, val) => {
		return acc.concat(Array.isArray(val) ? flattenArray(val) : val);
	}, []);
}

```


## 如何实现数组去重

```js
// 用 Set
function uniqueArray(arr) {
	const set = new Set(arr);
	return Array.from(set);
}

// 用filter + indexOf
function uniqueArray(arr) {
	return arr.filter((item, index) => {
		return arr.indexOf(item) === index;
	});
}


// for + 哈希表
function uniqueArray(arr) {
	const result = [];
	const map = {};

	for (let i = 0; i < arr.length; i++) {
		const item = arr[i];
		const key = typeof item + JSON.stringify(item);
		if (!map[key]) {
			result.push(item);
			map[key] = true;
		}
	}

	return result;

}


// reduce
function uniqueArray(arr) {
	return arr.reduce((acc, curr) => {
		if (!acc.includes(curr)) acc.push(curr);
		return acc;
	}, [])
}


// 特殊的，对对象数组去重

function uniqueArray(arr, key) {
	const map = new Map();
	arr.forEach(item => {
		if (!map.has(item[key])) {
			map.set(item[key], item);
		}
	});
	return Array.from(map.values());
}

```


