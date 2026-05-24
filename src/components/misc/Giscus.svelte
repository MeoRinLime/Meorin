<script lang="ts">
  import { onMount } from "svelte";
  import Giscus from "@giscus/svelte";

  export let repo: `${string}/${string}`;
  export let repoId: string;
  export let category: string;
  export let categoryId: string;

  let theme: "light" | "dark" = "light";

  function updateTheme() {
    theme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  }

  onMount(() => {
    updateTheme();

    const observer = new MutationObserver(() => {
      updateTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });

    return () => observer.disconnect();
  });
</script>

<div class="giscus-wrapper">
  <Giscus
    {repo}
    {repoId}
    {category}
    {categoryId}
    mapping="pathname"
    strict="1"
    reactionsEnabled="1"
    emitMetadata="0"
    inputPosition="top"
    {theme}
    lang="zh-CN"
  />
</div>

<style>
  .giscus-wrapper {
    @apply mt-8;
  }
</style>
