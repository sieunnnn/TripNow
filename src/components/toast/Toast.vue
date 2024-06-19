<template>
  <div class="toast-manager">
    <transition-group name="fade" tag="div">
      <div v-for="(toast, index) in toasts" :key="index" class="toast" :class="toast.type">
        <span class="message">{{ toast.message }}</span>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useToast } from './Toast.ts';

const { toasts } = useToast();
</script>

<style scoped lang="scss">
@import "../../assets/scss/mixins/_display.scss";
@import "../../assets/scss/mixins/_typo.scss";
@import "../../assets/scss/color/_black.scss";
@import "../../assets/scss/color/_blue.scss";



.toast-manager {
  position: fixed;
  top: 7%;
  right: 4%;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.toast {
  @include flex-column(center, flex-start);
  margin-bottom: 10px;
  padding: 20px 30px;
  border-radius: 10px;
  min-width: 300px;
  min-height: 60px;
  box-sizing: border-box;
  white-space: nowrap;
  backdrop-filter: blur(12px);
  background-color: rgba(0, 0, 0, 0.3);
}

.message {
  @include pretendard(300, 16px, white);
  z-index: 10000;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
