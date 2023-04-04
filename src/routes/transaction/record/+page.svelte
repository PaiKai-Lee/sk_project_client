<script lang="ts">
	import Table from '$lib/components/Table.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let records = data.transactionRecords;
</script>

<svelte:head>
	<title>交易紀錄</title>
</svelte:head>

<div class="my-8">
	<Table columns={['名稱', '扣款', '存入', '備註', '建立時間']} footer={true}>
		{#if records}
			{#each records as { id, orderId, save, cost, remark, userName, createdAt } (id)}
				<tr class="font-extrabold">
					<td class={cost > save ? 'bg-error' : 'bg-base-300'}>{userName}</td>
					<td class={cost > save ? 'bg-error' : 'bg-base-300'}>{cost}</td>
					<td class={cost > save ? 'bg-error' : 'bg-base-300'}>{save}</td>
					<td class={cost > save ? 'bg-error' : 'bg-base-300'}>{remark}</td>
					<td class={cost > save ? 'bg-error' : 'bg-base-300'}>{createdAt}</td>
				</tr>
			{/each}
		{/if}
	</Table>
</div>
