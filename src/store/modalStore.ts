import { defineStore } from 'pinia';

export const useModalStore = defineStore('modalStore', {
    state: () => ({
        createModalOpen: false,
        updateModalOpen: {} as { [key: number]: boolean },
        updatePlanBoxModalOpen: {} as { [key: number]: boolean },
        createPlanModalOpen: {} as { [key: number]: boolean },
        planDetailModalOpen: {} as{ [key: number]: boolean }
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
        },
        openUpdatePlanBoxModal(planBoxId: number) {
            this.updatePlanBoxModalOpen[planBoxId] = true;
        },
        closeUpdatePlanBoxModal(planBoxId: number) {
            this.updatePlanBoxModalOpen[planBoxId] = false;
        },
        openCreatePlanModal(planId: number) {
            this.createPlanModalOpen[planId] = true;
        },
        closeCreatePlanModal(planId: number) {
            this.createPlanModalOpen[planId] = false;
        },
        openPlanDetailModal(planId: number) {
            this.planDetailModalOpen[planId] = true;
        },
        closePlanDetailModal(planId: number) {
            this.planDetailModalOpen[planId] = false;
        }
    }
});
