<!-- components/Alert.svelte -->
<script lang="ts">
	import { onDestroy } from 'svelte';
	import { alert } from '$lib/stores';
	import { fly } from 'svelte/transition';

	export let ms = 3000;
	let visible: boolean;
	let timeout: number;

	const settingStyle = (type: string) => {
		switch (type) {
			case 'info':
				return 'alert-success';
			case 'warning':
				return 'alert-warning';
			case 'error':
				return 'alert-error';
			default:
				return 'alert-success';
		}
	};

	const onMessageChange = (message: string, ms: number) => {
		clearTimeout(timeout);
		if (!message) {
			// hide Alert if message is empty
			visible = false;
		} else {
			visible = true; // show alert
			if (ms > 0)
				timeout = setTimeout(() => {
					visible = false;
					alert.empty();
				}, ms); // and hide it after ms milliseconds
		}
	};

	$: alertStyle = settingStyle($alert.type);
	$: onMessageChange($alert.message, ms); // whenever the alert store or the ms props changes run onMessageChange

	onDestroy(() => clearTimeout(timeout)); // make sure we clean-up the timeout
</script>

{#if visible}
	<div class="fixed top-8 left-1/2 -translate-x-1/2 w-1/2 z-50">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="alert shadow-lg {alertStyle}"
			on:click={() => (visible = false)}
			transition:fly={{ delay: 250, duration: 300, x: 0, y: -100, opacity: 0.5 }}
		>
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="stroke-current flex-shrink-0 w-6 h-6"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
				<span>{$alert.message}</span>
			</div>
		</div>
	</div>
{/if}
