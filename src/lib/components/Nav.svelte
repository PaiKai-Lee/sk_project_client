<script lang="ts">
	import { goto } from '$app/navigation';
	import authService from '$lib/services/auth';
	import { userStore } from '$lib/stores';
	function clickHandler() {
		authService.logout();
		userStore.update((user) => (user = { ...user, isAuth: false }));
		goto('/login');
	}
</script>

<div class="navbar bg-base-200">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost normal-case text-xl">SK_System</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			{#if $userStore.isAuth}
				<li><button on:click={clickHandler}>Logout</button></li>
			{:else}
				<li><a href="/login">Login</a></li>
			{/if}
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<li tabindex="0">
				<a href="/transaction">
					交易系統
					<svg
						class="fill-current"
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg
					>
				</a>
				<ul class="p-2 bg-base-100 z-50">
					<li><a href="/transaction/main">交易主程式</a></li>
					<li><a href="/transaction/record">交易紀錄</a></li>
					<li><a href="/transaction/leaderboard">餘額排行榜</a></li>
				</ul>
			</li>
		</ul>
	</div>
</div>
