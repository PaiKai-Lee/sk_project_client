<script lang="ts">
	import { goto } from '$app/navigation';
	import authService from '$lib/services/auth';
	import { alert, userStorage } from '$lib/stores';

	if ($userStorage.isAuth) goto('/');

	// state
	let inputEmail: string;
	let inputPassword: string;

	// method
	async function submitHandler(e: SubmitEvent) {
		if (!inputEmail) {
			return alert.set({ type: 'error', message: '請輸入信箱' });
		}
		if (!inputPassword) {
			return alert.set({ type: 'error', message: '請輸入密碼' });
		}
		const [result, error] = await authService.login({ email: inputEmail, password: inputPassword });
		if (error) {
			return alert.set({ type: 'error', message: '帳號密碼錯誤' });
		}
		localStorage.setItem('accessToken', result.accessToken);
		alert.set({ type: 'info', message: `Hi! ${result.name}` });
		userStorage.set({ ...result, isAuth: true });
		goto('/');
	}
</script>

{#if !$userStorage.isAuth}
	<div class="hero mt-36">
		<div class="hero-content flex-col lg:flex-row-reverse">
			<div class="text-center lg:text-left lg:max-w-xl">
				<h1 class="text-5xl font-bold">Login First!</h1>
				<p class="py-6">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam veritatis, repellat ducimus
					atque illum reprehenderit at incidunt, perferendis expedita veniam excepturi quia
					blanditiis quos pariatur enim et delectus ea voluptates?
				</p>
			</div>
			<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
				<form on:submit={submitHandler} class="card-body">
					<div class="form-control">
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label class="label">
							<span class="label-text">Email</span>
						</label>
						<input
							type="text"
							placeholder="email"
							class="input input-bordered"
							bind:value={inputEmail}
						/>
					</div>
					<div class="form-control">
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label class="label">
							<span class="label-text">Password</span>
						</label>
						<input
							type="text"
							placeholder="password"
							class="input input-bordered"
							bind:value={inputPassword}
						/>
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label class="label">
							<a href="#" class="label-text-alt link link-hover">Forgot password?</a>
						</label>
					</div>
					<div class="form-control mt-6">
						<button type="submit" class="btn btn-primary">Login</button>
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}
