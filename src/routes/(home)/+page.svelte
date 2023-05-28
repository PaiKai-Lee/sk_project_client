<script lang="ts">
  import Banner from '$lib/components/Banner.svelte';
  import PartnerTag from '$lib/components/PartnerTag.svelte';
  import TempAvatar from '$lib/assets/temp-avatar.svg';
  import type { PageData } from './$types';

  export let data: PageData;

  interface User {
    id: string;
    role: 'User' | 'Admin' | 'SuperAdmin';
    avatar: string;
    department: string;
  }
  console.log(data);
  const api = import.meta.env.VITE_API_URL;
  $: users = data.users.map((user: User) => {
    return {
      ...user,
      avatar: user.avatar ? api + user.avatar : TempAvatar
    };
  });
  $: console.log(users);
</script>

<svelte:head>
  <title>首頁</title>
</svelte:head>

<Banner />
<div class="container mt-8 h-full mx-auto flex-1 xl:px-4">
  <section class="flex mx-auto h-[320px]">
    <div class="flex-auto w-80">
      <div class="p-3">
        <h3 class="text-xl font-bold">Company Partners</h3>
        <p>Lorem ipsum dolor sit amet</p>
      </div>
    </div>
    <div
      class="overflow-hidden flex-auto grid grid-cols-4 grid-flow-row gap-6 justify-start xl:grid-cols-8"
    >
      {#each users as { id, ...user } (id)}
        <PartnerTag {...user} />
      {/each}
    </div>
  </section>
</div>
