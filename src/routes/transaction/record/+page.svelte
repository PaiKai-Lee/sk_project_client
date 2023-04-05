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
				{@const bgCondition = cost > save ? 'bg-error' : 'bg-base-300'}
				<tr class="font-extrabold">
					<td class={bgCondition}>{userName}</td>
					<td class={bgCondition}>{cost > 0 ? -cost : 0}</td>
					<td class={bgCondition}>{save}</td>
					<td class={bgCondition}>{remark}</td>
					<td class={bgCondition}>{createdAt}</td>
				</tr>
			{/each}
		{/if}
	</Table>
</div>
