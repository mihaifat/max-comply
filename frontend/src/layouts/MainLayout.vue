<template>
	<q-layout view="hHh lpR fFf"
		v-if="!store.loading"
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
					@click.capture="onLinkClick(item)"
				/>
			</q-list>
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>

	<div v-if="store.loading"
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
import { useRouter } from 'vue-router';
import EssentialLink from 'components/EssentialLink.vue';
import { createMaxComplyStore } from 'stores/store';

const router = useRouter();
const store = createMaxComplyStore();

store.getCollection('/tasks');


const onLinkClick = (link) => router.push(link.link);
</script>
