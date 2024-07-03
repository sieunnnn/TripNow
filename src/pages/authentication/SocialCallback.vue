<template>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {useUserStore} from "../../store/userStore.ts";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

onMounted(() => {
  const token = route.query.token as string;
  const userId = Number(route.query.userId);
  const nickname = route.query.nickname as string;
  const userTag = Number(route.query.userTag);
  const birthday = new Date(route.query.birthDay as string);
  const email = route.query.email as string;
  const profileImgUrl = route.query.profileImgUrl as string;
  const isBirthday = route.query.isBirthday === 'true';
  const sex = route.query.sex as string

  localStorage.setItem("Authorization", token);

  userStore.setUserInfo({
    userId,
    nickname,
    userTag,
    birthday,
    email,
    profileImgUrl,
    isBirthday,
    sex
  });

  router.push('/planners');
});

</script>

<style scoped lang="scss">

</style>