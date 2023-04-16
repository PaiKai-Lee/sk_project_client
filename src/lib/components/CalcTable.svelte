<script lang="ts">
	import LoadingBtn from './LoadingBtn.svelte';

	export let confirmData: any = [];
	export let columns: string[];
	export let loading: boolean = false;
</script>

<div class="card min-w-96 max-h-full overflow-auto bg-white">
	<div class="card-body w-[720px]">
		<form on:submit|preventDefault>
			<div class="flex flex-col">
				<ul class="mb-4">
					<li class="flex justify-around p-2">
						{#each columns as column}
							<p class="w-1/4">{column}</p>
						{/each}
					</li>
					{#each confirmData as item}
						<li
							class="flex justify-around p-2 last:rounded-b-md {item.save - item.cost >= 0
								? 'bg-base-200'
								: 'bg-warning'}"
						>
							<p class="w-1/4">{item.name}</p>
							<input
								data-id={item.id}
								type="number"
								name="cost-{item.id}"
								value={item.cost}
								class="bg-inherit focus:outline-none w-1/4"
								readonly
							/>
							<input
								type="number"
								name="save-{item.id}"
								value={item.save}
								class="bg-inherit focus:outline-none w-1/4"
								readonly
							/>
							<input
								type="text"
								name="remark-{item.id}"
								value={item.remark}
								class="bg-inherit focus:outline-none w-1/4"
								readonly
							/>
						</li>
					{/each}
				</ul>
				{#if loading}
					<LoadingBtn />
				{:else}
					<button class="btn btn-outline btn-primary" disabled={confirmData.length === 0}
						>送出</button
					>
				{/if}
			</div>
		</form>
	</div>
</div>
