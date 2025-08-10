---
title: 我们为什么要使用React Query
published: 2025-08-02
description: 简单介绍一下使用React Query的优点
tags: [React Query, React, 技术]
category: 技术
draft: false
---

### 1. 什么是 React Query？ (它解决了什么问题)

首先，我们得知道它为什么存在。在没有 React Query 之前，我们通常怎么在 React 中获取数据？

**传统方式 (使用 `useState` + `useEffect`)**

```js
import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://api.example.com/data');
        const json = await response.json();
        setData(json);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // 空依赖数组，只在组件挂载时执行一次

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  return <div>{/* ... 使用 data ... */}</div>;
}

```

这个模式看起来没问题，但当应用变复杂时，你会遇到很多棘手的问题：

- **缓存 (Caching):** 如果用户切换到其他页面再切回来，组件会重新挂载，`useEffect` 会再次执行，重新请求相同的数据，浪费流量和时间。
- **数据同步 (Synchronization):** 服务器上的数据可能已经变了（比如其他用户修改了），但我们前端的数据还是旧的。如何知道何时该重新获取数据？
- **后台更新 (Background Updates):** 当用户重新聚焦浏览器窗口时，自动去后台检查一下数据是否最新，能提供更好的用户体验。
- **代码冗余 (Boilerplate):** 每个需要请求数据的组件，你都得写一套 `isLoading`, `error`, `data` 的 state 和 `useEffect` 逻辑。
- **分页和无限滚动 (Pagination / Infinite Scroll):** 用 `useState` 和 `useEffect` 手动管理这些复杂场景的状态会非常痛苦。

**React Query 的核心思想**

React Query 认为，**从服务器获取的数据本质上是一种“服务端状态 (Server State)”**，它和我们应用内的“客户端状态 (Client State)”（如表单输入、弹窗开关等）有很大不同。

- **客户端状态**: 你完全拥有和控制。
- **服务端状态**: 你并不拥有，它存放在远端，你只能“借用”一份快照，而且这份快照随时可能过时。

**React Query 就是一个专门管理“服务端状态”的库。** 它帮你处理好获取、缓存、同步和更新服务端数据的所有麻烦事。

> **提示**: React Query 现在已经发展成为一个与框架无关的库，名为 **TanStack Query**。React Query 是它在 React 中的官方适配版本，它们基本上是同一个东西。

---

### 2. 核心概念与入门示例

要使用 React Query，需要理解几个核心概念。

#### 核心概念

1. **`QueryClient`**: 这是 React Query 的“大脑”，它在幕后管理着所有的缓存和请求逻辑。需要用 `QueryClientProvider` 在你的应用顶层包裹起来。
2. **`useQuery`**: 这是最核心、最常用的 Hook，用于**获取 (GET)** 数据。
3. **`Query Key`**: 这是 `useQuery` 的缓存键。它是一个数组，唯一标识一个数据请求。当 `Query Key` 改变时，React Query 会自动重新获取数据，可以类比于 React 中的依赖数组的概念。
4. **`Query Function`**: 这是一个返回 Promise 的异步函数，是真正执行数据请求的地方（例如使用 `fetch` 或 `axios`）。

#### 入门示例

让我们用 React Query 重写上面的例子。

```jsx
// app.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 1. 创建一个 client 实例
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 2. 用 Provider 包裹你的应用 */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

```

```jsx
// 组件
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'; // 假设用 axios

// 3. 定义你的请求函数
const fetchTodos = async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');
  return data;
};

function Todos() {
  // 4. 使用 useQuery Hook
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['todos'], // Query Key: 唯一标识这个请求
    queryFn: fetchTodos, // Query Function: 实际的请求逻辑
  });

  // React Query 已经帮你管理好了加载和错误状态
  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  // 成功后，data 就是你的数据
  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}

```

---

### 3. React Query 的强大之处 (核心特性)

上面的例子只是冰山一角。React Query 的真正威力在于它的内置特性：

#### a. 自动缓存与重新获取 (Caching & Refetching)

- **缓存**: `useQuery` 第一次成功获取数据后，会将其缓存起来。如果另一个组件也使用 `queryKey: ['todos']` 来请求数据，React Query 会立即返回缓存的数据，而不会发送新的网络请求。
- **Stale-While-Revalidate**: 它认为缓存数据是“陈旧的(stale)”。它会先给你返回陈旧数据让你立刻看到内容，同时在后台“静默地”重新验证数据。如果数据有更新，它会自动刷新你的界面。
- **自动重新获取**: 在以下情况，它会自动重新获取数据，确保数据最新：
    - 组件重新挂载时。
    - 浏览器窗口重新聚焦时。
    - 网络重新连接时。  
（这些都可以通过配置关闭或调整）

#### b. `useMutation`: 处理数据更新 (POST, PUT, DELETE)

当你想**修改**服务端数据时，就该用 `useMutation`。

```jsx
import { useMutation, useQueryClient } from '@tanstack/react-query';

function AddTodo() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newTodo) => { // 这里的 newTodo 是调用 a.mutate(newTodo) 时传进来的
      return axios.post('/api/todos', newTodo);
    },
    // 当 mutation 成功时...
    onSuccess: () => {
      // 让所有 key 为 ['todos'] 的 query 失效，并重新获取
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return (
    <div>
      <button
        onClick={() => {
          mutation.mutate({ id: new Date(), title: 'Do Laundry' });
        }}
      >
        Add Todo
      </button>
      {mutation.isPending && 'Adding todo...'}
      {mutation.isError && `An error occurred: ${mutation.error.message}`}
      {mutation.isSuccess && 'Todo added!'}
    </div>
  );
}

```

`useMutation` 的 `onSuccess` 回调是关键。`queryClient.invalidateQueries` 会告诉 React Query：“嘿，跟 `['todos']` 相关的数据已经变了，下次谁要用就得重新去服务器拿！” 这就优雅地解决了数据同步问题。

#### c. React Query Devtools: 调试神器

这是一个可视化工具，能让你清楚地看到所有 query 的状态、缓存内容和数据。官方强烈建议在开发时使用。

---

### 总结

**React Query (TanStack Query) 不是一个数据请求库（像 axios），而是一个服务端状态管理库。** 它通过巧妙的设计，帮你自动化处理了数据获取中的缓存、同步、状态管理等一系列复杂问题，让你能用更少的代码写出更健壮、用户体验更好的应用。