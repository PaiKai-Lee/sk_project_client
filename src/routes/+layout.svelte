<script lang="ts">
	import '../app.css';
	import Alert from '$lib/components/Alert.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import { userStorage } from '$lib/stores';
	import { goto } from '$app/navigation';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	if (!data?.user) {
		goto('/login');
	} else {
		userStorage.set({ ...data.user, isAuth: true });
	}

	console.log('layout svelte');
</script>

<Alert />
<div class="min-h-screen">
	<Nav />
	<div class="container h-full mx-auto xl:px-4">
		<slot />
	</div>
</div>
