<template>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

onMounted(() => {
  const userId = route.query.userId as string;
  const nickname = route.query.nickname as string;
  const userTag = route.query.userTag as string;
  const profileImgUrl = route.query.profileImgUrl as string;



  localStorage.setItem('userId', userId);
  localStorage.setItem('nickname', nickname);
  localStorage.setItem('userTag', userTag);
  localStorage.setItem('profileImgUrl', profileImgUrl);

  router.push('/');
});
</script>

<style scoped lang="scss">

</style>