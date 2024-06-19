<template>
  <div class="flex-row">
    <Navigator class="navigator"/>
    <RouterView class="content" />
  </div>
</template>

<script setup lang="ts">
import Navigator from "../layout/Navigator.vue";
</script>

<style scoped lang="scss">
@import '../assets/scss/mixins/_display.scss';
@import '../assets/scss/mixins/_button.scss';
@import '../assets/scss/mixins/_typo.scss';
@import '../assets/scss/color/_blue.scss';
@import '../assets/scss/color/_black.scss';

.flex-row {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: $gray100;
}

.navigator {
  flex: 0 0 100px;
  background-color: $gray25;
  transition: all 0.5s ease;

  &:hover {
    flex: 0 0 14%;
    min-width: 250px;
  }
}

.content {
  flex: 1;
  background-color: transparent;
  flex-wrap: nowrap;
}

</style>
