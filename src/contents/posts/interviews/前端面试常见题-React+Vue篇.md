---
title: 前端面试常见题-React+Vue
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

首先，如何发现性能瓶颈，使用**React Developer Tools (Profiler)**，可以生成火焰图，展示哪些组件被渲染了，花了多少时间，以及为什么会重新渲染等等关键信息

**主要的性能优化手段：**
1. React.memo 包装函数组件：对组件的props进行浅比较，如果props没有变化，就跳过本次渲染
2. useCallback 记忆化函数：只有依赖项数组中的值发生变化的时候，才会创建一个新的函数
3. useMemo 记忆化计算结果：只有在依赖项变化的时候才重新计算
4. 正确使用 key
5. 列表虚拟化：只渲染当前视口和一部分缓冲区的列表项（有一些成熟的库）
6. 代码分割，懒加载（React.lazy）等等

## React 的 setState 是同步的还是异步的

React 的 `setState` 在行为上是异步的，但其根本原因是 React 会对状态更新进行“批处理”（Batching）

React会收集在同一个事件循环中发生的所有 `setState` 调用，然后把他们合并成一次更新，最后只进行一次重新渲染

所以会导致以下的现象：
- 无法立即获取新的State
- 多次调用可能被合并

如果在React 18+的版本中确实需要立即、同步地更新DOM，可以使用 `flushSync`

```js
import { flushSync } from 'react-dom';

const handleClick = () => {
  flushSync(() => {
    setCount(c => c + 1);
  });
  // 在 flushSync 执行完毕后，DOM 已经更新
  console.log(count); // 这里仍然是旧值，但 DOM 已经变了
}

```

|问题|答案|
|---|---|
|**`setState` 是同步还是异步？**|**行为上是异步的**。你应该始终把它当作异步来处理。|
|**为什么是异步的？**|为了**性能**。React 通过**批处理**（Batching）将多次 state 更新合并为一次渲染。|
|**如何处理依赖旧 state 的更新？**|使用**函数式更新**：`setState(prevState => newState)`。|
|**如何在 state 更新后执行操作？**|使用 **`useEffect`** hook，并将该 state 放入依赖项数组。|
|**React 18 有什么变化？**|引入了**自动批处理**。现在所有更新（包括在 `setTimeout` 或 `Promise` 中）都会被批处理，行为更加一致。|
## 讲讲 React 事件绑定原理

1. **渲染阶段**：当 React 渲染 `<button onClick={handleClick}>` 时，它不会直接调用 `button.addEventListener('click', ...)`。它只是在与该 DOM 元素关联的内部数据结构中，记录下 `onClick` 事件需要触发 `handleClick` 函数。
    
2. **用户交互**：用户点击了页面上的这个按钮。
    
3. **原生事件冒泡**：一个原生的 `click` 事件在按钮 DOM 元素上被触发，然后开始向 `document` 冒泡。
    
4. **根监听器捕获**：当事件冒泡到 React 的根节点时，早已在此等候的 React 统一 `click` 监听器被触发。
    
5. **事件分发与包装**：
    - React 的监听器拿到原生事件对象。
    - 它查看 `event.target`，确定事件源头是那个按钮。
    - React 创建一个 `SyntheticEvent` 实例，将原生事件包装起来，为了磨平浏览器差异以及集成React事件系统
    - React 查找与该按钮关联的 Fiber Node（React 内部的组件树节点），并找到我们在 JSX 中提供的 `onClick` 处理器。
    
6. **执行回调函数**：React 调用我们的 `handleClick(syntheticEvent)` 函数，并将 `SyntheticEvent` 对象作为参数传入。
    
7. **状态更新**：如果在 `handleClick` 中调用了 `setState`，React 会启动其批处理机制，在事件处理函数执行完毕后，统一进行 state 更新和组件重新渲染。
    

这就是 React 事件绑定的完整原理。它通过 **事件委托** 实现了高效的事件管理，通过 **合成事件** 解决了跨浏览器兼容性问题，并将整个事件系统与自身的组件模型和状态更新流程完美地融合在了一起。
## 讲讲 React 的 hooks，有什么好处？有哪些常用的 hook

### Hooks 是什么？

简单来说，**Hooks 是一些特殊的函数，可以让你在函数组件 (Function Component) 中“钩入”(hook into) React 的 state 及生命周期等特性。**

