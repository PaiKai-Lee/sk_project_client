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

interface TransferData
  extends Omit<User, 'email' | 'role' | 'department' | 'pwdChanged' | 'isAuth'> {
  id: number;
  name: string;
  points: number;
  cost: number;
  save: number;
  remark: string;
}

interface AlertItem {
  id: string;
  type: 'info' | 'warning' | 'error';
  message: string;
}

interface InsertAlert extends Omit<AlertItem, 'id'> {}

// 使用者資訊
export const userStore = writable<User>({});
// 警示條
export const alert = alertStorage();
// 警示列
export const alertToast = alertToastStorage();
// 交易資料
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
  const { subscribe, set, update } = writable<TransferData[]>([]);

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

function alertToastStorage() {
  const { subscribe, set, update } = writable<AlertItem[]>([]);
  return {
    subscribe,
    update,
    empty: () => set([]),
    addMessage: (alertItem: InsertAlert) =>
      update((alerts: AlertItem[]) => {
        const alertItemWithId: AlertItem = { ...alertItem, id: crypto.randomUUID() };
        return [...alerts, alertItemWithId];
      }),
    popout: () =>
      update((alerts: AlertItem[]) => {
        const [a, ...restAlerts] = alerts;
        return restAlerts;
      }),
    filter: (id: string) =>
      update((alerts: AlertItem[]) => alerts.filter((alert) => alert.id !== id))
  };
}
