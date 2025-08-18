---
title: 前端面试常见题-HTML+CSS
published: 2025-08-11
description: 收集的前端常见问题和借助Gemini得出的解答
tags:
  - 面试
category: 面试
draft: false
sourceLink: https://www.yuque.com/baiyueguang-rfnbu/tr4d0i/rz15kr
---

Source: [前端常见八股文](https://www.yuque.com/baiyueguang-rfnbu/tr4d0i/rz15kr)

## HTML + CSS
1. [讲一下盒模型，普通盒模型和怪异盒模型有什么区别](#讲一下盒模型，普通盒模型和怪异盒模型有什么区别)
2. [块元素和行内元素区别是什么？常见块元素和行内元素有哪些](#块元素和行内元素区别是什么？常见块元素和行内元素有哪些)
3. [HTML 语义化标签有哪些](#HTML-语义化标签有哪些)
4. [伪类和伪元素的区别是什么](#伪类和伪元素的区别是什么)
5. [CSS 如何实现垂直居中](#CSS-如何实现垂直居中)
6. [CSS 常见的选择器有哪些](#css-常见的选择器有哪些)
7. [CSS 的优先级如何计算](#css-的优先级如何计算)
8. [长度单位 px、em 和 rem 的区别是什么](#长度单位-pxem-和-rem-的区别是什么)
9. [讲一下 flex 弹性盒布局](#讲一下-flex-弹性盒布局)
10. [浮动塌陷问题解决方法是什么](#浮动塌陷问题解决方法是什么)
11. [Position 属性的值有哪些？各个值是什么含义](#position-属性的值有哪些各个值是什么含义)
12. [BFC、IFC 是什么](#bfcifc-是什么)

## 讲一下盒模型，普通盒模型和怪异盒模型有什么区别


盒模型由四个部分组成，从内到外分别是：

1. **Content (内容)**：盒子的核心，显示文本、图片等实际内容。它的尺寸由 `width` 和 `height` 属性控制。
2. **Padding (内边距)**：包裹在内容区域外的透明空间，位于内容和边框之间。
3. **Border (边框)**：紧挨着内边距的线条，可以设置其宽度、样式和颜色。
4. **Margin (外边距)**：盒子最外层的透明空间，用来控制盒子与其他元素之间的距离。

普通盒模型和怪异盒模型最根本的区别在于：**你设置的 `width` 和 `height` 属性到底应用在哪个部分？**

这两种模型由 CSS 的 `box-sizing` 属性来控制。

### 1. 普通盒模型 (Standard Box Model)

- **`box-sizing: content-box;`** (这是所有元素的默认值)

在这种模型下，你设置的 `width` 和 `height` **仅仅是内容（Content）区域的宽度和高度**。

盒子的总宽度 = `width` + `padding-left` + `padding-right` + `border-left` + `border-right`  
盒子的总高度 = `height` + `padding-top` + `padding-bottom` + `border-top` + `border-bottom`

举个例子
```js
.box {
  box-sizing: content-box; /* 默认值，可以不写 */
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
}
```

那么这个盒子在页面上实际占用的视觉宽度是：  
**总宽度** = 200px (内容) + 20px (左内边距) + 20px (右内边距) + 5px (左边框) + 5px (右边框) = **250px**

### 2. 怪异盒模型 (Quirky Box Model)

- **`box-sizing: border-box;`**

这个模型也被称为 IE 盒模型，因为早期版本的 IE 浏览器默认使用这种模式。现在它已经成为现代 Web 开发的最佳实践。

在这种模型下，你设置的 `width` 和 `height` **是盒子“可见”部分的总宽度和总高度**，也就是 **内容 + 内边距 + 边框** 的总和。

盒子的总宽度 = `width` (这里的 `width` 已经包含了 `padding` 和 `border`)  
盒子的总高度 = `height`

浏览器会自动从你设置的 `width` 中减去 `padding` 和 `border` 的值，来计算出内容（Content）区域的大小。

对于上面的例子，总宽度=200px

它的内容区域宽度是多少呢？浏览器会自动计算：  
内容宽度 = 200px (总宽) - 20px (左内边距) - 20px (右内边距) - 5px (左边框) - 5px (右边框) = 150px


## 块元素和行内元素区别是什么？常见块元素和行内元素有哪些

| 特性 (Feature)            | 块元素 (Block Element)                                  | 行内元素 (Inline Element)                                                                          |
| ----------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **布局方式**                | **独占一行**。会自动换行，即使宽度没有占满父元素。                          | **不独占一行**。与其他行内元素在同一行显示，直到行末才换行。                                                               |
| **尺寸设置 (width/height)** | **可以** 设置 `width` 和 `height` 属性。                     | **不可以** 设置 `width` 和 `height`。其尺寸由内容决定。                                                        |
| **外边距 (margin)**        | **可以** 设置四个方向的 `margin` (top, right, bottom, left)。  | **只能** 设置 **水平方向** 的 `margin` (left, right)，垂直方向的 `margin` (top, bottom) 无效。                   |
| **内边距 (padding)**       | **可以** 设置四个方向的 `padding` (top, right, bottom, left)。 | **只能** 设置 **水平方向** 的 `padding` (left, right) 会影响布局，垂直方向的 `padding` (top, bottom) 不会撑开与其他元素的距离。 |
| **内容模型**                | 通常可以包含其他块元素和行内元素。                                    | 通常只能包含数据（文本）或其他行内元素。                                                                           |

另外，还有行内块元素（inline-block）

```css
.container {
  display: inline-block;
}
```

|类型|换行|设置宽高|设置垂直Margin/Padding|典型代表|
|---|---|---|---|---|
|**块 (block)**|是|是|是|`<div>`, `<p>`, `<h1>`|
|**行内 (inline)**|否|否|否|`<span>`, `<a>`, `<strong>`|
|**行内块 (inline-block)**|否|是|是|`<img>`, `<input>`, 或通过CSS设置|

## HTML 语义化标签有哪些

**语义化就是用最能描述内容含义的 HTML 标签来组织你的网页**。

作用：提升 SEO，增强可访问性（为视障人群），代码可读性和可维护性，更好的移动端体验

以下是按功能分类的常见语义化标签，主要是在 HTML5 中得到加强和推广的。

#### 1. 页面结构 (Page Structure)

这些标签用于定义页面的主要区域，构成了网页的骨架。

- `<header>`: 定义文档或区域的头部。通常包含 logo、标题、导航等。一个页面可以有多个 `<header>`（例如，每个 `<article>` 都可以有自己的头部）。
- `<nav>`: 定义导航链接的区域。用于主导航、分页导航、面包屑等。
- `<main>`: 定义页面的**主要内容**。一个页面**应该只有一个** `<main>` 元素，并且它不应该被包含在 `<header>`, `<footer>`, `<aside>`, `<nav>` 中。
- `<footer>`: 定义文档或区域的底部。通常包含版权信息、联系方式、相关链接等。
- `<article>`: 定义独立的、自包含的内容。它应该可以被独立地分发和重用，例如一篇博客文章、一则新闻报道、一个论坛帖子。
- `<section>`: 定义文档中的一个区域或章节。它通常包含一个标题（`<h1>`-`<h6>`）。它用于对内容进行主题性分组，当内容没有更具体的语义标签时，`<section>` 是一个很好的选择。
- `<aside>`: 定义与页面主要内容相关性较低的侧边栏内容。例如，广告、作者简介、相关链接列表等。

#### 2. 内容和文本 (Content & Text)

这些标签用于更精确地描述文本的含义。

- `<blockquote>`: 定义一个块级引用，通常来自其他来源。
- `<q>`: 定义一个行内短引用。
- `<code>`: 定义一小段计算机代码。
- `<pre>`: 定义预格式化的文本，保留空格和换行符，常用于包裹 `<code>` 来显示代码块。
- `<strong>`: 定义**重要性强**的文本（不仅仅是加粗）。
- `<em>`: 定义需要**强调**的文本（不仅仅是斜体）。
- `<mark>`: 定义需要高亮或标记的文本。
- `<time>`: 定义一个具体的时间或日期。可以带上 `datetime` 属性提供给机器读取。
    - `<time datetime="2025-08-10">2025年8月10日</time>`
- `<figure>` 和 `<figcaption>`:
    - `<figure>`: 用于包裹一个独立的流内容，如图像、图表、代码块等。
    - `<figcaption>`: 为 `<figure>` 元素提供标题或说明。


## 伪类和伪元素的区别是什么

- **伪类** 回答的是：“这个元素现在**是什么状态**？” (例如：被鼠标悬停？是第一个子元素？)，使用**单个冒号**
  - 例如：`:hover`, `:first-child`, `:focus`, `first-child`, `last-child`, `checked`
- **伪元素** 回答的是：“我要选中这个元素的**哪个部分**？” (例如：它的第一行？它内容的前面？)，使用**双冒号**
  - 例如：`::before`, `::after`, `::first-line`, `selection`, `placeholder`


### 总结

- 如果你想根据**用户的行为**（如 `:hover`）或元素在**DOM 树中的位置**（如 `:first-child`）来应用样式，你应该使用**伪类** (`:`)。
- 如果你想为元素的**某一部分**（如 `::first-line`）添加样式，或者想在不修改 HTML 的情况下**添加一些装饰性内容**（如 `::before`），你应该使用**伪元素** (`::`)。


## CSS 如何实现垂直居中

先给方案：
- **首选方案（现代浏览器）**: 使用 **Flexbox** (`display: flex`)。这是最简单、最灵活、功能最强大的方法，适用于几乎所有场景。
- **二维布局或网格布局**: 使用 **CSS Grid** (`display: grid`)。它在实现垂直居中的同时，能轻松处理复杂的二维对齐。
- **元素需要脱离文档流（如弹窗、覆盖层）**: 使用 **绝对定位 + Transform**。非常精确，且不依赖父元素的 `display` 属性。
- **仅限单行文本**: 使用 **`line-height`**。这是最简洁的方法，但只适用于单行文本。
- **需要兼容非常古老的浏览器 (IE8+)**: 使用 **`display: table-cell`**。这是一个可靠的“老派”技巧。

1. Flex 布局

```css
.parent {
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 (可选) */
  
  /* 需要给父元素一个高度才能看到效果 */
  height: 300px; 
  background-color: #f0f0f0;
}

.child {
  width: 100px;
  height: 100px;
  background-color: #3498db;
}

```

2. CSS Grid 布局（二维布局的首选）

```css
.parent {
  display: grid;
  place-items: center; /* 垂直和水平同时居中 */

  /* 或者分开写 */
  /* align-items: center; */   /* 垂直居中 */
  /* justify-items: center; */ /* 水平居中 */
  
  height: 300px;
  background-color: #f0f0f0;
}

.child {
  width: 100px;
  height: 100px;
  background-color: #e74c3c;
}

```


3. 绝对定位+Transform

```css
.parent {
  position: relative; /* 必须：为子元素的绝对定位提供参照物 */
  height: 300px;
  background-color: #f0f0f0;
}

.child {
  position: absolute;
  top: 50%;  /* 将元素的左上角移动到父容器的中心点 */
  left: 50%; /* 同上 */
  transform: translate(-50%, -50%); /* 将元素向左、向上移动自身宽高的一半 */
  
  width: 100px;
  height: 100px;
  background-color: #9b59b6;
}

```

4. Line-height（仅限单行文本）

```css
.button {
  height: 50px;
  line-height: 50px; /* 关键：让行高等于容器高度 */
  text-align: center; /* 水平居中 (可选) */
  
  background-color: #2ecc71;
  color: white;
}

```

4. Display: table-cell（兼容老旧浏览器）

```css
.parent {
  display: table; /* 让父元素表现得像一个 <table> */
  width: 100%; /* 通常需要指定宽度 */
  height: 300px;
  background-color: #f0f0f0;
}

.child {
  display: table-cell; /* 让子元素表现得像一个 <td> */
  vertical-align: middle; /* 核心属性：实现垂直居中 */
  text-align: center; /* 水平居中 (可选) */
  
  /* 注意：在 table-cell 上设置宽高可能不总是生效，内容会把它撑开 */
}

```

## CSS常见的选择器有哪些
（你的答案）

## CSS的优先级如何计算
（你的答案）

## 长度单位 px、em 和 rem 的区别是什么

|单位|全称|相对对象|关键特性|推荐用法|
|---|---|---|---|---|
|**`px`**|Pixel|屏幕分辨率|**绝对单位**，大小固定|需要精确像素的边框、阴影等|
|**`em`**|em|**父元素**的 `font-size`|**相对单位**，会产生复合效应|组件内部希望尺寸与自身字号关联时|
|**`rem`**|Root em|**根元素 (`<html>`)** 的 `font-size`|**相对单位**，无复合效应，全局缩放|**现代开发首选**，用于字体、间距、布局|


## 讲一下flex 弹性盒布局
（你的答案）

## 浮动塌陷问题解决方法是什么
（你的答案）

## Position属性的值有哪些？各个值是什么含义

| 值 (Value)  | 含义 (Meaning) | 定位参照物                | 是否脱离文档流？                |
| ---------- | ------------ | -------------------- | ----------------------- |
| `static`   | **静态定位**     | 无（遵循正常文档流）           | 否                       |
| `relative` | **相对定位**     | 元素自身的**原始位置**        | 否                       |
| `absolute` | **绝对定位**     | 最近的**已定位**祖先元素       | **是**                   |
| `fixed`    | **固定定位**     | 浏览器**视口 (Viewport)** | **是**                   |
| `sticky`   | **粘性定位**     | 混合体（滚动时在父元素和视口间切换）   | 滚动到阈值前为否，之后表现类似 `fixed` |

1. Static
设置 top，right，bottom，left，z-index 属性无效

2. Relative
设置 top, left 等属性有效；
一个相对定位的元素会成为后代中 position: absolute 元素的定位参照

3. Absolute
相对于最近的已定位祖先元素定位 (设置了 relative, absolute, fixed, sticky 的祖先元素)
位置由 top, left 等属性决定

4. Fixed
相对浏览器视口进行定位
位置由 top, left 等决定

5. Sticky
类似于 relative + fixed，在正常滚动时类似于 relative，在滚动到屏幕的特定位置时类似于 fixed
必须设置 top, tight, bottom, left 中的至少一个

## BFC、IFC 是什么

- **BFC (Block Formatting Context)**，即 **块格式化上下文**，是一个独立的块级布局环境，里面的元素布局**不会影响到外部**。
- **IFC (Inline Formatting Context)**，即 **内联格式化上下文**，是一个独立的内联布局环境，用于规定内联级别元素**如何在其行内排列**。

**对于 BFC：**
应用一：防止外边距折叠 (Margin Collapse)，因为属于同一个 BFC 的两个相邻块级元素的垂直外边距会发生折叠 (Margin Collapse)。
应用二：清除浮动（防止父元素高度塌陷），因为BFC 的高度会包含其内部的浮动元素
应用三：防止元素被浮动元素覆盖（自适应两栏布局），因为BFC 是一个隔离的独立容器，内外互不影响

**对于 IFC：**
- **水平排列**：在 IFC 中，元素会从包含块的顶部开始，一个接一个地**水平排列**。
- **对齐方式**：`text-align` 决定了它们在行内的水平对齐方式（`left`, `right`, `center`）。`vertical-align` 决定了元素在行内的垂直对齐方式（`top`, `middle`, `bottom`）。
- **换行**：当一行放不下所有行内元素时，会自动换到下一行，形成一个**行盒 (Line Box)**。
- **不可设置宽高**：直接位于 IFC 中的行内元素（非 `inline-block`）的 `width` 和 `height` 属性是无效的。其尺寸由内容（如文字大小）决定。垂直方向的 `padding` 和 `margin` 也不会影响其他块级元素的位置。

**简单来说，IFC 就是我们日常看到的文本段落的排版规则。**

|特性|BFC (块级格式化上下文)|IFC (行内格式化上下文)|
|---|---|---|
|**处理对象**|块级盒子 (Block-level boxes)|行内级盒子 (Inline-level boxes)|
|**布局方向**|垂直方向，一个接一个地放置|水平方向，一个接一个地放置|
|**核心作用**|创建一个隔离的布局环境，用于清除浮动、防止外边距折叠、实现自适应布局|规定行内元素的排列、对齐和换行规则|
|**触发方式**|`float`, `position`, `overflow`, `display: flex/grid/inline-block` 等|由包含行内级元素的块级容器自动创建|


