<script lang="ts">
  import PageTitle from '$lib/components/common/PageTitle.svelte';
  import Table from '$lib/components/common/Table.svelte';
  import Toggle from '$lib/components/common/Toggle.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  interface userBalance {
    id: number;
    name: string;
    role: string;
    points: number;
  }

  let records: userBalance[] | undefined = data.records;
  let isDeficit = false;
  $: filterRecords = isDeficit ? records?.filter((record) => record.points < 0) : records;
  $: calcBalance = filterRecords?.reduce((previous, current) => current.points + previous, 0) || 0;
</script>

<svelte:head>
  <title>餘額排行榜</title>
</svelte:head>
<PageTitle>餘額排行榜</PageTitle>
<div class="sticky z-20 top-0 backdrop-blur-md flex justify-end gap-4">
  <Toggle bind:switchToggle={isDeficit}>赤字名單</Toggle>
</div>
<Table columns={['名稱', '餘額']} footer>
  {#if filterRecords}
    {#each filterRecords as { id, name, points } (id)}
      {@const bgCondition = points < 0 ? 'bg-error' : 'bg-base-300'}
      <tr class="font-extrabold">
        <td class="{bgCondition} w-1/4">{name}</td>
        <td class="{bgCondition} w-3/4">{points}</td>
      </tr>
    {/each}
    <tr class="font-extrabold">
      <td class="w-1/4">總計 :</td>
      <td class="w-3/4">{calcBalance}</td>
    </tr>
  {/if}
</Table>
