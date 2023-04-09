<script lang="ts">
	import { goto } from '$app/navigation';
	import { userStore } from '$lib/stores';
	
	if (!$userStore.isAuth) goto('/login');
</script>

{#if $userStore.isAuth}
	<h1 class="text-3xl font-bold underline">Hello world!</h1>
{/if}
