<!-- components/Alert.svelte -->
<script lang="ts">
  import { onDestroy } from 'svelte';
  import { alertToast } from '$lib/stores';
  import { fade, fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';

  interface AlertItem {
    type: 'info' | 'warning' | 'error';
    message: string;
  }

  export let ms = 3000;
  let timeout: number;

  const settingStyle = (type: string) => {
    switch (type) {
      case 'info':
        return 'alert-success';
      case 'warning':
        return 'alert-warning';
      case 'error':
        return 'alert-error';
      default:
        return 'alert-success';
    }
  };

  const onMessageChange = (alerts: AlertItem[], ms: number) => {
    clearTimeout(timeout);
    if (alerts.length > 0) {
      if (ms > 0)
        timeout = setTimeout(() => {
          alertToast.popout();
        }, ms);
    }
  };

  $: onMessageChange($alertToast, ms);

  onDestroy(() => clearTimeout(timeout));
</script>

{#if $alertToast.length > 0}
  <div class="fixed top-8 left-1/2 -translate-x-1/2 w-1/3 z-[99]">
    {#each $alertToast as alert, idx (alert.id)}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="alert shadow-lg my-3 cursor-pointer {settingStyle(alert.type)}"
        in:fly={{ delay: 250, duration: 300, x: 0, y: -100 * (idx + 2), opacity: 0.5 }}
        out:fade={{ delay: 250, duration: 300 }}
        animate:flip
        on:click={() => alertToast.filter(alert.id)}
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="stroke-current flex-shrink-0 w-6 h-6"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            /></svg
          >
          <span>{alert.message}</span>
        </div>
      </div>
    {/each}
  </div>
{/if}
