<template>
	<q-form
		v-if="!store.loadingItem"
		@submit="onFormSubmit"
	>
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
					v-model="formData[field.id]"
					outlined
					stack-label
					:label="field.label"
					:value="field.value"
					:rules="[
						value => {
							const {min, max} = field.validation;
							const inputLength = value.length;
							const message = 'Please enter ' + field.label;
							return !field.optional && inputLength >= min && inputLength <= max || message;
						}
					]"
					:disable="!isFormEnabled"
					type="text"
				/>

				<q-input
					v-else-if="field.type === 'inputTextArea'"
					v-model="formData[field.id]"
					outlined
					stack-label
					:label="field.label"
					:value="field.value"
					:disable="!isFormEnabled"
					type="textarea"
				/>

				<q-select
					v-else-if="field.type === 'inputSelect'"
					v-model="formData[field.id]"
					outlined
					stack-label
					:options="field.options"
					:label="field.label"
					:disable="!isFormEnabled"
				/>

				<q-file
					v-else-if="field.type === 'inputDocument'"
					v-model="formData[field.id]"
					stack-label
					:accept="field.accept"
					:label="field.label"
					:disable="!isFormEnabled"
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
					type="submit"
					color="primary"
					:disable="!isFormEnabled"
				>
					<q-spinner
						v-if="store.submittingTask"
						color="#FFFFFF"
						size="1em"
					/>
					<span class="q-px-sx">SUBMIT</span>
				</q-btn>
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
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';

const store = useMaxComplyStore();
const route = useRoute();
const taskID = Number(route.params.id);

const formData = ref({});
const isFormEnabled = ref(true);

const onFormSubmit = async () => {
	await store.submitTask(`/tasks/${store.item.id}`, formData.value);
	isFormEnabled.value = false;
};

onMounted(async () => {
	await store.getItem(`/tasks/${taskID}`);
	formData.value = store.item.fields.reduce((formDataObject, field) => {
		formDataObject[field.id] = undefined;
		return formDataObject;
	}, {});
});
</script>