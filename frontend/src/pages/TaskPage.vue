<template>
	<div
		v-if="!store.loadingItem"
		class="row"
	>
		<div class="col-12">
			<p class="text-bold">
				{{ store.item.name }}
			</p>
		</div>

		<q-form>
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
					:label="field.label"
					:value="field.value"
					type="text"
				/>

				<q-input
					v-else-if="field.type === 'inputTextArea'"
					:label="field.label"
					:value="field.value"
					type="textarea"
				/>

				<q-select
					v-else-if="field.type === 'inputSelect'"
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
		</q-form>
	</div>
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