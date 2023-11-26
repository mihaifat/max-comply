<template>
	<q-form v-if="!store.loadingItem">
		<div

			class="row q-px-lg q-pt-xs q-col-gutter-md justify-between"
		>
			<div class="col-12">
				<p class="text-bold text-h5">
					{{ store.item.name }}
				</p>
			</div>


			<div
				v-for="field in store.item.fields"
				:key="field.id"
				:class="field.class"
			>
				<p
					v-if="field.type === 'paragraph'"
				>
					{{ field.content }}
				</p>

				<q-input
					v-else-if="field.type === 'inputText'"
					outlined
					:label="field.label"
					:value="field.value"
					:rules="[
						value => !field.optional && value >= field.validation.min && value <= field.validation.max
					]"
					type="text"
				/>

				<q-input
					v-else-if="field.type === 'inputTextArea'"
					outlined
					:label="field.label"
					:value="field.value"
					type="textarea"
				/>

				<q-select
					v-else-if="field.type === 'inputSelect'"
					outlined
					:options="field.options"
					:label="field.label"
				/>

				<q-file
					v-else-if="field.type === 'inputDocument'"
					:accept="field.accept"
					outlined
				>
					<template #prepend>
						<q-icon name="attach_file" />
					</template>
				</q-file>
			</div>

			<div
				v-if="store.item.requiresSubmit"
				class="col-12"
			>
				<q-btn
					class="float-right"
					label="Submit"
					type="submit"
					color="primary"
				/>
			</div>
		</div>
	</q-form>
	<div
		v-if="store.loadingItem"
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
import { useMaxComplyStore } from 'stores/store';
const store = useMaxComplyStore();
</script>