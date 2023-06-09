// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    interface PageData {
      user: {
        id: number;
        name: string;
        email: string;
        role: string;
        department: string;
        points: number;
        pwdChanged: number;
      };
      transactionRecords: {
        id: number;
        orderId: string;
        save: number;
        cost: number;
        remark: string;
        userName: string;
        createdAt: string;
      };
    }
    // interface Platform {}
  }
}

export {};
