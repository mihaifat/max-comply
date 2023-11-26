import { ref } from 'vue';
import { api } from 'boot/axios';
import { Notify } from 'quasar';

export function BaseStorePlugin(context) {
	// base state
	const item = ref({}); // single item
	const collection = ref([]); // array of items
	const loadingCollection = ref(true); // loading status of current store
	const loadingItem = ref(true); // loading status of current store

	// util
	/**
	 * determines if the API has returned a successful result
	 * @param {Object} response to test
	 * @returns {Promise}
	 */
	function handleApiResponse(response) {
		return new Promise((resolve, reject) => {
			if (response.status) {
				resolve(response);
			} else {
				reject(response);
			}
		});
	}

	/**
	 * displays error notification
	 * @param {String} message to display
	 */
	function handleApiError(message) {
		Notify.create({
			type: 'negative',
			message: message,
		});
	}

	function convertAcceptType(acceptType) {
		if (acceptType === 'pdf') {
			return 'application/pdf';
		} else if (acceptType === 'image') {
			return 'image/*';
		}
		throw new Error('Could not convert acceptType: ' + acceptType);
	}

	function addClassAttributeValueToEachField(item) {
		item.fields.forEach((field) => {
			field.class = 'col-xs-' + field.size.xs + ' col-sm-' + field.size.sm + ' col-md-' + field.size.md + ' col-lg-' + field.size.lg;
		});
		item.fields.filter((field) => field.validation && field.validation.acceptType)
			.forEach((field) => field.accept = convertAcceptType(field.validation.acceptType));
	}

	// actions
	/**
	 * calls GET function and assigns response to item value
	 * @param {String} url API endpoint
	 */
	function getItem(url) {
		loadingItem.value = true;

		api.get(url)
			.then(async (response) => {
				await handleApiResponse(response);
				addClassAttributeValueToEachField(response.data.data);
				item.value = response.data.data;

				loadingItem.value = false;
			})
			.catch((e) => {
				console.log(e);
				handleApiError(`error getting ${context.store.$id}`);
				loadingItem.value = false;
			});
	}

	/**
	 * calls GET function and assigns response to collection value
	 * @param {String} url API endpoint
	 */
	function getCollection(url) {
		loadingCollection.value = true;

		return api.get(url)
			.then(async (response) => {
				await handleApiResponse(response);
				collection.value = response.data.data;
				loadingCollection.value = false;
			})
			.catch(() => {
				handleApiError(`error getting ${context.store.$id}s`);
				loadingCollection.value = false;
			});
	}

	return {
		// state
		item,
		collection,
		loadingCollection,
		loadingItem,
		// actions
		getItem,
		getCollection,
	};
}