在 Hooks 出现之前，如果你想让一个组件拥有自己的 state 或者使用生命周期方法（如 `componentDidMount`），你必须把它写成类组件 (Class Component)。函数组件只能是纯粹的“无状态组件”。

Hooks 的出现打破了这个限制，让函数组件也能做类组件能做的一切，甚至做得更好。

### Hooks 的好处（它解决了什么问题）

Hooks 的诞生不是为了炫技，而是为了解决类组件在长期实践中暴露出的三大痛点：
 1. 告别 `this` 的困扰
 2. 更好地组织和复用“状态逻辑”
 3. 让组件更简洁、更易于测试

### 常用的Hooks

 `useState`：状态钩子
 `useEffect`：副作用钩子，可以看做`componentDidMount`, `componentDidUpdate`, 和 `componentWillUnmount` 这三个生命周期函数的组合
 `useContext`：共享状态钩子，进行跨层级的状态共享
 `useRef`：引用钩子，主要用来访问DOM节点和存储可变值，值在每次渲染时都保持不变，更新不会触发组件重新渲染
 `useMemo`：用于性能优化。它可以“记住”一个昂贵计算的结果，只有在依赖项改变时才重新计算。
`useCallback`：用于性能优化。它可以“记住”一个函数定义，只有在依赖项改变时才返回新的函数实例。这在将函数传递给子组件时特别有用，可以防止不必要的重新渲染。
`useReducer`：`useState` 的替代方案。当 state 逻辑比较复杂，或者下一个 state 依赖于前一个 state 时，使用 `useReducer` 会让代码更清晰。

## 讲讲 React key 的作用

`key` 的核心作用就是帮助 React 识别哪些元素是新增的、哪些是删除的、哪些是移动的，从而能够以最高效的方式更新 UI，避免不必要的DOM操作和状态混乱的BUG

### 如何选择 Key

1. **首选：使用数据中稳定且唯一的标识符。**
    - 比如数据库中的 `id`、`uuid` 等。这是最理想、最安全的选择。
    - `const listItems = todos.map(todo => <li key={todo.id}>{todo.text}</li>);`
    
2. **次选：自己创建唯一 ID。**
    - 如果数据没有唯一 ID，可以在加载数据时为它们添加一个。但要确保这个 ID 在后续的更新中保持不变。
    
3. **最后才考虑，且要非常谨慎：使用数组索引 `index`。**
    - **只有在以下所有条件都满足时**，你才可以使用 `index` 作为 `key`：
        1. 列表和列表项是**静态的**，不会进行计算和改变。
        2. 列表项中**没有 `id`**。
        3. 列表**永远不会被重新排序或过滤**。
    - 把它当作一个坏习惯，尽量避免。因为一旦未来需求变更，列表变为动态的，就可能引入上面提到的难以调试的 Bug。
    
4. **绝对禁止：使用不稳定的 `key`。**
    - **永远不要**使用 `Math.random()` 或 `new Date()` 等作为 `key`。这会导致每次渲染时 `key` 都不同，React 会认为所有组件都是全新的，从而销毁所有旧组件并创建新组件，造成巨大的性能浪费。

## 谈谈 React 的类组件和函数式组件的区别

简单来说：
- **类组件 (Class Component)** 是“过去”的方式，基于 ES6 的 class 语法，功能完备但写法相对繁琐。
- **函数组件 (Functional Component)** 是“现在和未来”的方式，是普通的 JavaScript 函数，借助 Hooks 变得无比强大且简洁。

