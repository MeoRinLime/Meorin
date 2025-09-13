---
title: 腾讯基础微信团队一面
published: 2025-09-11
description: 2026秋招腾讯 CSIG ima 团队前端一面
tags:
  - 面试
  - 腾讯
category: 面试
draft: false
---

> 1.介绍项目


> 2.echarts和three.js的实现原理是什么？实现echarts之类的数据可视化功能，除了canvas还有什么？

echarts主要是canvas和svg；

three.js是WebGL

> 3.项目中大模型相关的SSE是怎么做的？

用EventSrouce API，单向，持续，基于HTTP；

主要提供了三个事件监听器： `onopen`, `onmessage`, `onerror`

> 4.Websocket中1xx相关的状态码代表什么意思


> 5.tailwind和其他样式方案的区别


> 6.缓存和懒加载是怎么实现的？不使用lazy这个属性来实现懒加载，怎么做？控制缓存的http头有哪些


> 7.事件循环机制，nodejs和浏览器环境的有什么区别

浏览器环境有UI渲染相关的rAF，nodejs环境中主要分六个阶段：

1. **timers (计时器阶段):** 执行 `setTimeout()` 和 `setInterval()` 的回调。
2. **pending callbacks (待定回调):** 执行上一次循环中被延迟的 I/O 回调（非常规，可忽略）。
3. **idle, prepare (仅内部使用):** 仅 libuv 内部使用。
4. **poll (轮询阶段):** **这是最重要的阶段**。
    - 检索新的 I/O 事件（如网络请求、文件读写）。
    - 执行与 I/O 相关的回调（几乎所有回调都在这里执行，除了 timers, setImmediate, close callbacks）。
    - 如果 timers 队列中有任务，会在这里等待指定的时间。
    - 如果没有其他任务，事件循环可能会在此阶段**阻塞**等待新的 I/O 事件。
5. **check (检查阶段):** 执行 `setImmediate()` 的回调。
6. **close callbacks (关闭回调):** 执行一些关闭类型的回调，如 `socket.on('close', ...)`。

> 8.路由的实现有什么方案，react router是如何实现的？history方案是基于哪些api，hash方案的监听是基于哪个api

history模式主要是 `pushState` 和 `replaceState` 这两个API，hash模式主要是 `onHashChange`

> 9.手撕：节流，分割银行卡号；判断是否为对称二叉树