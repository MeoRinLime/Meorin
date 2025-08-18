---
title: 前端面试常见题-Reac+Vue
published: 2025-08-11
description: 收集的前端常见问题和借助Gemini得出的解答
tags:
  - 面试
category: 面试
draft: false
sourceLink: https://www.yuque.com/baiyueguang-rfnbu/tr4d0i/rz15kr
---

Source: [前端常见八股文](https://www.yuque.com/baiyueguang-rfnbu/tr4d0i/rz15kr)

## React
1. [讲讲 React diff 算法](#讲讲-react-diff-算法)
2. [React 组件复用方式有哪几种](#react-组件复用方式有哪几种)
3. [React fiber 是什么？有什么用](#react-fiber-是什么有什么用)
4. [React 生命周期有哪些？React 16 废弃了哪些？为什么要废弃？新增的生命周期钩子有哪些？有什么作用](#react-生命周期有哪些react-16-废弃了哪些为什么要废弃新增的生命周期钩子有哪些有什么作用)
5. [如何对 React 性能优化](#如何对-react-性能优化)
6. [React 的 setState 是同步的还是异步的](#react-的-setstate-是同步的还是异步的)
7. [讲讲 React 事件绑定原理](#讲讲-react-事件绑定原理)
8. [讲讲 React 的 hooks，有什么好处？有哪些常用的 hook](#讲讲-react-的-hooks有什么好处有哪些常用的-hook)
9. [讲讲 Reactkey 的作用](#讲讲-reactkey-的作用)
10. [谈谈 React 的类组件和函数式组件的区别](#谈谈-react-的类组件和函数式组件的区别)



## Vue
1. [讲讲 Vuex 的使用方法](#讲讲-vuex-的使用方法)
2. [讲讲 Vue 双向绑定原理](#讲讲-vue-双向绑定原理)
3. [Mvvm 和 mvc 区别是什么](#mvvm-和-mvc-区别是什么)
4. [Vue 组件间通信方式有哪些](#vue-组件间通信方式有哪些)
5. [Computed 和 watch 区别是什么](#computed-和-watch-区别是什么)
6. [V-for 和 v-if 同时使用有问题吗](#v-for-和-v-if-同时使用有问题吗)
7. [讲讲前端路由原理。比较一下 history 和 hash 这两种路由](#讲讲前端路由原理比较一下-history-和-hash-这两种路由)
8. [讲讲 Vue 的虚拟 DOM，原理，好处是什么？相对于手动操作 DOM，性能更好吗](#讲讲-vue-的虚拟-dom原理好处是什么相对于手动操作-dom性能更好吗)
9. [说说 Vue 的 keep-alive 使用及原理](#说说-vue-的-keep-alive-使用及原理)
10. [Vue 父子组件生命周期触发顺序是怎样的](#vue-父子组件生命周期触发顺序是怎样的)
11. [Vue. NextTick 的实现](#vue-nexttick-的实现)
12. [讲讲 Vue diff 算法](#讲讲-vue-diff-算法)

## 讲讲 React diff 算法

### 什么是 Diff 算法？

首先，我们要明白它解决什么问题。

在 Web 开发中，直接操作真实 DOM（Document Object Model）的开销是很大的，因为它会触发浏览器的重绘（Repaint）和回流（Reflow），非常消耗性能。

React 为了解决这个问题，引入了 **虚拟 DOM (Virtual DOM)**

1. **虚拟 DOM**：它是一个轻量级的 JavaScript 对象，是真实 DOM 的一个内存表示（可以理解为 DOM 的“蓝图”或“快照”）。操作 JavaScript 对象比操作真实 DOM 快得多。
2. **更新流程**：当组件的 `state` 或 `props` 发生变化时，React 会：
    - 根据新的 `state/props` 创建一个新的虚拟 DOM 树。
    - 将这个**新**的虚拟 DOM 树与**旧**的虚拟 DOM 树进行比较。
    - 找出两棵树之间的差异。这个**比较过程**，就是 **Diff 算法**。
    - 最后，React 只会将这些**差异**（最小化的改动）应用到真实的 DOM 上，从而最大限度地减少昂贵的 DOM 操作。

这个将虚拟 DOM 差异应用到真实 DOM 的过程，官方称之为 **协调 (Reconciliation)**。Diff 算法是协调过程中的核心部分。

React Diff 算法之所以高效，是因为它基于以下三个核心思想：

1. **Tree Diff**：只比较同层节点，如果节点跨层级移动，会按“删除”和“新增”处理。
2. **Component Diff**：不同类型的组件会直接替换，而不是尝试复用。
3. **Element Diff**：对于同级节点列表，使用唯一的、稳定的 `key` 属性来高效地识别节点的移动、新增和删除，从而实现最大程度的节点复用。

```js

// Tree Diff
// 更新前
<div>
  <ComponentA />
</div>

// 更新后
<span>
  <ComponentA />
</span>

// Component Diff
// 更新前
<div>
  <Header />
</div>

// 更新后
<div>
  <Content />
</div>

```

## React 组件复用方式有哪几种

### 1. Props & 组件组合 (Composition)

这是最基础、最核心，也是最重要的一种复用方式。

### 2. 高阶组件 (Higher-Order Components, HOC)

HOC 是一个**函数**，它接收一个组件作为参数，并返回一个新的组件。这是 React Hooks 出现之前，最主流的逻辑复用模式。

**核心思想**：通过包裹一个组件，向其注入额外的 `props` 或行为（逻辑）。

### 3. Render Props

Render Props 是另一种逻辑复用模式，它通过一个值为**函数**的 `prop` 来共享代码。

**核心思想**：组件不直接渲染任何东西，而是调用一个函数式的 `prop`（通常是 `render` 或 `children`），并将自己的 `state` 或数据作为参数传给这个函数，由这个函数来决定最终渲染什么。

### 4. 自定义 Hooks (Custom Hooks)

这是 **React 16.8** 之后官方推荐的、**现代 React 中最主流的逻辑复用方式**。

**核心思想**：将可复用的**状态逻辑**封装到一个函数中。这个函数的名字必须以 `use` 开头，并且可以在其内部调用其他的 Hooks（如 `useState`, `useEffect`）。

## React fiber 是什么？有什么用

总的来说，就是Fiber 把一个大的、同步的、不可中断的渲染任务，变成了一个**小的、异步的、可以中断、可以恢复并且可以设置优先级的任务处理系统**。

### Fiber 是什么？

1. **它是一种数据结构**：  
    Fiber 不再是之前那个简单的虚拟 DOM 对象。现在，**每一个组件实例都对应一个 "Fiber 节点" (Fiber Node)**。它是一个普通的 JavaScript 对象，包含了比虚拟 DOM 更多的信息，比如：
    
    - 组件的类型 (`type`)、`key` 等。
    - 指向**父节点**、**子节点**、**兄弟节点**的指针（`return`, `child`, `sibling`）。这些指针将所有 Fiber 节点连接成一个**链表树（Fiber Tree）**。
    - 组件更新所需的数据（`pendingProps`, `memoizedState`）。
    - 任务的优先级、副作用（`effectTag`）等调度信息。
    
    这个链表结构是实现遍历和任务中断的关键。React 不再需要深度递归，而是可以通过指针在 Fiber 树上自由地“行走”。
    
2. **它是一种新的协调算法 (Reconciliation Algorithm)**：  
    它指的是 React 用来找出新旧 UI 之间差异（diffing）并决定如何更新 DOM 的整个工作机制。这个新机制的核心就是**可中断的异步更新**。
### Fiber 有什么用？（它解决了什么问题）

Fiber 的根本目标是**提升应用的响应速度和用户体验**，尤其是在处理复杂或耗时的渲染任务时。
#### 1. 解决主线程阻塞问题

- **旧问题**：在 Fiber 之前，React 的更新过程是同步且递归的。一旦开始，就必须一口气执行到底，如果组件树很庞大，计算时间可能超过 16ms（一帧的时间），导致页面掉帧、动画卡顿、用户输入延迟。
- **Fiber 的解决方案**：Fiber 将整个更新过程分解成多个小的“工作单元”（unit of work）。每完成一个单元，React 就会把控制权交还给浏览器主线程，让浏览器有机会去处理更高优先级的任务（如用户输入、动画）。然后，在浏览器空闲时（通过 `requestIdleCallback` 的思想），再回来继续执行剩下的工作单元。

#### 2. 实现任务优先级调度

Fiber 允许 React 为不同的更新任务分配优先级。

- **高优先级**：用户输入、动画等，需要立即响应。
- **中等优先级**：普通的 `setState` 更新。
- **低优先级**：数据获取、页面外的组件渲染等。

当一个高优先级的任务（如用户输入）进来时，React 可以**暂停**当前正在进行的低优先级渲染任务，先去处理高优先级的，处理完后再**恢复**之前的低优先级任务。

#### 3. 启用新的高级特性

Fiber 的异步、可中断架构是实现许多 React 新特性的基石，没有 Fiber 就没有它们：

- **Suspense**：允许组件“等待”某个异步操作（如代码分割、数据获取）完成后再进行渲染，并在此期间显示一个加载状态。
- **Concurrent Features (并发特性)**：这是 React 未来的发展方向，允许 React 同时处理多个状态更新，并根据优先级智能地协调它们，使得 UI 永不阻塞。
- **错误边界 (Error Boundaries)**：虽然在 React 16 之前就有，但 Fiber 的架构让它能更可靠地捕获并处理组件树中的渲染错误，而不会让整个应用崩溃。


## React 生命周期有哪些？React 16 废弃了哪些？为什么要废弃？新增的生命周期钩子有哪些？有什么作用

#### 1. 挂载阶段 (Mounting)

当组件第一次被创建时，会按顺序调用以下方法：

- `constructor()`
    - **作用**：初始化 state、绑定事件处理函数的 `this`。
- `static getDerivedStateFromProps(props, state)`
    - **作用**：在 `render` 之前调用，用于根据传入的 `props` 来派生（更新）`state`。
- `render()`
    - **作用**：**核心方法，必须存在**。根据 `props` 和 `state` 返回 React 元素（通常是 JSX），用于描述 UI。
- `componentDidMount()`
    - **作用**：组件已经被渲染到 DOM 中后立即调用。
    - **这是执行副作用的最佳位置**，例如：发起网络请求、添加事件监听、操作 DOM 节点。

#### 2. 更新阶段 (Updating)

当组件的 `props` 或 `state` 改变时，会触发更新，按顺序调用以下方法：

- `static getDerivedStateFromProps(props, state)`
    - **作用**：同挂载阶段，在每次重新渲染前都会被调用。
- `shouldComponentUpdate(nextProps, nextState)`
    - **作用**：一个性能优化的钩子。它允许你告诉 React 本次更新是否非必要。
- `render()`
    - **作用**：同挂载阶段，重新渲染 UI。
- `getSnapshotBeforeUpdate(prevProps, prevState)`
    - **作用**：在 `render` 之后，但在 DOM 更新之前被调用。
- `componentDidUpdate(prevProps, prevState, snapshot)`
    - **作用**：在组件更新并渲染到 DOM 后立即调用。

#### 3. 卸载阶段 (Unmounting)

当组件从 DOM 中移除时调用：

- `componentWillUnmount()`
    - **作用**：在组件卸载及销毁之前直接调用。
    - **这是执行清理操作的最佳位置**，例如：清除定时器、取消网络请求、移除在 `componentDidMount` 中添加的事件监听。


### React 16 废弃了哪些生命周期？

React 16.3 开始，以下三个生命周期被标记为“不安全”（UNSAFE），并在未来的版本中被废弃：

1. `UNSAFE_componentWillMount()`
2. `UNSAFE_componentWillReceiveProps()`
3. `UNSAFE_componentWillUpdate()`

> **注意**：它们并没有被立即删除，而是添加了 `UNSAFE_` 前缀作为过渡。在 React 17+ 中，你应该完全避免使用它们。

### 为什么要废弃它们？

**核心原因：为了配合 React 的异步渲染（Fiber 架构）。**

在 React 16 引入 Fiber 架构后，渲染过程变成了**可中断的**。这意味着一个组件的渲染（Render Phase）可能会被更高优先级的任务（如用户输入）打断，然后稍后回来继续执行，甚至可能被多次执行。

这三个被废弃的生命周期都处于**“Render Phase”**（渲染阶段）。如果在这些函数中加入了**副作用**（如 AJAX 请求、操作 DOM），会带来严重的问题：

- **`componentWillMount`**: 如果在其中发起 AJAX 请求，在异步渲染模式下，它可能会被**多次调用**，导致请求被发送多次，但组件最终只挂载一次。
- **`componentWillReceiveProps`**: 同样可能被多次调用，导致状态被意外地多次覆盖。
- **`componentWillUpdate`**: 同上，如果在其中操作 DOM，可能会导致状态不一致。

**总结：** 因为这些 `will*` 生命周期在异步渲染下可能被多次触发，导致不可预测的副作用和 bug，所以它们被认为是“不安全的”，需要被更安全的替代方案取代。


### 新增的生命周期钩子有哪些？有什么作用？

为了安全地替代被废弃的钩子，React 16.3 引入了两个新的生命周期：

#### 1. `static getDerivedStateFromProps(props, state)`

- **替代了谁？** 主要替代了 `componentWillReceiveProps`。
- **有什么作用？** 它的唯一目标就是：**用 `props` 来派生 `state`**。

#### 2. `getSnapshotBeforeUpdate(prevProps, prevState)`

- **替代了谁？** 替代了 `componentWillUpdate` 中“在更新前读取 DOM”的场景。
- **有什么作用？** 它在 `render` 方法之后、真实 DOM 更新之前执行。这给了你一个最后的机会，从 DOM 中**读取**信息（如滚动位置、元素尺寸）。

### 函数组件与 Hooks

值得一提的是，在现代 React 开发中，我们更推荐使用**函数组件 + Hooks**。Hooks API 提供了一种更简洁、更直观的方式来处理组件的生命周期和副作用。

- `useState`: 管理 state。
- `useEffect`: 它一个 Hook 统一了 `componentDidMount`, `componentDidUpdate`, 和 `componentWillUnmount` 三个生命周期的功能。
    - `useEffect(() => { ... }, [])`: 模拟 `componentDidMount`
    - `useEffect(() => { ... }, [dep])`: 模拟 `componentDidUpdate`
    - `useEffect(() => { return () => { ... } }, [])`: 返回的函数模拟 `componentWillUnmount`



## 如何对 React 性能优化
（你的答案）

## React 的 setState 是同步的还是异步的
（你的答案）

## 讲讲 React 事件绑定原理
（你的答案）

## 讲讲 React 的 hooks，有什么好处？有哪些常用的 hook



## 讲讲 Reactkey 的作用
（你的答案）

## 谈谈 React 的类组件和函数式组件的区别
（你的答案）


## 讲讲 Vuex 的使用方法
（你的答案）

## 讲讲 Vue 双向绑定原理
（你的答案）

## Mvvm 和 mvc 区别是什么
（你的答案）

## Vue 组件间通信方式有哪些
（你的答案）

## Computed 和 watch 区别是什么
（你的答案）

## V-for 和 v-if 同时使用有问题吗
（你的答案）

## 讲讲前端路由原理。比较一下 history 和 hash 这两种路由

### 一、为什么需要前端路由？

在传统的 Web 开发（多页应用，MPA）中，每个 URL 都对应服务器上的一个 HTML 文件。用户每次点击链接，浏览器都会向服务器发送一个新请求，服务器返回一个新的 HTML 文档，浏览器再完整地加载、渲染它。这会导致：

- **页面白屏**：在请求和加载新页面的过程中，屏幕会短暂白屏，用户体验不佳。
- **资源浪费**：通常页面的头部、底部等公共部分是相同的，但每次切换页面都需要重新加载。

为了解决这些问题，**单页应用 (Single Page Application, SPA)** 应运而生。在 SPA 中，用户始终停留在同一个 HTML 页面上。当 URL 发生变化时，我们不希望浏览器去请求服务器，而是希望通过 JavaScript **动态地**在当前页面上渲染出与新 URL 对应的内，从而创造出“切换页面”的流畅体验。

**前端路由的核心，就在于“监听 URL 的变化，然后通过 JavaScript 动态地渲染对应的组件或内容到页面上，整个过程不会向服务器发送新的页面请求”。**

### 二、两种核心实现模式：`hash` 和 `history`

前端路由主要通过两种方式来监听和改变 URL，分别是 `hash` 模式和 `history` 模式。

#### 1. Hash 模式

**工作原理：**  
`hash` 模式利用了 URL 中的“哈希”（`#`）部分。URL 中 `#` 及其后面的内容被称为“片段标识符” (fragment identifier)。它有几个关键特性：

1. **不会发送到服务器**：当 URL 的 `hash` 部分发生变化时，浏览器**不会**向服务器发送 HTTP 请求。例如，从 `https://example.com/#/home` 变为 `https://example.com/#/about`，浏览器不会重新加载页面。
2. **触发 `hashchange` 事件**：URL 的 `hash` 值变化会触发 `window` 对象上的 `hashchange` 事件。
3. **记录在浏览器历史中**：`hash` 值的改变会增加一条新的历史记录，所以浏览器的“前进”、“后退”按钮可以正常工作。

#### 2. History 模式

**工作原理：**  
`history` 模式利用了 HTML5 History API，主要是 `pushState()` 和 `replaceState()` 这两个方法。

1. **改变 URL 而不刷新页面**：`history.pushState()` 和 `history.replaceState()` 可以在不刷新页面的情况下，直接修改浏览器地址栏的 URL。
2. **创建新的历史记录**：`pushState()` 会在浏览器的历史记录栈中添加一条新记录，而 `replaceState()` 则是替换当前记录。
3. **监听 `popstate` 事件**：当用户点击浏览器的“前进”、“后退”按钮，或者调用 `history.back()`、`history.forward()`、`history.go()` 时，会触发 `popstate` 事件。**注意：直接调用 `pushState` 或 `replaceState` 不会触发 `popstate` 事件**。因此，路由库通常需要重写点击事件来手动调用路由更新函数。



## 讲讲 Vue 的虚拟 DOM，原理，好处是什么？相对于手动操作 DOM，性能更好吗
（你的答案）

## 说说 Vue 的 keep-alive 使用及原理
（你的答案）

## Vue 父子组件生命周期触发顺序是怎样的
（你的答案）

## Vue. NextTick 的实现
（你的答案）

## 讲讲 Vue diff 算法
（你的答案）