| 特性             | 类组件 (Class Component)                                                        | 函数组件 (Functional Component) + Hooks                 |
| -------------- | ---------------------------------------------------------------------------- | --------------------------------------------------- |
| **语法/定义**      | 继承自 `React.Component`，必须包含 `render()` 方法                                     | 就是一个普通的 JavaScript 函数，返回 JSX。                       |
| **State 管理**   | 使用 `this.state` (一个对象)，通过 `this.setState()` 更新                               | 使用 `useState()` Hook，可以定义多个、任意类型的 state。            |
| **生命周期**       | 使用生命周期方法，如 `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` | 使用 `useEffect()` Hook 来处理副作用，模拟生命周期的行为。             |
| **`this` 关键字** | 内部广泛使用 `this` 来访问 state, props 和方法。需要处理 `this` 的指向问题（如 `bind`）。              | **完全没有 `this`**。直接在函数作用域内访问 props, state 和函数。       |
| **Props 接收**   | 通过 `this.props` 访问。                                                          | 作为函数的第一个参数 `props` 传入。                              |
| **逻辑复用**       | 通过高阶组件 (HOC) 或 Render Props 模式，容易造成“包装地狱”(Wrapper Hell)。                     | 通过**自定义 Hooks**，逻辑复用变得极其简单、优雅，且不会增加组件层级。            |
| **代码量**        | 通常代码量更多，模板代码（boilerplate）也更多。                                                | 非常简洁，代码量显著减少。                                       |
| **未来趋势**       | 官方已不再推荐，但会继续支持。不会获得新的特性。                                                     | **React 官方推荐的未来方向**，所有新特性（如 Concurrent Mode）都围绕它构建。 |

## 讲讲 Vuex 的使用方法
（你的答案）

## 讲讲 Vue 双向绑定原理

- Vue2：Object.defineProperty()，劫持数据的 `getter` 和 `setter`，缺点就是无法检测到对象属性的新增和删除，以及无法检测通过索引直接修改数组等情况
- Vue3: Proxy，直接为整个对象创建一个代理对象；性能更优，功能也更强
## Mvvm 和 mvc 区别是什么

- MVC(Model-View-Controller)：将应用程序分为较独立的三个部分，即模型（管理数据和业务逻辑）、视图（负责展示数据）、控制器（接收输入，调用Model来处理，再选择合适的View来展示结果）
- MVVM(Model-View-Viewmodel)：模型部分相同，视图部分会与ViewModel（视图模型）进行双向绑定，View上数据变化时ViewModel自动更新，反之亦然；ViewModel的作用便是连接视图和模型的桥梁；Vue便是典型的Mvvm

> 虽然React官方称自己只是一个UI库，但实际上组件化开发模式已经十分接近MVVM的思想

## Vue 组件间通信方式有哪些

| 通信方式               | 关系       | 推荐场景              | 优点               | 缺点                    |
| ------------------ | -------- | ----------------- | ---------------- | --------------------- |
| **Props**          | 父 -> 子   | **最常用**，传递数据      | 单向数据流，清晰，标准      | 只能单向，深层嵌套会繁琐          |
| **$emit**          | 子 -> 父   | **最常用**，子组件通知父组件  | 单向数据流，清晰，标准      | 只能单向                  |
| **v-model**        | 父 <-> 子  | 自定义表单组件           | 语法简洁，方便          | 本质是 props/emit 的封装    |
| **ref**            | 父 -> 子   | 调用子组件方法/访问实例      | 灵活，可以直接操作子组件     | 破坏了数据流的封装性，耦合度高       |
| **provide/inject** | 祖先 -> 后代 | 跨多层级传递数据，如主题、用户信息 | 避免 props 逐层传递    | 数据来源不直观，不像 props 那么明确 |
| **Pinia/Vuex**     | 任意组件     | **中大型应用**，复杂状态共享  | 集中管理，数据流可预测，调试方便 | 增加了项目复杂度和代码量          |
| **Event Bus**      | 任意组件     | 简单项目，无直接关系的组件通信   | 简单直接，解耦          | 数据流混乱，难以追踪和维护         |

## Computed 和 watch 区别是什么

| 特性     | `computed` (计算属性)                                                 | `watch` (侦听器)                              |
| ------ | ----------------------------------------------------------------- | ------------------------------------------ |
| 一句话总结  | 从现有数据派生出一个**新的、有缓存**的数据。                                          | 观察一个数据的变化，并**执行一个动作**（副作用）。                |
| 是否有返回值 | **必须有 `return`**，返回计算后的值。                                         | **没有返回值**。它的目的是执行逻辑，而不是返回值。                |
| 缓存     | **有缓存**。只要依赖的数据不变，它就不会重新计算，直接返回缓存的结果，性能更好。                        | **没有缓存**。只要数据变化，它就会执行回调函数。                 |
| 异步操作   | **不支持**。计算属性必须是同步执行的，因为它需要立刻返回一个值。                                | **支持**。你可以在 `watch` 的回调中执行异步操作（如 API 请求）。  |
| 使用场景   | 当你需要一个值，而这个值依赖于其他属性时。常用于模板中简化表达式。                                 | 当一个数据变化，需要执行**异步**或**开销较大**的操作时。           |
| 本质     | **声明式**的。你声明了 `fullName` 是由 `firstName` 和 `lastName` 组成的，剩下的交给框架。 | **命令式**的。你命令程序：“当 `question` 变化时，去执行这个函数”。 |



