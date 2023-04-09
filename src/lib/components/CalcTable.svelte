<script lang="ts">
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
								value="{item.cost}"
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
					<button type="button" class="btn btn-outline" disabled>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="animate-spin mr-3 w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
							/>
						</svg>
						Processing...
					</button>
				{:else}
					<button class="btn btn-outline btn-primary" disabled={confirmData.length === 0}
						>送出</button
					>
				{/if}
			</div>
		</form>
	</div>
</div>
