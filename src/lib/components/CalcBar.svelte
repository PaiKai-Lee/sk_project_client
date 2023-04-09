<script>
	export let cost = 0;
	export let save = 0;
</script>

<div class="sticky z-20 bottom-0 backdrop-blur-sm">
	<div class="w-3/5 mx-auto flex justify-between p-2 ">
		<div class="flex-1 flex items-center gap-3">
			<p class="flex-none font-semibold">總結:</p>
			<p class="flex-1 text-error">{cost}</p>
			<p class="flex-1 text-primary">{save}</p>
		</div>
		<button on:click class="btn btn-primary">確認表單</button>
	</div>
</div>