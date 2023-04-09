<script lang="ts">
	import '../app.css';
	import Alert from '$lib/components/Alert.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import { userStore } from '$lib/stores';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	userStore.set(data?.user);
</script>

<Alert />
<div class="min-h-screen">
	<Nav />
	<div class="container h-full mx-auto xl:px-4">
		<slot />
	</div>
</div>
