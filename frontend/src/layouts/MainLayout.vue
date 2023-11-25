<template>
	<q-layout view="hHh lpR fFf">
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
					v-for="link in essentialLinks"
					:key="link.title"
					v-bind="link"
					@click.capture="onLinkClick(link)"
				/>
			</q-list>
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script setup>
import { useRouter } from 'vue-router';
import EssentialLink from 'components/EssentialLink.vue';

const router = useRouter();
const essentialLinks = [
	{
		title: 'Onboarding Introduction',
		caption: 'A brief introduction to the tasks required.',
		link: '/onboarding-introduction',
	},
	{
		title: 'Identiy Validation',
		caption: 'Provide valid photo identification',
		link: '/identity-validation',
	},
	{
		title: 'Address Validation',
		caption: 'Provide valid proof of address',
		link: '/address-validation',
	},
	{
		title: 'Financial Records',
		caption: 'Provide details of financial transactions',
		link: '/financial-records',
	}
];

const onLinkClick = (link) => router.push(link.link);
</script>
