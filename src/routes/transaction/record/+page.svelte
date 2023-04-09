<script lang="ts">
	import Pagination from '$lib/components/Pagination.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Table from '$lib/components/Table.svelte';
	import transactionService from '$lib/services/transaction';
	import { scrollTo } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;
	let { count, limit, transactionRecords: records, page: currentPage } = data;
	let order = 'desc';
	let pages = Math.ceil(count / limit);
	let userName: string;

	async function clickPageHandler(e: MouseEvent) {
		currentPage = +e.target.dataset.page;
		const [result, err] = await transactionService.getRecords({
			limit,
			order,
			page: currentPage,
			user: userName
		});
		const organizeRecords = transactionService.organizeRecords(result.data);
		records = organizeRecords;
		pages = Math.ceil(count / limit);
		count = result.count;
	}

	async function searchHandler(e: MouseEvent) {
		const [result, err] = await transactionService.getRecords({
			limit,
			order,
			page: 1,
			user: userName
		});
		const organizeRecords = transactionService.organizeRecords(result.data);
		currentPage = 1;
		records = organizeRecords;
		pages = Math.ceil(count / limit);
		count = result.count;
		scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:head>
	<title>交易紀錄</title>
</svelte:head>

<div class="py-2 sticky z-20 top-0 backdrop-blur-md flex justify-end gap-4">
	<SearchBar bind:userName bind:limit bind:order on:click={searchHandler} />
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
	<Pagination bind:currentPage bind:pages on:click={clickPageHandler} />
</div>
