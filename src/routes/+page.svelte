<script lang="ts">
	import { goto } from '$app/navigation';
	import { userStorage } from '$lib/stores';

	if (!$userStorage.isAuth) {
		goto('/login');
	}
</script>

{#if $userStorage.isAuth}
	<h1 class="text-3xl font-bold underline">Hello world!</h1>
{/if}
