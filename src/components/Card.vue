<script setup lang="ts">
	import { type GithubProject } from "../requests";
	import GithubSVG from "./GithubSVG.vue";

	// @ts-ignore
	const props = defineProps<{ project: GithubProject }>();
</script>

<template>
	<li>
		<h3>{{ project.name }}</h3>
		<a :href="project.html_url" target="_blank">
			<GithubSVG />
		</a>
		<p>{{ project.description ?? "No description provided." }}</p>
		<div class="topics">
			<span v-for="topic in project.topics">{{ topic }}</span>
		</div>
	</li>
</template>

<style scoped>
	li {
		border-bottom: 1px solid var(--stroke);
		display: flex;
		flex-direction: column;
		padding: 0.75rem;
		position: relative;
		row-gap: 0.5rem;
	}

	a {
		position: absolute;
		right: 0.75rem;
	}

	.topics {
		column-gap: 0.25rem;
		display: flex;
	}
	.topics span {
		border: 1px solid var(--stroke);
		border-radius: 0.375rem;
		padding: 0.25rem 0.5rem;
		font-size: 0.75rem;
		line-height: 1rem;
	}
</style>
