<script lang="ts">
	export let showModal: boolean = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	on:click|self={() => (showModal = false)}
	class="w-full h-full fixed top-0 left-0 bg-black/50 z-50 flex justify-center items-start p-4 {!showModal &&
		'hidden'}"
>
	<slot />
</div>
