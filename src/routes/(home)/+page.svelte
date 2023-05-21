<script lang="ts">
	import Banner from '$lib/components/Banner.svelte';
	import PartnerTag from '$lib/components/PartnerTag.svelte';
	import { faker } from '@faker-js/faker';
	const users = new Array(100).fill(0).map((item, idx) => {
		return {
			id: idx + 1,
			name: faker.person.firstName(),
			department: faker.company.buzzVerb(),
			avatar: faker.image.avatar()
		};
	});
</script>

<svelte:head>
	<title>首頁</title>
</svelte:head>

<Banner />
<div class="container mt-8 h-full mx-auto flex-1 xl:px-4">
	<section class="flex mx-auto h-[320px]">
		<div class="flex-auto w-80">
			<div class="p-3">
				<h3 class="text-xl font-bold">Company Partners</h3>
				<p>Lorem ipsum dolor sit amet</p>
			</div>
		</div>
		<div class="overflow-hidden flex-auto grid grid-cols-8 grid-flow-row gap-6 justify-start">
			{#each users as { id, ...user } (id)}
				<PartnerTag {...user} />
			{/each}
		</div>
	</section>
</div>
