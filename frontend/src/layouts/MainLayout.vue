<template>
	<q-layout view="hHh lpR fFf"
		v-if="!store.loadingCollection"
	>
		<q-header elevated>
			<q-toolbar>
				<q-toolbar-title>
					Quasar App
				</q-toolbar-title>
			</q-toolbar>
		</q-header>

		<q-drawer
			show-if-above
			bordered
			width="350"
		>
			<q-list>
				<q-item-label header>
					Search Bar
				</q-item-label>

				<essential-link
					class="cursor-pointer"
					v-for="item in store.collection"
					:key="item.name"
					v-bind="item"
					:to="'/task/' + item.id"
					@click.capture="onLinkClick(item)"
				/>
			</q-list>
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>

	<div v-if="store.loadingCollection"
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
import EssentialLink from 'components/EssentialLink.vue';
import { useMaxComplyStore } from 'stores/store';

const store = useMaxComplyStore();

store.initLoad('/tasks');

const onLinkClick = (link) => store.getItem(`/tasks/${link.id}`);
</script>
