<script lang="ts">
  import { transferStore, alertToast, userStore } from '$lib/stores';
  import { onDestroy, onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import orderService from '$lib/services/order';
  import userService from '$lib/services/user';
  import Modal from '$lib/components/common/Modal.svelte';
  import Toggle from '$lib/components/common/Toggle.svelte';
  import Table from '$lib/components/common/Table.svelte';
  import CalcTable from '$lib/components/CalcTable.svelte';
  import CalcBar from '$lib/components/CalcBar.svelte';
  import PageTitle from '$lib/components/common/PageTitle.svelte';

  if (!$userStore.isAuth) goto('/login');

  interface User {
    id: number;
    name: string;
    points: number;
    role: string;
  }

  interface TransferData extends Pick<User, 'id' | 'name' | 'points'> {
    cost: number;
    save: number;
    remark: string;
  }

  // state
  let showSave = false;
  let showModal = false;
  let loading = false;
  let confirmData: TransferData[];
  let bodyEl: HTMLElement | null;
  let reloadTimer: number;
  $: calcBalance = getCalcBalance($transferStore);
  let pageLoading = true;
  // life cycle
  onMount(async () => {
    const [userResult, err] = await userService.getAllUsers({
      fields: 'points',
      order: 'points,desc',
      hideDelete: true
    });
    if (err) {
      alertToast.addMessage({ type: 'error', message: err.statusText });
      return;
    }
    transferStore.init(
      userResult.map((user: User) => {
        const { id, name, points } = user;
        return {
          id,
          name,
          points,
          cost: 0,
          save: 0,
          remark: ''
        };
      })
    );
    pageLoading = false;
  });

  onDestroy(() => {
    transferStore.empty();
    clearTimeout(reloadTimer);
  });

  // methods
  async function sumbitHandler() {
    loading = true;
    const createOrder = confirmData.map((data) => {
      const { id, cost, save, remark } = data;
      return { id, cost, save, remark };
    });
    const [_, err] = await orderService.createOrder(createOrder);
    if (err) {
      loading = false;
      return alertToast.addMessage({ type: 'error', message: err.statusText });
    }
    alertToast.addMessage({ type: 'info', message: '成功建立訂單' });
    reloadTimer = setTimeout(() => {
      loading = false;
      location.reload();
    }, 500);
  }

  function genConfirmData(transferData: TransferData[]) {
    const result: any = [];
    transferData.forEach((item) => {
      // 沒有金額不需顯示及傳送
      if (!item.save && !item.cost) return;
      if (!item.save) item.save = 0;
      if (!item.cost) item.cost = 0;
      if (item.save >= item.cost) {
        result.unshift(item);
      } else {
        result.push(item);
      }
    });
    return result;
  }

  function getCalcBalance(transferData: TransferData[]) {
    return transferData.reduce(
      (accumulator, current) => {
        accumulator.totalCosts += current.cost;
        accumulator.totalSaves += current.save;
        accumulator.isEqual = accumulator.totalCosts === accumulator.totalSaves;
        return accumulator;
      },
      {
        totalCosts: 0,
        totalSaves: 0,
        isEqual: true
      }
    );
  }

  function clickHandler(e: MouseEvent): void {
    confirmData = genConfirmData($transferStore);
    showModal = true;
  }
</script>

<svelte:head>
  <title>交易主程式</title>
</svelte:head>
<PageTitle>交易主程式</PageTitle>
{#if pageLoading}
  Loading...
{:else}
  <div class="sticky z-20 top-0 backdrop-blur-md flex justify-end gap-4">
    <Toggle bind:switchToggle={showSave}>開啟儲值</Toggle>
  </div>
  <Table columns={['名稱', '餘額', '扣款', '存入', '備註']} footer>
    {#each $transferStore as item (item.id)}
      <tr class="group">
        <td
          class="py-1 {item.points < 0 &&
            'bg-error'} group-hover:border-b-2 group-hover:border-base-300 transition-all duration-100"
          >{item.name}</td
        >
        <td
          class="py-1 {item.points < 0 &&
            'bg-error'} group-hover:border-b-2 group-hover:border-base-300 transition-all duration-100"
          >{item.points}</td
        >
        <td
          class="py-1 group-hover:border-b-2 group-hover:border-base-300 transition-all duration-100"
        >
          <input
            type="number"
            placeholder="Type here"
            step="1"
            class="input w-full"
            bind:value={item.cost}
          />
        </td>
        <td
          class="py-1 group-hover:border-b-2 group-hover:border-base-300 transition-all duration-100"
        >
          <input
            type="number"
            placeholder="Type here"
            step="1"
            class="input w-full"
            disabled={!showSave}
            bind:value={item.save}
          />
        </td>
        <td
          class="py-1 group-hover:border-b-2 group-hover:border-base-300 transition-all duration-100"
        >
          <input
            type="text"
            placeholder="Type here"
            class="input w-full"
            bind:value={item.remark}
          />
        </td>
      </tr>
    {/each}
  </Table>
  <CalcBar cost={calcBalance.totalCosts} save={calcBalance.totalSaves} on:click={clickHandler} />
{/if}

<Modal bind:showModal>
  <CalcTable
    columns={['名稱', '扣款', '存入', '備註']}
    bind:confirmData
    bind:loading
    on:submit={sumbitHandler}
  />
</Modal>
