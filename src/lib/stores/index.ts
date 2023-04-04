import { writable } from 'svelte/store';

interface User {
	id?: number;
	name?: string;
	email?: string;
	role?: 'SuperAdmin' | 'Admin' | 'User';
	department?: string;
	points?: number;
	pwdChanged?: number;
	isAuth?: boolean;
}

const initUser: User = {};

export const userStore = writable(initUser);

export const alert = alertStorage();

export const transferStore = transferStorage();

function alertStorage() {
	const { subscribe, set, update } = writable({ type: '', message: '' });
	return {
		subscribe,
		update,
		set: ({ type, message }: { type: 'info' | 'warning' | 'error'; message: string }) => {
			if (!type) return;
			return set({ type, message });
		},
		empty: () => set({ type: '', message: '' })
	};
}

function transferStorage() {
	const { subscribe, set, update } = writable([]);

	function getConfirmTransfer() {
		let result: any[] = [];
		const unsubscribe = subscribe((origData) => {
			origData.forEach((item: any) => {
				// 沒有金額不需顯示及傳送
				if (!item.save && !item.cost) return;
				if (item.save >= item.cost) {
					result.unshift(item);
				} else {
					result.push(item);
				}
			});
		});
		unsubscribe();
		return result;
	}

	return {
		subscribe,
		set,
		update,
		getConfirmTransfer,
		init: (data: any) => set(data),
		empty: () => set([])
	};
}
