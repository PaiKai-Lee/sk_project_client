<script lang="ts">
	import '../app.css';
	import AlertToast from '$lib/components/common/AlertToast.svelte';
	import Nav from '$lib/components/common/Nav.svelte';
	import LoadingBtn from '$lib/components/common/LoadingBtn.svelte';
	import Modal from '$lib/components/common/Modal.svelte';
	import authService from '$lib/services/auth';
	import userService from '$lib/services/user';
	import { alertToast, userStore } from '$lib/stores';
	import { goto } from '$app/navigation';
	import type { LayoutData } from './$types';
	import { onDestroy, onMount } from 'svelte';
	import Footer from '$lib/components/common/Footer.svelte';

	export let data: LayoutData;
	let showModal = false;
	let isCheck = false;
	let isLoading = false;
	let password = '';
	let confirmPassword = '';
	let checkTimer: number | undefined;

	$: userStore.set(data?.user);

	onMount(() => {
		checkTimer = setTimeout(checkPwdChange, 5000);
	});

	onDestroy(() => {
		clearTimeout(checkTimer);
	});

	function checkPwdChange() {
		clearTimeout(checkTimer);
		if (!$userStore.isAuth) {
			checkTimer = setTimeout(checkPwdChange, 5000);
			return;
		}
		if ($userStore.pwdChanged === 0) {
			showModal = true;
			alertToast.addMessage({ type: 'error', message: '修改初始密碼' });
		}
	}

	function logout() {
		authService.logout();
		userStore.update((user) => (user = { ...user, isAuth: false }));
		goto('/login');
	}

	async function changePassword(e: SubmitEvent) {
		// 驗證
		if (!isCheck) {
			alertToast.addMessage({ type: 'error', message: '使否確認修改密碼' });
		}
		if (!password || !confirmPassword) {
			alertToast.addMessage({ type: 'error', message: '不能空白' });
			return;
		}
		if (password !== confirmPassword) {
			alertToast.addMessage({ type: 'error', message: '密碼必須一致' });
			return;
		}
		const re = /^[a-zA-Z0-9]{6,12}$/;
		const isValidation = re.exec(password);
		if (!isValidation) {
			alertToast.addMessage({ type: 'error', message: '密碼必須符合條件' });
			return;
		}
		isLoading = true;
		const [_, err] = await userService.changePassword({ password, confirmPassword });
		if (err) {
			alertToast.addMessage({ type: 'error', message: '更新失敗' });
			return;
		}
		alertToast.addMessage({ type: 'info', message: '密碼更新成功' });
		password = '';
		confirmPassword = '';
		isLoading = false;
		showModal = false;
		isCheck = false;
	}
</script>

<AlertToast />
<div class="h-screen flex flex-col">
	<Nav on:showModal={() => (showModal = true)} on:logout={logout} />
	<slot />
</div>

<Modal bind:showModal>
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
		<form class="card-body" on:submit|preventDefault={changePassword}>
			<div class="form-control">
				<label class="label">
					<span class="label-text">Password</span>
				</label>
				<input
					type="password"
					placeholder="password"
					class="input input-bordered"
					bind:value={password}
				/>
			</div>
			<div class="form-control">
				<label class="label">
					<span class="label-text">Confirm Password</span>
				</label>
				<input
					type="password"
					placeholder="confirm password"
					class="input input-bordered"
					bind:value={confirmPassword}
				/>
			</div>
			<div>
				<label class="flex justify-start items-center cursor-pointer gap-2">
					<input type="checkbox" class="checkbox checkbox-primary" bind:checked={isCheck} />
					<span class="label-text">確認密碼修改</span>
				</label>
			</div>
			<div class="form-control mt-6">
				{#if isLoading}
					<LoadingBtn />
				{:else}
					<button type="submit" class="btn btn-primary" disabled={!isCheck}>SUBMIT</button>
				{/if}
			</div>
		</form>
	</div>
</Modal>
