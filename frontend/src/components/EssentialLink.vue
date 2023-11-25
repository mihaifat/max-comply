<template>
	<q-item>
		<q-item-section>
			<q-item-label>{{ title }}</q-item-label>
			<q-item-label caption>
				{{ caption }}
			</q-item-label>
		</q-item-section>

		<q-item-section avatar>
			<q-icon name="arrow_forward_ios"
				class="gray-arrow"
			/>
		</q-item-section>
	</q-item>
</template>

<style>
	.gray-arrow {
		color: #757575;
	}
</style>

<script setup>
defineProps({
	title: {
		type: String,
		required: true,
	},

	caption: {
		type: String,
		default: '',
	},

});
</script>
