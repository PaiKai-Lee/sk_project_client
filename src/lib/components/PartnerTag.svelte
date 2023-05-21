<script lang="ts">
  export let name:string;
  export let department:string;
  export let avatar:string;
</script>

<div class="flex items-center space-x-3 max-w-xs">
  <div class="avatar">
    <div class="mask mask-squircle w-14 h-14">
      <img src={avatar} alt="Avatar Tailwind CSS Component" />
    </div>
  </div>
  <div>
    <div class="font-bold">{name}</div>
    <div class="text-sm opacity-50">{department}</div>
  </div>
</div>