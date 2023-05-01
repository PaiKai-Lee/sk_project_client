<script lang="ts">
	import { goto } from '$app/navigation';
	import { alert, userStore } from '$lib/stores';
	import userService from '$lib/services/user';
	import { onMount } from 'svelte';
	import Table from '$lib/components/Table.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import ResetPwdForm from '$lib/components/admin/ResetPwdForm.svelte';
	import EditUserForm from '$lib/components/admin/EditUserForm.svelte';
	import CreateUserForm from '$lib/components/admin/CreateUserForm.svelte';
	import adminService from '$lib/services/admin';

	interface User {
		id: number;
		name: string;
		role: 'SuperAdmin' | 'Admin' | 'User';
		email: string;
		department: string;
		isDelete: boolean;
	}

	interface CreateUser extends Omit<User, 'id' | 'isDelete'> {
		role: 'Admin' | 'User';
	}

	// if (!$userStore.isAuth || $userStore.role === 'User') {
	//   goto('/login')
	// }

	let isLoading = false;
	let showModal = false;
	let clickEvent: '' | 'edit' | 'create' | 'reset';
	let users: User[];
	let selectedUser: User;

	onMount(async () => {
		const [userResult, err] = await userService.getAllUsers({
			fields: 'email,role,department,isDelete',
			order: 'id,asc'
		});
		if (err) {
			alert.set({ type: 'error', message: err.statusText });
			return;
		}
		users = userResult;
	});

	function clickCreate() {
		clickEvent = 'create';
		showModal = true;
	}
	function clickEdit(userId: number) {
		selectedUser = users.find((user) => user.id === userId) as User;
		clickEvent = 'edit';
		showModal = true;
	}
	function clickReset(userId: number) {
		clickEvent = 'reset';
		showModal = true;
	}

	async function createUserHandler(e: CustomEvent<CreateUser>) {
		isLoading = true;
		const userData = e.detail;
		const [result, error] = (await adminService.createUser(userData)) as [User, any];
		if (error) {
			isLoading = false;
			return alert.set({ type: 'error', message: '創建帳號失敗' });
		}
		alert.set({ type: 'info', message: `${userData.name} 創建成功` });
		users = [...users, result];
		isLoading = false;
		showModal = false;
	}
	async function editUserHandler(e: CustomEvent) {
		isLoading = true;
		const { id, ...updateData } = e.detail;
		const [_, error] = await adminService.editUser(id, updateData);
		if (error) {
			return alert.set({ type: 'error', message: '修改失敗' });
		}
		alert.set({ type: 'info', message: `${updateData.name} 修改成功` });
		const [userResult, err] = await userService.getAllUsers({
			fields: 'email,role,department,isDelete',
			order: 'id,asc'
		});
		if (err) {
			alert.set({ type: 'error', message: err.statusText });
			return;
		}
		users = userResult;
		showModal = false;
		isLoading = false;
	}
</script>

{#if users}
	<div class="text-end py-2">
		<button class="btn btn-primary" on:click={clickCreate}>創建新使用者</button>
	</div>
	<Table columns={['姓名', '信箱', '部門', '權限', '狀態', '密碼重製', '編輯使用者']} footer={true}>
		{#each users as user (user.id)}
			<tr class="group font-semibold">
				<td class="group-even:bg-base-300">{user.name}</td>
				<td class="group-even:bg-base-300">{user.email}</td>
				<td class="group-even:bg-base-300">{user.department}</td>
				<td class="group-even:bg-base-300">{user.role}</td>
				<td class="group-even:bg-base-300 {user.isDelete && 'text-error'}"
					>{user.isDelete ? '停用' : '啟用'}</td
				>
				<td class="group-even:bg-base-300"
					><button class="btn btn-error" on:click={() => clickReset(user.id)}>密碼重製</button></td
				>
				<td class="group-even:bg-base-300"
					><button class="btn btn-outline" on:click={() => clickEdit(user.id)}>編輯</button></td
				>
			</tr>
		{/each}
	</Table>
{/if}

<Modal bind:showModal itemAlign="center">
	{#if clickEvent === 'create'}
		<CreateUserForm title="創建使用者" {isLoading} on:createUser={createUserHandler} />
	{:else if clickEvent === 'edit' && selectedUser}
		<EditUserForm title="編輯使用者" {isLoading} {...selectedUser} on:editUser={editUserHandler} />
	{:else if clickEvent === 'reset'}
		<ResetPwdForm />
	{/if}
</Modal>
