import { defineStore } from 'pinia';
import { BaseStorePlugin } from './baseStorePlugin.pinia';

export const useMaxComplyStore = defineStore('max-comply-store', {
	plugins: [BaseStorePlugin],
});
