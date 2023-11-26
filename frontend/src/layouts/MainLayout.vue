<template>
	<q-layout
		v-if="!store.loadingCollection"
		view="hHh lpR fFf"
	>
		<q-header elevated>
			<q-toolbar>
				<q-toolbar-title>
					Max Comply
				</q-toolbar-title>
			</q-toolbar>
		</q-header>

		<q-drawer
			show-if-above
			bordered
			:width="350"
		>
			<q-list>
				<q-item class="text-bold text-h5">
					Task List
				</q-item>

				<q-item>
					<q-input
						v-model="searchText"
						outlined
						type="search"
						class="full-width"
					>
						<template #append>
							<q-icon name="search" />
						</template>
					</q-input>
				</q-item>

				<task-link
					v-for="(item, index) in filteredCollection"
					:key="item.name"
					class="cursor-pointer"
					:class="{ 'selected-item': selectedIndex === index }"
					v-bind="item"
					:to="'/task/' + item.id"
					@click.capture="onLinkClick(item, index)"
				/>
			</q-list>
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>

	<div
		v-if="store.loadingCollection"
		class="absolute-full flex justify-center items-center"
	>
		<q-circular-progress
			indeterminate
			rounded
			size="100px"
			color="primary"
			class="q-ma-md"
		/>
	</div>
</template>

<script setup>
import TaskLink from 'components/TaskLink.vue';
import { useMaxComplyStore } from 'stores/store';
import { computed, ref } from 'vue';

const store = useMaxComplyStore();
store.initLoad('/tasks');

const selectedIndex = ref(0);
const searchText = ref(null);

const onLinkClick = (link, index) => {
	selectedIndex.value = index;
	store.getItem(`/tasks/${link.id}`);
};

const filteredCollection = computed(() => {
	if (!searchText.value || searchText.value.length === 0) {
		return store.collection;
	}
	return store.collection.filter(task => {
		const normalizedTaskName = task.name.toLowerCase();
		const normalizedSearchText = searchText.value.toLowerCase();
		return normalizedTaskName.includes(normalizedSearchText);
	});
});
</script>

<style>
	.selected-item {
	background-color: #DAF5FF;
}
</style>
