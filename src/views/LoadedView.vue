<script setup lang="ts">
	import { computed, ref } from "vue";
	import { type GithubProjects } from "../requests";
	import Card from "../components/Card.vue";

	// @ts-ignore
	const props = defineProps<{ projects: GithubProjects, topics: string[] }>();

	const filter42 = ref(true);
	const filterName = ref("");
	const filterTopics = ref<string[]>([]);

	const visibleProjectsIndexes = computed<boolean[]>(() => {
		return props.projects.map((p) => {
			if (
				p.name.toLowerCase().includes(filterName.value.toLowerCase()) &&
				(filter42.value || !p.topics.includes("42")) &&
				(!filterTopics.value.length || filterTopics.value.some((t) => p.topics.includes(t)))
			) {
				return true;
			}
			return false;
		});
	});
	const nbVisibleProjects = computed<number>(() => {
		return visibleProjectsIndexes.value.filter((visible) => visible).length;
	});

	function clearFilters(): void {
		filterName.value = "";
		filterTopics.value = [];
	}
</script>

<template>
	<section>
		<h2>My projects</h2>
		<div>
			<div class="filters">
				<div>
					<input type="checkbox" id="checkbox-42" v-model="filter42" />
					<label for="checkbox-42">Display school projects</label>
				</div>
				<div>
					<input type="text" v-model="filterName" placeholder="Filter by name..." />
				</div>
				<div class="dropdown">
					<button type="button">{{ `Filter by topics (${filterTopics.length})` }}</button>
					<ul class="dropdown-content">
						<li v-for="topic in topics">
							<label>
								<input type="checkbox" :value="topic" v-model="filterTopics" />
								{{ topic }}
							</label>
						</li>
					</ul>
				</div>
				<div>
					<button type="button" @click="clearFilters">Clear filters</button>
				</div>
			</div>
			<ul>
				<Card v-for="(project, index) in projects" :project="project" v-show="visibleProjectsIndexes[index]"/>
			</ul>
			<p class="recap"><span>{{ nbVisibleProjects }}</span> result(s) for projects matching the current filters.</p>
		</div>
	</section>
</template>

<style scoped>
	section > div {
		border: 1px solid var(--stroke);
	}

	h2 {
		border-bottom: 1px solid var(--stroke);
		margin-bottom: 1rem;
		padding-bottom: 0.5rem;
	}

	.filters {
		border-bottom: 1px solid var(--stroke);
		column-gap: 1rem;
		display: flex;
		padding: 0.5rem;
		position: relative;
	}
	.filters > div:first-child {
		align-items: center;
		column-gap: 0.25rem;
		display: flex;
	}
	.filters > div:nth-child(2) {
		flex: 1 1 0%;
	}
	.filters input[type=text] {
		background-color: var(--background);
		border: 1px solid var(--stroke);
		border-radius: 0.25rem;
		color: var(--text-subtle);
		padding: 0.5rem;
		width: 100%;
	}
	.filters input[type=text]::placeholder {
		color: var(--text-subtle);
	}
	.filters input[type=text]:focus {
		outline: 2px solid var(--stroke);
	}
	.filters button {
		border: none;
		border-radius: 0.25rem;
		cursor: pointer;
		height: 100%;
		padding: 0.5rem 0.75rem;
	}

	.dropdown {
		position: relative;
	}
	.dropdown:hover .dropdown-content {
		display: block;
	}

	.dropdown-content {
		background-color: var(--background);
		border: 1px solid var(--stroke);
		display: none;
		position: absolute;
		top: 100%;
		width: max-content;
		z-index: 1;
	}
	.dropdown-content label {
		column-gap: 0.25rem;
		display: flex;
		padding: 0.25rem 0.5rem;
	}
	.dropdown-content label:hover {
		background-color: #171717;
	}

	.recap {
		padding: 0.75rem;
	}
	.recap span {
		font-weight: 700;
	}
</style>
