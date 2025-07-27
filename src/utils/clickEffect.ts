
// 性能配置
const PERFORMANCE_CONFIG = {
    MAX_PARTICLES: 200,
    CLICK_THROTTLE: 16, // 最小点击间隔(ms) ~60fps
    PARTICLE_COUNT_PER_CLICK: 15,
    CANVAS_Z_INDEX: 1000
};

// 粒子接口
interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    opacity: number;
    life: number;
    maxLife: number;
}

// 全局状态管理
let lastClickTime = 0;
let activeParticles: Particle[] = [];
let isListenerAttached = false;
let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let animationId: number | null = null;
let isInitialized = false;

function createCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = PERFORMANCE_CONFIG.CANVAS_Z_INDEX.toString();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    const context = canvas.getContext('2d');
    if (context) {
        context.scale(dpr, dpr);
    }
    document.body.appendChild(canvas);
    return canvas;
}

function updateCanvasSize() {
    if (!canvas || !ctx) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(dpr, dpr);
}

function attachEventListeners() {
    if (isListenerAttached) return;
    document.addEventListener('click', handleClick);
    window.addEventListener('resize', updateCanvasSize);
    isListenerAttached = true;
}

function handleClick(e: MouseEvent) {
    const now = Date.now();
    if (now - lastClickTime < PERFORMANCE_CONFIG.CLICK_THROTTLE) {
        return;
    }
    lastClickTime = now;
    const x = e.clientX;
    const y = e.clientY;
    createParticleEffect(x, y);
}

function createParticleEffect(x: number, y: number) {
    if (activeParticles.length >= PERFORMANCE_CONFIG.MAX_PARTICLES) {
        return;
    }
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'];
    for (let i = 0; i < PERFORMANCE_CONFIG.PARTICLE_COUNT_PER_CLICK; i++) {
        if (activeParticles.length >= PERFORMANCE_CONFIG.MAX_PARTICLES) {
            break;
        }
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 150 + 80;
        const size = Math.random() * 4 + 2;
        const life = Math.random() * 60 + 40;
        const particle: Particle = {
            x: x,
            y: y,
            vx: Math.cos(angle) * velocity / 60,
            vy: Math.sin(angle) * velocity / 60,
            size: size,
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: 1,
            life: life,
            maxLife: life
        };
        activeParticles.push(particle);
    }
    if (!animationId) {
        animate();
    }
}

function animate() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = activeParticles.length - 1; i >= 0; i--) {
        const particle = activeParticles[i];
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.3;
        particle.life--;
        particle.opacity = particle.life / particle.maxLife;
        if (particle.life <= 0) {
            activeParticles.splice(i, 1);
            continue;
        }
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
    if (activeParticles.length > 0) {
        animationId = requestAnimationFrame(animate);
    } else {
        animationId = null;
    }
}

function cleanup() {
    if (isListenerAttached) {
        document.removeEventListener('click', handleClick);
        window.removeEventListener('resize', updateCanvasSize);
        isListenerAttached = false;
    }
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    activeParticles.length = 0;
    if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
        canvas = null;
        ctx = null;
    }
    isInitialized = false;
}

function initClickEffect() {
    if (isInitialized) return;
    cleanup();
    canvas = createCanvas();
    ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('无法获取 Canvas 2D 上下文');
        return;
    }
    attachEventListeners();
    isInitialized = true;
}

function destroyClickEffect() {
    cleanup();
}

// Astro/swup 兼容性处理
if (typeof window !== 'undefined') {
    if (window.swup?.hooks) {
        initClickEffect();
        window.swup.hooks.on('content:replace', initClickEffect);
        window.swup.hooks.on('page:leave', destroyClickEffect);
    } else {
        document.addEventListener('swup:enable', () => {
            window.swup.hooks.on('content:replace', initClickEffect);
            window.swup.hooks.on('page:leave', destroyClickEffect);
        });
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initClickEffect);
        } else {
            initClickEffect();
        }
    }
}

export { initClickEffect, destroyClickEffect };