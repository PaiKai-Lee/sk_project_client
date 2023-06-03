<script lang="ts">
  import { createEventDispatcher, getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  const dispatch = createEventDispatcher<{
    resetPwd: {
      id: number;
      name: string;
    };
  }>();

  export let id: number;
  export let name: string;
  let isCheck = false;
  const modalStatus: Writable<boolean> = getContext('modalStatus');
    
  $: if ($modalStatus === false) {
    isCheck = false;
  }

  function clickHandler() {
    dispatch('resetPwd', {
      id,
      name
    });
  }
</script>

<div class="card w-96 bg-base-100 shadow-xl">
  <div class="card-body">
    <!-- <h2 class="card-title">密碼重製</h2> -->
    <div class="my-2">
      <label class="flex justify-start items-center cursor-pointer gap-2">
        <input type="checkbox" class="checkbox checkbox-primary" bind:checked={isCheck} />
        <span class="label-text">是否確認重製 <strong>{name}</strong> 的使用者密碼?</span>
      </label>
    </div>
    <button
      class="btn btn-sm btn-primary"
      disabled={!isCheck}
      on:click|preventDefault={clickHandler}>RESET</button
    >
  </div>
</div>
