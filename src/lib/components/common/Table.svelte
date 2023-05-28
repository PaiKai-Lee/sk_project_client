<script lang="ts">
  export let columns: any = [];
  export let footer = false;
</script>

<div class="overflow-x-auto w-full">
  <table class="table w-full">
    <!-- head -->
    <thead>
      <tr>
        {#each columns as column, idx (idx)}
          <th>{column}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      <slot />
    </tbody>
    <!-- foot -->
    {#if footer}
      <tfoot>
        <tr>
          {#each columns as column, idx (idx)}
            <th>{column}</th>
          {/each}
        </tr>
      </tfoot>
    {/if}
  </table>
</div>
