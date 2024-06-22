import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
    state: () => ({
        createModalOpen: false,
        updateModalOpen: false,
    }),
    actions: {
        openCreateModal() {
            this.createModalOpen = true;
        },
        closeCreateModal() {
            this.createModalOpen = false;
        },
        openUpdateModal() {
            this.updateModalOpen = true;
        },
        closeUpdateModal() {
            this.updateModalOpen = false;
        }
    }
});
