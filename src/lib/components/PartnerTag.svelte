<script lang="ts">
  export let name: string;
  export let department: string;
  export let avatar: string;
</script>

<div class="flex items-center space-x-2 max-w-xs">
  <div class="avatar">
    <div class="mask mask-squircle w-14 h-14">
      <img src={avatar} alt="Avatar" />
    </div>
  </div>
  <div class="w-full">
    <p class="font-bold break-all">{name}</p>
    <p class="text-sm opacity-50">{department}</p>
  </div>
</div>
