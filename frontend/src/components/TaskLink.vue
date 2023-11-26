<template>
	<q-item>
		<q-item-section>
			<q-item-label>{{ name }}</q-item-label>
			<q-item-label caption>
				{{ subHeading }}
			</q-item-label>
		</q-item-section>

		<q-item-section avatar>
			<q-icon
				name="arrow_forward_ios"
				class="gray-arrow"
			/>
		</q-item-section>
	</q-item>
</template>

<script setup>
defineProps({
	name: {
		type: String,
		required: true,
	},

	subHeading: {
		type: String,
		default: '',
	},

});
</script>

<style>
	.gray-arrow {
		color: #757575;
	}
</style>
