---
title: 字节TikTok二面
published: 2025-08-19
description: 2026秋招字节TikTok前端二面
tags:
  - 面试
  - 字节
category: 面试
draft: false
---

> 1.js中 0.1 + 0.2等于多少，为什么
> 2.如何解决呢？


> 3.Vue和React有什么差别

|方面|Vue|React|
|---|---|---|
|**核心定位**|渐进式**框架** (Framework)|UI **库** (Library)|
|**语法**|HTML 模板语法 (`v-if`, `v-for`)|JSX (在 JS 中写 HTML)|
|**响应式**|**响应式追踪**，直接修改数据|**状态不可变**，通过 `setState` 替换|
|**API 风格**|Options API (结构化) & Composition API (灵活组合)|Functional Components with Hooks|
|**生态系统**|官方解决方案为主，统一性强|社区驱动，选择极其丰富但碎片化|
|**学习曲线**|相对平缓，对传统 Web 开发者友好|稍陡峭，需要更强的 JavaScript 基础|
|**跨端**|`Uni-app`, `Weex` (社区驱动为主)|`React Native` (官方支持，生态成熟)|

> 4.Vue的双向绑定是如何实现的


[[前端面试常见题-React+Vue篇]]

> 5.为什么Vue2用defineProperty而不用Proxy

简单来说，Vue 2 使用 `defineProperty` 是一个基于当时浏览器环境的、务实的、带有妥协性质的选择。而 Vue 3 转向 `Proxy`，则是在浏览器技术进步后，对响应式系统的一次彻底的、无历史包袱的现代化升级。

> 6.https是如何保证安全的

对称加密+非对称加密+数字证书

对于数据完整性，用校验码（哈希值）来做

> 7.如果服务器证书泄露了会有什么后果

如果证书泄露，但是私钥没有泄露没啥问题，但如果私钥泄露了，就会发生：

- 服务器身份伪造 和 中间人攻击 (Man-in-the-Middle Attack)
- 后果： 用户的所有敏感信息都会被攻击者以明文形式获取，攻击者甚至可以实时篡改双方通信的内容。


> 8.读代码（时间循环+块级作用域+async await）

```js
setTimeout(() => console.log(sum));
async function add (i, j) {
    sum += await (i + j);
}
const p = Promise.resolve();
let sum = 0;
for (let i = j = 0; i < 3; i += 1, ++j) {
    p.then(() => add(i, j));
}
for (var i = 0; i < 3; i++) {
   setTimeout(() => console.log(i), 0);
}
```

```js
参考答案：
5
3 3 3
```

有几个陷阱：

1. 变量声明陷阱: `for (let i = j = 0; ...)`
2. 闭包与 `var` 陷阱: `for (var i = 0; ...)`
3. `await` 与赋值运算符陷阱: `sum += await ...`

第一个for循环中的 `j` 实际上是一个全局变量，所以在第一个for循环结束后的微任务队列实际上是：
`[() => add(0, j), () => add(1, j), () => add(2, j)]`，此时全局 `j` 的值为 3；

 `sum += X` 等价于 `sum = sum + X`。JavaScript 引擎在遇到 `await` 时，会先计算 `await` **右边**的表达式，但也会**立即读取** `await` **左边**表达式中变量的当前值。

- 所以，引擎执行 `sum = sum + await(3)` 时：
    - 它读取了右边 `sum` 的值，**此时 `sum` 是 `0`**。
    - 然后 `await` 暂停了 `add` 函数的执行。
    - 它将一个“恢复任务”（continuation）放入微任务队列的末尾。这个任务的内容可以理解为：“当 `await(3)` 完成后，执行 `sum = 0 + 3`”。

- 继续执行第二个微任务: `() => add(1, j)`
    - 同样，全局 `j` 是 `3`，执行 `add(1, 3)`。
    - 执行 `sum = sum + await(4)`。
    - 引擎再次读取右边 `sum` 的值，**此时 `sum` 仍然是 `0`**（因为上一个任务的赋值操作还没执行）。
    - `await` 暂停函数，并将“恢复任务”放入微任务队列：“当 `await(4)` 完成后，执行 `sum = 0 + 4`”。

- 然后执行第三个微任务: `() => add(2, j)`
    - 执行 `add(2, 3)`。
    - 执行 `sum = sum + await(5)`。
    - 引擎读取右边 `sum` 的值，**`sum` 依然是 `0`**。
    - `await` 暂停函数，并将“恢复任务”放入微任务队列：“当 `await(5)` 完成后，执行 `sum = 0 + 5`”。

现在，sum 仍然是 0，微任务队列如下：
`[ (sum = 0 + 3), (sum = 0 + 4), (sum = 0 + 5) ]`

所有微任务执行完成后，得到sum = 5


> 9.看项目中使用了three.js，为什么要用？用了之后达到了一个什么效果？

> 10.如果想要实现一个3d地球，支持鼠标选择对应国家，怎么做？

three.js提供了一个Raycaster的方法

> 11.（项目相关）现在你是一个需求的owner，比如说需要把OCR的准确率提高，如何量化这个指标，又如何确保上线后更改达到了预期效果


> 12.手撕：实现一个repeat函数，repeat（func，times，wait），每wait时间执行一个func，执行times次，比如repeatConsole = repeat(console.log, 3, 3000), repeatConsole("123")