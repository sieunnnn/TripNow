<template>
  <div class="background">
    <div class="white-box">
      <div class="login-content">
        <div class="align-text">
          <div class="title">
            서비스 이용을 위해 <br>
            로그인을 해주세요.
          </div>
        </div>
        <form @submit.prevent="handleLogin">
          <div class="form-item">
            <label for="email">이메일</label>
            <div class="align-contents">
              <input id="email" type="email" v-model="formValue.email" placeholder="이메일을 적어주세요." class="custom-input" />
            </div>
          </div>
          <div class="form-item">
            <label for="password">비밀번호</label>
            <input id="password" type="password" v-model="formValue.password" placeholder="비밀번호를 적어주세요." class="custom-input"/>
          </div>
          <div class="form-item">
            <button type="submit" class="submit-button">로그인</button>
            <div class="form-item-row mini-text" style="width: 100%; margin: 15px 0 30px 0">
              <div class="mini-text">🔑 비밀번호가 기억이 안나시나요?</div>
              <div class="mini-text" style="margin-left: 10px; text-decoration: underline">비밀번호 찾기</div>
            </div>
          </div>
        </form>
        <div class="form-item sns-label">
          소셜 계정으로 30 초 만에 로그인하기
          <button type="button" class="submit-button sns-button">
            <img src="/google.png" width="22" height="22" class="image"/>
            <a href="http://localhost:8080/api/v1/oauth/authorize/google" class="link" style="text-decoration: none">구글 계정 으로 로그인</a>
          </button>
          <button type="button" class="kakao" style="margin-bottom: 30px">
            <img src="/kakao.png" width="22" height="22" class="image"/>
            카카오 계정 으로 로그인
          </button>
        </div>
        <hr class="form-item">
        <div class="form-item-row">
          <div class="mini-text">✋ 회원가입이 필요하신가요? </div>
          <router-link to="/signup" class="mini-text" style="margin-left: 10px; text-decoration: underline;">회원가입 하기</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { loginRequest } from "../../dto/AuthenticationDto.ts";
import {getUserInfo, login} from "../../api/AuthenticationApi.ts";
import { useMessage } from "naive-ui";

import router from "../../router";

import '../../assets/scss/mixins/_typo.scss'

const formValue = ref({
  email: '',
  password: '',
});

const message = useMessage();

const handleLogin = async () => {
  const data: loginRequest = {
    email: formValue.value.email,
    password: formValue.value.password
  };

  const status = await login(data);

  if (status === 200) {
    const response = await getUserInfo();

    message.success("로그인에 성공 했어요.", {
      keepAliveOnHover: true
    });

    if (response.status == 200) {
      await router.push('/');
    }

  } else {
    message.warning("이메일과 비밀 번호를 다시 한번 확인해주세요.", {
      keepAliveOnHover: true
    });
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/scss/color/_black.scss';
@import '../../assets/scss/color/_blue.scss';
@import '../../assets/scss/color/_red.scss';
@import '../../assets/scss/mixins/_background.scss';
@import '../../assets/scss/mixins/_display.scss';
@import '../../assets/scss/mixins/_input.scss';
@import '../../assets/scss/mixins/_button.scss';
@import '../../assets/scss/mixins/_typo.scss';

.background {
  @include background($gray200);
  @include flex-column(center, center);
  @include size(100vw, 100vh);
}

.white-box {
  @include background($gray25);
  @include flex-column(flex-start, center);
  @include size(500px, 85%);
  min-width: 500px;
  border-radius: 15px;
}

.login-content {
  @include flex-column(flex-start, center);
  @include size(100%, auto);
}

form {
  @include flex-column(flex-start, center);
  @include size(100%, 100%);
}

.title {
  @include noto-sans-kr(900, 30px, #1E1E1C);
}

.form-item {
  @include size(70%, auto);
  @include flex-column(flex-start, flex-start);
  margin-bottom: 18px;

  label {
    @include noto-sans-kr(500, 15px, #1E1E1C);
    margin-bottom: 5px;
  }

  .error {
    @include noto-sans-kr(400, 14px, $red500);
    margin: 4px 0 0 2px;
  }
}

.form-item-row {
  @include size(70%, auto);
  @include flex-row(flex-start, center);
  @include noto-sans-kr(400, 15px, $gray600);
}

.align-text {
  @include size(70%, auto);
  @include flex-column(flex-start, flex-start);
  margin: 50px 0 40px 0;
}

.align-contents {
  @include size(100%, auto);
  @include flex-row(flex-start, center);
  justify-items: center;
}

.custom-input {
  @include custom-input();
  @include size(100%, 30px);
  @include noto-sans-kr(400, 16x, $black);
}

.error-input {
  @include custom-input-error();
}

.authentication-button {
  @include custom-button($gray400, #FCFCFD, 5%, 5%, 6px);
  @include size(130px, 31px);
  margin-left: 10px;
  @include noto-sans-kr(400, 16x, $gray25);
}

.submit-button {
  @include custom-button($blue600, $gray25, 5%, 5%, 6px);
  @include noto-sans-kr(500, 16px, $gray25);
  @include size(100%, 45px);
  margin-top: 12px;
}

.image {
  margin: 0 40px 0 30px;
}

.sns-label {
  @include noto-sans-kr(700, 18px, $black);
}

.kakao {
  @include custom-button(#FFCD00, $black, 5%, 5%, 6px);
  @include flex-row(flex-start, center);
  @include noto-sans-kr(700, 16px, $black);
  @include size(100%, 45px);
  margin-top: 12px;
}

.sns-button {
  @include custom-button($blue600, $gray25, 5%, 5%, 6px);
  @include flex-row(flex-start, center);
  @include noto-sans-kr(700, 16px, $gray25);
  @include size(100%, 45px);
}

.link {
  color: inherit;
  text-decoration: underline;
  text-decoration-color: $gray400;
  @include noto-sans-kr(400, 16px, $gray25);
  cursor: pointer;
  margin-left: 10px
}

.mini-text {
  color: $gray600;
  @include noto-sans-kr(400, 15px, $gray600);
  cursor: pointer;
}

</style>
