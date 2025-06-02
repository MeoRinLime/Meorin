<script lang="ts">
  import { onMount } from 'svelte';
  import { getClientI18n } from '../locales/translation';
  import type I18nKeys from '../locales/keys';

  let currentLocale = 'zh-CN';
  let i18n: (key: I18nKeys, ...interpolations: string[]) => string;

  const supportedLocales = [
    { code: 'zh-CN', name: '中文'},
    { code: 'en', name: 'English'}
  ];

  function updatePageTexts() {
    // 更新所有带有 data-i18n 属性的元素
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (key) {
        const translatedText = i18n(key as I18nKeys);
        if (element.tagName === 'INPUT' && element.getAttribute('type') === 'text') {
          (element as HTMLInputElement).placeholder = translatedText;
        } else {
          element.textContent = translatedText;
        }
      }
    });

    // 更新页面标题
    const titleElement = document.querySelector('title');
    if (titleElement) {
      // 这里可以根据需要更新页面标题
    }
  }

  function switchLanguage(locale: string) {
    currentLocale = locale;
    localStorage.setItem('locale', locale);
    i18n = getClientI18n(locale);
    
    // 更新页面中的文本
    updatePageTexts();
    
    // 触发自定义事件，通知其他组件语言已切换
    window.dispatchEvent(new CustomEvent('localeChanged', { 
      detail: { locale } 
    }));
  }

  onMount(() => {
    // 初始化当前语言
    const savedLocale = localStorage.getItem('locale') || 'zh-CN';
    currentLocale = savedLocale;
    i18n = getClientI18n(savedLocale);

    // 监听语言切换事件
    window.addEventListener('localeChanged', () => {
      updatePageTexts();
    });

    // 初始化时更新一次页面文本
    setTimeout(updatePageTexts, 100);
  });
</script>

<div class="language-switcher">
  <div class="relative">
    <button
      type="button"
      class="flex items-center space-x-1 rounded-lg px-2 py-1 text-[var(--text-color)] transition-all hover:bg-[var(--primary-color-hover)] hover:text-[var(--primary-color)]"
      on:click={() => {
        const dropdown = document.querySelector('.language-dropdown');
        dropdown?.classList.toggle('hidden');
      }}
    >
      {#each supportedLocales as locale}
        {#if locale.code === currentLocale}
          <span class="hidden sm:inline">{locale.name}</span>
        {/if}
      {/each}
    </button>
    
    <div class="language-dropdown absolute right-0 top-full mt-1 hidden w-32 rounded-lg bg-[var(--card-color)] shadow-lg border border-[var(--border-color)] z-50">
      {#each supportedLocales as locale}
        <button
          type="button"
          class="flex w-full items-center space-x-2 px-3 py-2 text-left text-[var(--text-color)] transition-all hover:bg-[var(--primary-color-lighten)] first:rounded-t-lg last:rounded-b-lg"
          class:bg-[var(--primary-color-lighten)]={locale.code === currentLocale}
          on:click={() => {
            switchLanguage(locale.code);
            document.querySelector('.language-dropdown')?.classList.add('hidden');
          }}
        >
          <span>{locale.name}</span>
        </button>
      {/each}
    </div>
  </div>
</div>

<!-- 点击外部关闭下拉菜单 -->
<svelte:window on:click={(e) => {
  const dropdown = document.querySelector('.language-dropdown');
  const switcher = document.querySelector('.language-switcher');
  if (dropdown && e.target instanceof Node && !switcher?.contains(e.target)) {
    dropdown.classList.add('hidden');
  }
}} />
