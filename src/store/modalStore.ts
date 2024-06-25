import { defineStore } from 'pinia';

export const useModalStore = defineStore('modalStore', {
    state: () => ({
        createModalOpen: false,
        updateModalOpen: {} as { [key: number]: boolean }
    }),
    actions: {
        openCreateModal() {
            this.createModalOpen = true;
        },
        closeCreateModal() {
            this.createModalOpen = false;
        },
        openUpdateModal(plannerId: number) {
            this.updateModalOpen[plannerId] = true;
        },
        closeUpdateModal(plannerId: number) {
            this.updateModalOpen[plannerId] = false;
        }
    }
});
