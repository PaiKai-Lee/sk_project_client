<script lang="ts">
  export let switchToggle: boolean = false;
</script>

<div class="flex justify-end">
  <label class="label cursor-pointer">
    <input type="checkbox" class="toggle toggle-primary mr-1" bind:checked={switchToggle} />
    <span class="label-text"><slot /></span>
  </label>
</div>
