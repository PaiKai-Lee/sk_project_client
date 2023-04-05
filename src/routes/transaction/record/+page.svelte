<script lang="ts">
	import Pagination from '$lib/components/Pagination.svelte';
	import Table from '$lib/components/Table.svelte';
	import transactionService from '$lib/services/transaction';
	import type { PageData } from './$types';

	export let data: PageData;
	let records = data.transactionRecords;

	let userName: string;
	let limit: number;
	let order: string;
	let currentPage = 1;

	async function clickPageHandler(e: MouseEvent) {
		currentPage = +e.target.dataset.page;
		const [result, err] = await transactionService.getRecords({
			limit,
			order,
			page: currentPage,
			user: userName
		});
		const organizeRecords = transactionService.organizeRecords(result);
		records = organizeRecords;
	}
</script>

<svelte:head>
	<title>交易紀錄</title>
</svelte:head>

<div class="py-2 sticky z-20 top-0 backdrop-blur-md flex justify-end gap-4">
	<input
		type="text"
		placeholder="名稱"
		class="input input-bordered input-group-md w-full max-w-[14rem]"
		bind:value={userName}
	/>
	<select class="select select-bordered w-full max-w-[10rem]" bind:value={limit}>
		<option disabled selected>數量</option>
		<option value="10">10</option>
		<option value="25" selected>25</option>
		<option value="40">40</option>
	</select>

	<select class="select select-bordered w-full max-w-[10rem]" bind:value={order}>
		<option value="desc" selected>新到舊</option>
		<option value="asc">舊到新</option>
	</select>
	<button class="btn btn-primary">查詢</button>
</div>
<Table columns={['名稱', '扣款', '存入', '備註', '建立時間']} footer={true}>
	{#if records}
		{#each records as { id, orderId, save, cost, remark, userName, createdAt } (id)}
			{@const bgCondition = cost > save ? 'bg-error' : 'bg-base-300'}
			<tr class="font-extrabold">
				<td class="{bgCondition} w-1/6">{userName}</td>
				<td class="{bgCondition} w-1/6">{cost > 0 ? -cost : 0}</td>
				<td class="{bgCondition} w-1/6">{save}</td>
				<td class="{bgCondition} w-2/6"
					><input
						type="text"
						class="w-full focus:outline-none bg-transparent"
						value={remark}
						readonly
					/></td
				>
				<td class="{bgCondition} w-1/6">{createdAt}</td>
			</tr>
		{/each}
	{/if}
</Table>
<div class="text-center mt-4">
	<Pagination bind:currentPage pages={10} on:click={clickPageHandler} />
</div>
