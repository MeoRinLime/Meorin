---
title: Bilibili金融平台一面
published: 2025-08-25
description: 2026秋招B站前端一面
tags:
  - 面试
  - Bilibili
category: 面试
draft: false
---

> 1.在自己做的项目当中的技术选型是怎么做的？


> 2.使用tailwind有什么经验？有哪些常用的原子类？


> 3.手撕：字符串转树


```js
const paths = ["a", "a/b/c", "a/e", "a/d"];
转化后为：
[
  {
    "title": "a",
    "key": "a",
    "children": [
      {
        "title": "b",
        "key": "a/b",
        "children": [
          {
            "title": "c",
            "key": "a/b/c",
            "children": [],
            "selectable": true
          }
        ],
        "selectable": false
      },
      {
        "title": "e",
        "key": "a/e",
        "children": [],
        "selectable": true
      },
      {
        "title": "d",
        "key": "a/d",
        "children": [],
        "selectable": true
      }
    ],
    "selectable": true
  }
```


> 4.在项目的调优方面有什么经验，有哪些常用的构建工具，npm打包的经验有哪些


> 5.虚拟列表和无限滚动是如何实现的？

虚拟列表：只加载显示对应视口和上下缓冲区中的列表项；
无限滚动：intersectionObserver 这个API