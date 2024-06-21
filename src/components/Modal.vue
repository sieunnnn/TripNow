<template>
  <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <div class="flex-row">
        <button class="close-button" @click="closeModal">
          <font-awesome-icon icon="fa-solid fa-circle-xmark" />
        </button>
      </div>
      <div class="header"><slot name="header" ></slot></div>
      <div><slot name="content"></slot></div>
      <div class="flex-row"><slot name="footer"></slot></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from '../store/modalStore.ts';
import { computed } from 'vue';

const modalStore = useModalStore();
const isModalOpen = computed(() => modalStore.isModalOpen);
const closeModal = modalStore.closeModal;

</script>

<style scoped lang="scss">
@import '../assets/scss/color/_black.scss';
@import '../assets/scss/color/_blue.scss';
@import '../assets/scss/color/_red.scss';
@import '../assets/scss/mixins/_background.scss';
@import '../assets/scss/mixins/_display.scss';
@import '../assets/scss/mixins/_input.scss';
@import '../assets/scss/mixins/_button.scss';
@import '../assets/scss/mixins/_typo.scss';

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  @include size(auto, auto);
  min-width: 400px;
  background: white;
  padding: 24px 30px 36px 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.flex-row {
  @include flex-row(flex-end, flex-end);
  @include size(100%, auto);
}

.header {
  @include noto-sans-kr(800, 28px, $black);
  margin-bottom: 20px;
}

.close-button {
  border: none;
  background-color: transparent;
  @include noto-sans-kr(300, 18px, $gray500);

  &:hover {
    cursor: pointer;
  }
}

.modal-flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