## V-for 和 v-if 同时使用有问题吗

首先，绝对避免把 `v-for` 和 `v-if` 放在同一个元素中；他们的优先级在Vue2和Vue3中是相反的

- 在Vue2中， v-for的优先级更高；
- 在Vue3中，v-if的优先级更高；

最佳实践应该是，使用 `computed` 属性，将数据处理逻辑放在JS中，让template只负责展示

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

`keep-alive` 是 Vue 中一个非常实用且重要的内置组件。它用于在组件切换时**缓存不活动的组件实例**，而不是销毁它们。

**主要应用场景：**
1. 标签页切换：保留每个标签页的状态。
2. 表单页面：用户填写了一部分表单，切换到其他页面查询信息再返回时，希望保留已填写的内容。
3. 性能优化：对于一些创建成本很高的组件，避免反复创建和销毁，提升性能。

**主要提供了三个props：**
- include：只有名称匹配的组件才会被缓存
- exclue：任何名称匹配的都不会被缓存
- max：指定最多缓存多少个组件实例，LRU策略

**实现原理：**
内部维护一个缓存对象（可以看做一个Map），其value一般是组件实例（instance）和其虚拟节点（VNode）
渲染时，如果缓存命中，则直接在缓存中取VNode，挂载到真实的DOM上，然后调用 `activated`钩子；当一个被缓存的组件被切换掉时，只会移除这个组件的DOM元素，其状态会被保存在内存中，然后调用 `deactivated` 钩子

## Vue 父子组件生命周期触发顺序是怎样的
（你的答案）

## Vue.NextTick 的实现

| 方面          | 解释                                                                                                          |
| ----------- | ----------------------------------------------------------------------------------------------------------- |
| 目的 (Why)    | 在 Vue **异步更新 DOM 之后**执行代码，以获取最新的 DOM 状态。                                                                    |
| 核心原理 (What) | 利用 JavaScript 的 **事件循环 (Event Loop)** 和 **任务队列** 机制。                                                        |
| 实现方式 (How)  | 优先将回调函数包装成一个**微任务 (Microtask)**，利用 `Promise.then` 等 API。在不支持微任务的环境下，会降级为**宏任务 (Macrotask)**，如 `setTimeout`。 |
| 执行流程        | 数据变更 -> Vue 将 DOM 更新任务推入微任务队列 -> `nextTick` 将回调推入微任务队列 -> 同步代码结束 -> 微任务队列被清空（先更新 DOM，再执行回调）。                |

## 讲讲 Vue diff 算法

和React diff算法在思想上差不多，都是通过比较虚拟DOM来最小化对真实DOM的操作。

Vue 在这方面做得更精细，尤其是 Vue 3，它的目标是实现最小的 DOM 移动次数。

- **Vue 2 (双端比较)**：
    - 它使用头、尾四个指针，在新旧列表中同时进行比较：头对头、尾对尾、头对尾、尾对头。
    - 这种方式对于列表首尾的常见操作（如 `push`, `pop`, `shift`, `unshift`, `reverse`）极其高效，几乎是 O(1) 的移动。
    - 如果四次比较都失败，才会回退到类似 React 的 Map 查找。
    
- **Vue 3 (最长递增子序列 - LIS)：**
    - 这是目前业界公认的最高效的 Diff 算法之一。
    - 预处理：它会先快速处理新旧列表的相同前缀和相同后缀，跳过这些不需要移动的节点。
    - 核心 LIS：对中间乱序的部分，它会计算出一个“最长递增子序列”。这个序列中的节点被认为是“稳定锚点”，即它们的相对位置是正确的，不需要移动。
    - 移动和创建：最后，它只需要遍历一次，将所有不在这个“稳定锚点”序列中的节点移动到正确的位置，或者创建新节点。

此外，Vue中的diff是编译时+运行时的，对于动态部分，会打上补丁标记，例如 `TEXT`, `CLASS`等等，也成为静态提升，使全量提升变成靶向更新