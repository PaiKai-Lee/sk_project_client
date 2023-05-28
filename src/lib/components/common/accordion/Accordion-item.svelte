<script lang="ts">
  import { getContext } from 'svelte';
  import { slide } from 'svelte/transition';
  import type { ActiveIdContext, ColapseContext } from './types';
  const componentId = crypto.randomUUID();
  const colapse = getContext('colapse') as ColapseContext;
  const activeComponentId = getContext('active') as ActiveIdContext;
  export let open = false;

  function setActive() {
    activeComponentId.set(componentId);
  }

  function toggleOpen() {
    open = !open;
  }

  function handleClick() {
    if (colapse && isOpen) {
      return activeComponentId.set(null);
    }
    colapse ? setActive() : toggleOpen();
  }

  $: colapse && open && setActive();
  $: isActive = $activeComponentId === componentId;
  $: isOpen = colapse ? isActive : open;
  $: rotateDeg = isOpen ? 'rotate-90' : 'rotate-0';
</script>

<button
  class="flex justify-between items-center w-full p-2 text-inherit font-semibold bg-none cursor-pointer rounded-md transition-colors duration-300 ease-in-out hover:bg-base-200"
  on:click={handleClick}
>
  <div>
    <slot name="title">Title</slot>
  </div>

  <div class="p-3 {rotateDeg} transition-transform duration-300 ease-in-out">➤</div>
</button>

<div class="border-[1px] border-gray-100"></div>

{#if isOpen}
  <div transition:slide|local class="p-4 text-lg">
    <slot name="content">Content</slot>
  </div>
{/if}
