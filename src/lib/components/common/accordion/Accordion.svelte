<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  export let colapse = false;

  const activeComponentId = writable(null);

  setContext('colapse', colapse);
  setContext('active', activeComponentId);
</script>

<div class="w-full p-2 text-xl border-gray-300 text-black bg-white rounded-lg shadow-lg">
  <slot />
</div>
