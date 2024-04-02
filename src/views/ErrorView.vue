<script setup lang="ts">
	// @ts-ignore
	const props = defineProps<{ error: string }>();

	function refresh(): void {
		location.reload();
	}
</script>

<template>
	<section>
		<h2>Oops... a wild error appears!</h2>
		<p>
			{{ error }}<br />
			Try to refresh the website or wait for the issue to be resolved.
		</p>
		<button type="button" @click="refresh">Refresh</button>
	</section>
</template>

<style scoped>
	section {
		display: flex;
		flex-direction: column;
		row-gap: 1rem;
	}

	button {
		border: none;
		border-radius: 0.25rem;
		cursor: pointer;
		padding: 0.5rem 0.75rem;
	}
</style>
