---
title: 腾讯WXG一面
published: 2025-07-31
description: 2026秋招提前批腾讯WXG前端一面
tags:
  - 面试
  - 腾讯
category: 面试
draft: false
---

>1.react和vue，数据变化如何通知dom变化；

**React**
React中的数据流是单向的，比较被动。只有相关的数据，比如调用了setState之后，可能发生变化，而后通过虚拟DOM之间的比较来找到差异，更新真实DOM；

**Vue**
Vue2通过defineProperty，Vue3通过Proxy主动监听数据。一旦数据被修改，就能够精确地知道哪一些DOM结点是依赖的这一些数据，然后只更新相关的节点。

### 核心差异对比

|特性|React|Vue|
|---|---|---|
|**核心思想**|**不可变性 (Immutability)**：状态是不可变的，通过创建新状态来触发更新。|**响应式 (Reactivity)**：状态是可变的，框架会自动侦测变化。|
|**变化侦测**|**VDOM Diff**：调用 `setState` 后，对比新旧 VDOM 树。|**依赖追踪**：通过 `Proxy` (Vue 3) 或 `Object.defineProperty` (Vue 2) 追踪依赖。|
|**更新粒度**|**组件级别**：默认从组件根节点开始 Diff。|**依赖级别**：精确到数据依赖的模板部分。|
|**触发方式**|**手动**：必须调用 `setState` 或 Hooks 的 `set` 函数。|**自动**：直接修改数据即可触发。|
|**开发者体验**|**更明确**：开发者需要明确地管理状态更新的“时机”。|**更便捷**：开发者只需修改数据，更新是“透明”的。|
|**性能优化**|依赖开发者手动优化，如 `memo`, `useCallback`, `shouldComponentUpdate`。|开箱即用的性能通常很好，因为更新是精确的。|


>2.react query的缓存和重试机制如何实现；


缓存：queryKey、staleTime、cacheTime
重试：retry、retryDelay

在staleTime期间，不会触发新的网络请求；如果超过staleTime，会首先从缓存中返回这个数据（使得UI可以立即渲染），然后在后台静默地调用新的网络请求，在返回后自动更新渲染。

cacheTime意味着当一个queryKey对应的所有useQuery实例都unmount之后，这条缓存数据在内存中还能保存多久。

|机制|实现核心|关键配置|目的|
|---|---|---|---|
|**缓存 (Caching)**|`QueryCache` 内存存储，以 `queryKey` 为标识，存储 `Query` 对象。核心策略是 **stale-while-revalidate**。|`staleTime` (新鲜度), `cacheTime` (垃圾回收)|提升用户体验（即时 UI 响应），减少不必要的网络请求，保持数据相对最新。|
|**重试 (Retries)**|捕获 `queryFn` 的 Promise rejection，并使用**指数退避算法**在后台重新执行 `queryFn`。|`retry` (次数/条件), `retryDelay` (延迟策略)|自动处理临时的网络或服务器错误，提高应用的健壮性和容错能力|


>3.树形结构的序列化和反序列化；

在绝大多数 Web 开发场景中，树的深度有限，**直接使用 `JSON.stringify` / `JSON.parse` 是最简单、最高效的选择**。只有当明确知道会遇到超深树、需要与关系型数据库交互、或有特殊的性能瓶颈时，才需要考虑实现扁平化表示法。

>4.ui渲染和配置的抽象（有没有涉及到mixin等等）；


>5.webpack和vite之间的区别；

最大区别在于开发服务器的工作模式：
Webpack：先打包，再启动；
Vite：先启动，按需编译（依靠ES Modules特性）

生产环境构建时：
Vite：使用Rollup进行打包（Tree-shaking、压缩、代码分割）

选择：
绝大多数情况选择Vite
只有维护大型旧项目，需要利用Webpack的插件生态，需要兼容非常古老的浏览器的时候用Webpack


>6.ui的设计怎么实现的（参考了其他的网站吗）；


>7.tailwind如何使用的；


>8.怎么学习新技术；


>9.什么情况下用agent coding，什么情况自己写？如何平衡agent coding和copilot传统编程形式
