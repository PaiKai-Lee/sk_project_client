<script lang="ts">
  import meService from '$lib/services/me';
  import { alertToast } from '$lib/stores';
  import { onMount } from 'svelte';
  import { faker } from '@faker-js/faker';
  import addImg from '$lib/assets/add-img.svg';
  import Modal from '$lib/components/common/Modal.svelte';
  import UploadAvatar from '$lib/components/UploadAvatar.svelte';

  interface Me {
    id: number;
    name: string;
    role: 'SuperAdmin' | 'Admin' | 'User';
    email: string;
    department: string;
    point: number;
    avatar: string;
  }

  interface Transaction {
    id: number;
    orderId: string;
    save: number;
    cost: number;
    remark: string;
  }

  const RoleMap = {
    User: '一般使用者',
    Admin: '管理者',
    SuperAdmin: '最高管理者'
  };

  let showModal = false;
  let user: Me;
  let transactions: Transaction[];
  let preview: HTMLElement;
  onMount(async () => {
    const [meResult, meError] = await meService.getMyProfile();
    if (meError) {
      return alertToast.addMessage({ type: 'error', message: meError.statusText });
    }
    const [transactionsResut, transactionsError] = await meService.getMyRecords();
    if (transactionsError) {
      return alertToast.addMessage({ type: 'error', message: transactionsError.statusText });
    }
    user = meResult;
    transactions = transactionsResut;
  });

  // events
  function clickAddImage() {
    showModal = true;
  }
  function changeHandler(e: Event) {
    const inputEl = e.target as HTMLInputElement;
    if (inputEl.files && inputEl.files[0]) {
      const file = inputEl.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        preview.setAttribute('src', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
  async function uploadAvatar(e: CustomEvent) {
    const formData = e.detail.form;
    const [_, error] = await meService.uplaodAvatar(formData);
    if (error) {
      return alertToast.addMessage({ type: 'error', message: error.statusText });
    }
    alertToast.addMessage({ type: 'info', message: '上傳成功' });
    setTimeout(() => {
      showModal = false;
      location.reload();
    }, 1000);
  }
</script>

{JSON.stringify(user, null, 2)}
<br />
{JSON.stringify(transactions, null, 2)}
{#if user}
  <div class="w-full border-2 border-black rounded-md">
    <div class="flex p-4 h-44">
      <div class="flex-1 flex items-center space-x-6">
        <div class="avatar">
          <div class="w-28 h-28 relative">
            <img src={user.avatar || faker.image.image()} alt="" class="rounded-full" />
            <button
              class="absolute w-8 h-8 p-2 bottom-1 right-1 rounded-full cursor-pointer bg-white border-2 border-gray-200"
              on:click={clickAddImage}
            >
              <img src={addImg} alt="add-img" />
            </button>
          </div>
        </div>
        <div>
          <p>{RoleMap[user?.role]}</p>
          <p class="font-bold text-3xl">{user.name}</p>
          <p>{user.email}</p>
        </div>
      </div>
      <div class="flex justify-center items-center mr-8">
        <button
          class="border-2 p-1 font-semibold border-gray-300 rounded-md active:bg-black active:text-gray-50 transition-all duration-75"
          >Edit profile</button
        >
      </div>
    </div>
  </div>
{/if}

<Modal bind:showModal>
  <UploadAvatar on:uploadAvatar={uploadAvatar} />
</Modal>
