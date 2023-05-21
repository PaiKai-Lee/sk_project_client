<script lang="ts">
  export let userName: string;
  export let limit: string | number | undefined;
  export let order: string;
</script>

<input
  type="text"
  placeholder="名稱"
  class="input input-bordered input-group-md w-full max-w-[14rem]"
  bind:value={userName}
/>
<select class="select select-bordered w-full max-w-[10rem]" bind:value={limit}>
  <option disabled selected>數量</option>
  <option value="10">10</option>
  <option value="25" selected>25</option>
  <option value="40">40</option>
</select>

<select class="select select-bordered w-full max-w-[10rem]" bind:value={order}>
  <option value="desc">新到舊</option>
  <option value="asc">舊到新</option>
</select>
<button class="btn btn-primary" on:click>查詢</button>
