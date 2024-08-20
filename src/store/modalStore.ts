import { defineStore } from 'pinia';

export const useModalStore = defineStore('modalStore', {
    state: () => ({
        createModalOpen: {} as { [key: number]: boolean },
        updateModalOpen: {} as { [key: number]: boolean },
        updatePlanBoxModalOpen: {} as { [key: number]: boolean },
        deletePlanBoxModelOpen: {} as { [key: number]: boolean },
        createPlanModalOpen: {} as { [key: number]: boolean },
        planDetailModalOpen: {} as { [key: number]: boolean },
        updatePlanModalOpen: {} as { [key: number]: boolean },
        deletePlanModalOpen: {} as { [key: number]: boolean },
        sendMessageModalOpen: {} as {[key: number]: boolean}
    }),
    actions: {
        openCreateModal(id: number) {
            this.createModalOpen[id] = true;
        },
        closeCreateModal(id: number) {
            this.createModalOpen[id] = false;
        },
        openUpdateModal(id: number) {
            this.updateModalOpen[id] = true;
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
        openDeletePlanBoxModal(planBoxId: number) {
            this.deletePlanBoxModelOpen[planBoxId] = true;
        },
        closeDeletePlanBoxModal(planBoxId: number) {
            this.deletePlanBoxModelOpen[planBoxId] = false;
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
        },
        openPlanUpdateModal(planId: number) {
            this.updatePlanModalOpen[planId] = true;
        },
        closePlanUpdateModal(planId: number) {
            this.updatePlanModalOpen[planId] = false;
        },
        openPlanDeleteModal(planId: number) {
            this.deletePlanModalOpen[planId] = true;
        },
        closePlanDeleteModal(planId: number) {
            this.deletePlanModalOpen[planId] = false;
        },
        openSendMessageModal(friendId: number) {
            this.sendMessageModalOpen[friendId] = true;
        },
        closeSendMessageModal(friendId: number) {
            this.sendMessageModalOpen[friendId] = false;
        }
    }
});
