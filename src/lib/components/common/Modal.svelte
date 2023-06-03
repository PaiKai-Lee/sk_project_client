<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  type ItemAlign = 'start' | 'center' | 'end';

  const modalStatus = writable(false);
  export let showModal: boolean = false;
  export let itemAlign: ItemAlign = 'start';
  $: $modalStatus = showModal;
  setContext('modalStatus', modalStatus);

  function flexAlign(itemAlign: ItemAlign) {
    switch (itemAlign) {
      case 'start':
        return 'items-start';
      case 'center':
        return 'items-center';
      case 'end':
        return 'items-end';
      default:
        return 'items-start';
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  on:click|self={() => (showModal = false)}
  class="w-full h-full fixed top-0 left-0 bg-black/50 z-50 flex justify-center {flexAlign(
    itemAlign
  )} p-4 {!showModal && 'hidden'}"
>
  <slot />
</div>
