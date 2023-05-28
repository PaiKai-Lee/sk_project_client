<script lang="ts">
  import { arrayRange } from '$lib/utils';

  export let pages = 5;

  export let currentPage = 1;
</script>

<div class="btn-group">
  {#each arrayRange(1, pages) as page, idx (idx)}
    <button class="btn btn-outline {currentPage === page && 'btn-active'}" data-page={page} on:click
      >{page}</button
    >
  {/each}
</div>
