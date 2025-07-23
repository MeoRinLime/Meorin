// 性能优化配置
const PERFORMANCE_CONFIG = {
  MAX_PARTICLES: 300,
  CLICK_THROTTLE: 16, // ~60fps
  CLEANUP_INTERVAL: 2000,
  PARTICLE_COUNT_PER_CLICK: 12, // 减少从20到12
};

// 粒子对象池 - 避免频繁创建/销毁DOM元素
class ParticlePool {
  private pool: HTMLElement[] = [];
  private activeParticles = new Set<HTMLElement>();

  constructor(initialSize: number = 50) {
    // 预创建粒子元素
    for (let i = 0; i < initialSize; i++) {
      const particle = this.createParticleElement();
      this.pool.push(particle);
    }
  }

  private createParticleElement(): HTMLElement {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.position = 'fixed';
    particle.style.pointerEvents = 'none';
    particle.style.borderRadius = '50%';
    particle.style.zIndex = '1000';
    particle.style.willChange = 'transform, opacity'; // GPU加速
    return particle;
  }

  getParticle(): HTMLElement | null {
    if (this.activeParticles.size >= PERFORMANCE_CONFIG.MAX_PARTICLES) {
      return null; // 达到上限，拒绝创建新粒子
    }

    let particle = this.pool.pop();
    if (!particle) {
      particle = this.createParticleElement();
    }

    this.activeParticles.add(particle);
    return particle;
  }

  releaseParticle(particle: HTMLElement): void {
    if (this.activeParticles.has(particle)) {
      this.activeParticles.delete(particle);
      
      // 重置样式
      particle.style.opacity = '1';
      particle.style.transform = '';
      
      // 从DOM中移除
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
      
      // 返回对象池（限制池大小）
      if (this.pool.length < 100) {
        this.pool.push(particle);
      }
    }
  }

  getActiveCount(): number {
    return this.activeParticles.size;
  }
}

// 动画管理器 - 统一管理所有动画
class AnimationManager {
  private animations = new Map<HTMLElement, {
    startTime: number;
    duration: number;
    initialX: number;
    initialY: number;
    dx: number;
    dy: number;
  }>();

  private animationFrame: number | null = null;

  addAnimation(
    particle: HTMLElement,
    x: number,
    y: number,
    dx: number,
    dy: number,
    duration: number = 1000
  ): void {
    this.animations.set(particle, {
      startTime: performance.now(), // 使用performance.now()替代Date.now()
      duration,
      initialX: x,
      initialY: y,
      dx,
      dy,
    });

    // 启动动画循环（如果还没启动）
    if (!this.animationFrame) {
      this.startAnimationLoop();
    }
  }

  private startAnimationLoop(): void {
    const animate = (currentTime: number) => {
      let hasActiveAnimations = false;

      // 批量更新所有动画
      this.animations.forEach((animation, particle) => {
        const elapsed = currentTime - animation.startTime;
        const progress = elapsed / animation.duration;

        if (progress < 1) {
          // 使用transform替代left/top，性能更好
          const currentX = animation.initialX + animation.dx * progress;
          const currentY = animation.initialY + animation.dy * progress + (progress * progress * 200);
          const opacity = 1 - progress;

          particle.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
          particle.style.opacity = opacity.toString();

          hasActiveAnimations = true;
        } else {
          // 动画完成，清理
          this.animations.delete(particle);
          particlePool.releaseParticle(particle);
        }
      });

      // 继续动画循环或停止
      if (hasActiveAnimations) {
        this.animationFrame = requestAnimationFrame(animate);
      } else {
        this.animationFrame = null;
      }
    };

    this.animationFrame = requestAnimationFrame(animate);
  }

  getActiveCount(): number {
    return this.animations.size;
  }
}

// 节流函数
function throttle<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastTime = 0;
  return (...args: Parameters<T>) => {
    const now = performance.now();
    if (now - lastTime >= delay) {
      lastTime = now;
      func(...args);
    }
  };
}

// 创建单例实例
const particlePool = new ParticlePool();
const animationManager = new AnimationManager();

// 优化后的粒子效果函数
function createParticleEffect(x: number, y: number): void {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'];
  
  // 动态调整粒子数量基于当前性能
  const activeCount = particlePool.getActiveCount();
  const maxNewParticles = Math.min(
    PERFORMANCE_CONFIG.PARTICLE_COUNT_PER_CLICK,
    PERFORMANCE_CONFIG.MAX_PARTICLES - activeCount
  );

  for (let i = 0; i < maxNewParticles; i++) {
    const particle = particlePool.getParticle();
    if (!particle) break; // 达到上限

    // 设置初始样式
    const size = Math.random() * 8 + 4;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.left = '0px'; // 重置，将使用transform
    particle.style.top = '0px';
    particle.style.transform = `translate3d(${x}px, ${y}px, 0)`;

    // 添加到DOM
    document.body.appendChild(particle);

    // 计算运动参数
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 150 + 80; // 稍微降低速度
    const dx = Math.cos(angle) * velocity;
    const dy = Math.sin(angle) * velocity;

    // 添加到动画管理器
    animationManager.addAnimation(particle, x, y, dx, dy, 900); // 稍微缩短动画时间
  }
}

// 节流的点击处理器
const throttledParticleEffect = throttle(createParticleEffect, PERFORMANCE_CONFIG.CLICK_THROTTLE);

// 全局点击事件监听
document.addEventListener('click', (e: MouseEvent) => {
  const x = e.clientX;
  const y = e.clientY;
  throttledParticleEffect(x, y);
});

// 优化的清理机制 - 使用更高效的定时器
let cleanupTimer: number | null = null;

function scheduleCleanup(): void {
  if (cleanupTimer) return;

  cleanupTimer = window.setTimeout(() => {
    // 强制清理所有过期的粒子（紧急情况）
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
      const el = particle as HTMLElement;
      const opacity = parseFloat(el.style.opacity || '1');
      if (opacity < 0.01) {
        particlePool.releaseParticle(el);
      }
    });

    cleanupTimer = null;
    
    // 如果还有活跃粒子，继续调度清理
    if (particlePool.getActiveCount() > 0) {
      scheduleCleanup();
    }
  }, PERFORMANCE_CONFIG.CLEANUP_INTERVAL);
}

// 监听页面可见性 - 页面不可见时暂停动画
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // 页面隐藏时清理所有粒子以节省资源
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
      particlePool.releaseParticle(particle as HTMLElement);
    });
  }
});

// 启动清理调度
scheduleCleanup();

// 可选：性能监控（开发环境使用）
if (process.env.NODE_ENV === 'development') {
  setInterval(() => {
    console.log(`Active particles: ${particlePool.getActiveCount()}, Active animations: ${animationManager.getActiveCount()}`);
  }, 5000);
}