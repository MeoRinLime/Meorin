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


> 9.看项目中使用了three.js，为什么要用？用了之后达到了一个什么效果？

> 10.如果想要实现一个3d地球，支持鼠标选择对应国家，怎么做？

three.js提供了一个Raycaster的方法

> 11.（项目相关）现在你是一个需求的owner，比如说需要把OCR的准确率提高，如何量化这个指标，又如何确保上线后更改达到了预期效果


> 12.手撕：实现一个repeat函数，repeat（func，times，wait），每wait时间执行一个func，执行times次，比如repeatConsole = repeat(console.log, 3, 3000), repeatConsole("123")