<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import LoadingBtn from '../common/LoadingBtn.svelte';

	type Role = 'SuperAdmin' | 'Admin' | 'User';

	const dispatch = createEventDispatcher<{
		editUser: {
			id:number,
			name: string;
			role: Role;
			department: string;
			isDelete: boolean;
		};
	}>();

	// TODO 改成從API拿
	const roles = [
		{ value: 'Admin', label: '管理者' },
		{ value: 'User', label: '一般使用者' }
	];

	// let departments = [

	// ]

	// state
	let isCheck = false;
	export let title = 'Form Title';
	export let id:number;
	export let name = '';
	export let email = '';
	export let role = (roles.find((role) => role.value === 'User')?.value ?? 'User') as Role;
	export let department = 'temp';
	export let isDelete = false;
	export let isLoading = false;

	$: userStatus = isDelete ? '1' : '0';
	function clickHandler() {
		dispatch('editUser', {
			id,
			name,
			role,
			department,
			isDelete: Boolean(parseInt(userStatus))
		});
	}
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<div class="card w-full max-w-xl shadow-2xl bg-base-100">
	<form class="card-body" on:submit|preventDefault={clickHandler}>
		<h2 class="card-title">{title}</h2>
		<div class="form-control">
			<label class="label">
				<span class="label-text">Name</span>
			</label>
			<input type="text" placeholder="name" class="input input-bordered" bind:value={name} />
		</div>
		<div class="form-control">
			<label class="label">
				<span class="label-text">Email</span>
			</label>
			<input
				type="text"
				placeholder="email"
				class="input input-bordered"
				disabled
				bind:value={email}
			/>
		</div>
		<div class="flex gap-2">
			<div class="form-control flex-1">
				<label class="label">
					<span class="label-text">權限</span>
				</label>
				<select class="select select-bordered" bind:value={role}>
					{#each roles as role, idx (idx)}
						<option value={role.value}>{role.label}</option>
					{/each}
				</select>
			</div>
			<div class="form-control flex-1">
				<label class="label">
					<span class="label-text">部門</span>
				</label>
				<select disabled class="select select-bordered" bind:value={department}>
					<option disabled selected>Pick one</option>
					<option>Star Wars</option>
				</select>
			</div>
		</div>
		<div class="form-control flex-1">
			<label class="label">
				<span class="label-text">帳號狀態</span>
			</label>
			<select
				class="select select-warning w-fit max-w-xs"
				bind:value={userStatus}
				disabled={role === 'SuperAdmin'}
			>
				<option value="0">啟用</option>
				<option value="1">停用</option>
			</select>
		</div>
		<div class="my-2">
			<label class="flex justify-start items-center cursor-pointer gap-2">
				<input type="checkbox" class="checkbox checkbox-primary" bind:checked={isCheck} />
				<span class="label-text">確認表單</span>
			</label>
		</div>
		<div class="form-control my-2">
			{#if isLoading}
				<LoadingBtn />
			{:else}
				<button type="submit" class="btn btn-primary" disabled={!isCheck}>SUBMIT</button>
			{/if}
		</div>
	</form>
</div>
