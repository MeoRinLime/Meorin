---
title: 腾讯WXG公众号和小程序团队一面
published: 2025-07-31
description: 2026秋招提前批腾讯WXG公众号和小程序团队前端一面
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

> 手撕：一个支持重试和自动刷新和手动刷新的token获取器

```typescript
// 描述：

// 您的任务是使用 TypeScript 实现一个 TokenManager 类，用于高效地管理应用程序与 API 交互时的身份验证令牌（token）。这些令牌需要定期刷新，并在过期时失效。可能会有多个组件同时请求令牌，但是请保证同时只有一个真正发起的请求。请求成功后，这些组件获取到同一个令牌。

// 这些令牌 (Token) 来源于后台的接口（可以使用 setTimeout 去模拟一个异步返回的后台接口）。

// 这些令牌会携带服务端的生成时间和过期时间，你需要在读取到一个过期的令牌时自动刷新。

// 需求:
// 需要实现的方法：
// getToken(): Promise<string>：异步返回当前有效的令牌。如果令牌已过期或无效，应在返回之前刷新令牌。
// getTokenSync(): string | undefined：同步返回当前有效的令牌。如果令牌已过期或无效，应返回 undefined。
// refresh(): Promise<void>：强制刷新令牌。如果同时有多个刷新请求，确保只进行一次实际的刷新，并在新令牌可用后让所有调用者都能获得同一个令牌。

  

// 加分项：
// 如果令牌不是字符串，是否可以支持任意类型（通过 TypeScript 泛型）？
// 返回的令牌是否可以支持手动过期某个令牌（token.invalidate()），从而使得手握该令牌的过期请求，不要重复发出？
// 能否实现在令牌即将过期的时候，主动发起一次更新（比如 3600 秒过期，在 3000 秒的时候就发起刷新令牌）但是在主动刷新过程中，旧令牌依旧可用？

// 令牌数据接口
interface TokenData {
  token: string;
  iat: number; // 签发时间 (issued at)
  exp: number; // 过期时间 (expiration time，单位：秒)
}


// 令牌包装类，支持手动失效
class Token<T = string> {
  private _isValid = true;
  constructor(
    public readonly value: T,
    public readonly issuedAt: number,
    public readonly expiresIn: number // 过期时间（秒）
  ) {}
  // 检查令牌是否过期
  get isExpired(): boolean {
    const now = Date.now();
    const expiresAt = this.issuedAt + this.expiresIn * 1000;
    return now >= expiresAt;
  }

  // 检查令牌是否有效（未手动失效且未过期）
  get isValid(): boolean {
    return this._isValid && !this.isExpired;
  }

  // 获取剩余有效时间（毫秒）
  get remainingTime(): number {
    if (!this._isValid) return 0;
    const now = Date.now();
    const expiresAt = this.issuedAt + this.expiresIn * 1000;
    return Math.max(0, expiresAt - now);
  }

  // 手动使令牌失效
  invalidate(): void {
    this._isValid = false;
  }
}

  

// 模拟后台接口
function mockGetToken(): Promise<TokenData> {
  return new Promise(resolve =>
    setTimeout(() => resolve({
      token: `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      iat: Date.now(),
      exp: 3600
    }), 1000)
  );
}
  
// 令牌管理器配置
interface TokenManagerConfig {
  refreshThreshold?: number; // 提前刷新阈值（秒），默认600秒（10分钟）
  enableAutoRefresh?: boolean; // 是否启用自动刷新，默认true
}

class TokenManager<T = string> {
  private currentToken: Token<T> | null = null;
  private refreshPromise: Promise<Token<T>> | null = null;
  private refreshTimer: ReturnType<typeof setTimeout> | null = null;
  private config: Required<TokenManagerConfig>;
  constructor(
    private tokenFetcher: () => Promise<TokenData>,
    config: TokenManagerConfig = {}
  ) {
    this.config = {
      refreshThreshold: 600, // 默认提前10分钟刷新
      enableAutoRefresh: true,
      ...config
    };
  }
 
  /**
   * 异步获取当前有效的令牌
   */
  public async getToken(): Promise<T> {
    // 如果当前令牌仍然有效，直接返回
    if (this.currentToken?.isValid) {
      return this.currentToken.value;
    }
    
    // 如果已经有刷新请求在进行中，等待该请求完成
    if (this.refreshPromise) {
      const token = await this.refreshPromise;
      return token.value;
    }

    // 发起新的刷新请求
    return (await this.refresh()).value;
  }

  /**
   * 同步获取当前有效的令牌
   */
  public getTokenSync(): T | undefined {
    if (this.currentToken?.isValid) {
      return this.currentToken.value;
    }
    return undefined;
  }

  /**
   * 强制刷新令牌
   */
  public async refresh(): Promise<Token<T>> {
    // 如果已经有刷新请求在进行中，返回该请求
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    // 创建新的刷新请求
    this.refreshPromise = this.performRefresh();
    try {
      const newToken = await this.refreshPromise;
      return newToken;
    } finally {
      // 清除刷新请求标记
      this.refreshPromise = null;
    }
  }

  /**
   * 执行实际的令牌刷新操作
   */
  private async performRefresh(): Promise<Token<T>> {
    try {
      console.log('🔄 开始刷新令牌...');
      const tokenData = await this.tokenFetcher();
      // 创建新的令牌包装对象
      const newToken = new Token<T>(
        tokenData.token as T,
        tokenData.iat,
        tokenData.exp
      );
      
      // 更新当前令牌
      this.currentToken = newToken;

      // 设置自动刷新定时器
      this.scheduleAutoRefresh(newToken);
      console.log('✅ 令牌刷新成功:', {
        token: tokenData.token,
        expiresIn: tokenData.exp,
        remainingTime: Math.round(newToken.remainingTime / 1000) + 's'
      });
      
      return newToken;
    } catch (error) {
      console.error('❌ 令牌刷新失败:', error);
      throw error;
    }
  }

  /**
   * 安排自动刷新
   */
  private scheduleAutoRefresh(token: Token<T>): void {
    if (!this.config.enableAutoRefresh) return;
    // 清除之前的定时器
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }

    // 计算提前刷新的时间点
    const refreshTime = Math.max(
      1000, // 至少1秒后刷新
      token.remainingTime - this.config.refreshThreshold * 1000
    );
    console.log(`⏰ 安排自动刷新，${Math.round(refreshTime / 1000)}秒后执行`);
    this.refreshTimer = setTimeout(async () => {
      try {
        console.log('🎯 执行自动刷新...');
        await this.refresh();
      } catch (error) {
        console.error('⚠️ 自动刷新失败:', error);
        // 如果自动刷新失败，可以安排重试
        if (this.currentToken?.isValid) {
          this.scheduleAutoRefresh(this.currentToken);
        }
      }
    }, refreshTime);
  }

  /**
   * 获取当前令牌对象（包含完整信息）
   */
  public getCurrentToken(): Token<T> | null {
    return this.currentToken;
  }

  /**
   * 检查令牌是否即将过期
   */
  public isTokenExpiringSoon(thresholdSeconds: number = this.config.refreshThreshold): boolean {
    if (!this.currentToken?.isValid) return true;
    return this.currentToken.remainingTime <= thresholdSeconds * 1000;
  }

  /**
   * 清理资源
   */
  public destroy(): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
    if (this.currentToken) {
      this.currentToken.invalidate();
      this.currentToken = null;
    }
    this.refreshPromise = null;
  }
}

```