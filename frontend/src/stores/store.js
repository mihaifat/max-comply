import { defineStore } from 'pinia';
import { BaseStorePlugin } from './baseStorePlugin.pinia';

export const createMaxComplyStore = defineStore('max-comply-store', {
	plugins: [BaseStorePlugin],
});
