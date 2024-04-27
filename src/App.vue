<script setup lang="ts">
	import { computed, onMounted, ref } from "vue";
	import { fetchRepos, type GithubProjects } from "./requests";
	import LoadingView from "./views/LoadingView.vue";
	import LoadedView from "./views/LoadedView.vue";
	import ErrorView from "./views/ErrorView.vue";

	const components = {
		loadingView: LoadingView,
		loadedView: LoadedView,
		errorView: ErrorView
	};

	const currentView = ref<keyof typeof components>("loadingView");

	const repos = ref<GithubProjects | null>(null);
	const topics = computed(() => {
		const _topics: string[] = [];
		if (repos.value !== null) {
			for (const repo of repos.value) {
				for (const topic of repo.topics) {
					if (_topics.indexOf(topic) === -1 && topic !== "42") {
						_topics.push(topic);
					}
				}
			}
		}
		return _topics.sort();
	});

	const errorMessage = ref<string>("");

	onMounted(async () => {
		try {
			const _repos = await fetchRepos();
			repos.value = _repos;
			currentView.value = "loadedView"
		} catch (error: unknown) {
			if (error instanceof Error) {
				errorMessage.value = `${error.name}: ${error.message}.`;
			} else {
				errorMessage.value = "Error: Something unexpected happened.";
			}
			currentView.value = "errorView";
		}
	});
</script>

<template>
	<header>
		<h1>Naerhy</h1>
	</header>
	<main :class="currentView">
		<component
			:is="components[currentView]"
			:projects="repos"
			:topics="topics"
			:error="errorMessage"
		></component>
	</main>
	<footer>
		<p>"Monkeys are superior to men in this: when a monkey looks into a mirror, he sees a monkey."</p>
	</footer>
</template>

<style scoped>
	header {
		padding: 1rem 0;
		text-align: center;
	}

	main {
		flex: 1 1 0%;
		margin: 1rem 0;
	}

	.loadingView,
	.errorView {
		align-items: center;
		display: flex;
		justify-content: center;
	}

	footer {
		font-size: 0.875rem;
		line-height: 1.25rem;
		padding: 1rem 0;
		text-align: center;
	}
</style>
