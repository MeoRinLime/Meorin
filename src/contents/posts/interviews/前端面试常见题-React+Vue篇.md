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
（你的答案）

## React 生命周期有哪些？React 16 废弃了哪些？为什么要废弃？新增的生命周期钩子有哪些？有什么作用
（你的答案）

## 如何对 React 性能优化
（你的答案）

## React 的 setState 是同步的还是异步的
（你的答案）

## 讲讲 React 事件绑定原理
（你的答案）

## 讲讲 React 的 hooks，有什么好处？有哪些常用的 hook
（你的答案）

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


