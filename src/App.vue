<template>
  <n-notification-provider>
    <n-message-provider>
      <gmpx-api-loader :key=apiKey solution-channel="GMP_GE_mapsandplacesautocomplete_v1">
      </gmpx-api-loader>
      <router-view />
    </n-message-provider>
  </n-notification-provider>
</template>

<script setup lang="ts">
  const apiKey = process.env.GOOGLE_MAPS_KEY;
</script>

<style scoped>
</style>
