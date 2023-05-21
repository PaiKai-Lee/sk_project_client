<script lang="ts">
	import { userStore } from '$lib/stores';
	import avatar from '$lib/assets/avatar.svg';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-label-has-associated-control -->
<div class="navbar h-[72px] min-h-[72px] bg-base-100 border-b-2">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost normal-case text-2xl">SK_System</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			<li><a href="/progress">專案項目</a></li>
			{#if $userStore.isAuth && ($userStore.role === 'Admin' || $userStore.role === 'SuperAdmin')}
				<li><a href="/admin">管理者</a></li>
			{/if}
			<li>
				<a href="/transaction">
					交易
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
					<li><a href="/transaction/main">交易主功能</a></li>
					<li><a href="/transaction/record">交易紀錄</a></li>
					<li><a href="/transaction/leaderboard">餘額排行榜</a></li>
				</ul>
			</li>
			<li>
				<label class="avatar">
					<div class="rounded-full">
						<img alt="avatar" src={avatar} />
					</div>
				</label>
				<ul class="p-2 bg-base-100 z-50 right-0">
					{#if $userStore.isAuth}
						<div class="border-b-2">
							<p class="text-base text-center font-extrabold py-2 mb-2 rounded-lg bg-base-200">
								{$userStore.name}
							</p>
						</div>
						<li>
							<button
								on:click={() => {
									dispatch('showModal');
								}}
							>
								變更密碼
							</button>
						</li>
					{/if}
					{#if $userStore.isAuth && localStorage.getItem('accessToken')}
						<li>
							<button
								on:click={() => {
									dispatch('logout');
								}}>登出</button
							>
						</li>
					{:else}
						<li><a href="/login">登入</a></li>
					{/if}
				</ul>
			</li>
		</ul>
	</div>
</div>
