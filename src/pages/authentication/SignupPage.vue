<template>
  <div class="background">
    <div class="white-box">
      <div class="signup-content">
        <div class="align-text">
          <div class="title">
            회원가입을 위해 <br>
            정보를 입력해주세요.
          </div>
        </div>
        <form @submit.prevent="handleSignup">
          <div class="form-item">
            <label for="email">이메일</label>
            <div class="align-contents">
              <input id="email" type="email" v-model="formValue.user.email" placeholder="이메일을 적어주세요." class="custom-input" />
              <button type="button" class="authentication-button" @click="showToast('인증 이메일을 보냈습니다.', 'success')">이메일 인증</button>
            </div>
          </div>
          <div class="form-item">
            <label for="authCode">인증번호</label>
            <div class="align-contents">
              <input id=authCode type="password" v-model="formValue.user.authCode" placeholder="인증번호를 적어주세요." class="custom-input" />
              <button type="button" class="authentication-button" @click="showToast('인증 성공', 'success')">인증 하기</button>
            </div>
          </div>
          <div class="form-item">
            <label for="password">비밀번호</label>
            <input id="password" type="password" v-model="formValue.user.password" placeholder="비밀번호를 적어주세요." class="custom-input" />
          </div>
          <div class="form-item">
            <label for="nickname">닉네임</label>
            <input id="nickname" type="text" v-model="formValue.user.nickname" placeholder="닉네임을 적어주세요." class="custom-input" />
          </div>
          <div class="form-item">
            <label for="birthday">생년월일</label>
            <input id="birthday" type="text" ref="birthdatePicker" v-model="formValue.user.birthday" placeholder="생일을 적어주세요." class="custom-input" />
          </div>
          <div class="form-item">
            <button type="submit" class="submit-button">가입 하기</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from 'vue';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/light.css';
import '../../assets/scss/mixins/_typo.scss'

const formValue = ref({
  user: {
    email: '',
    authCode: '',
    password: '',
    nickname: '',
    birthday: ''
  }
});

const birthdatePicker = ref<HTMLInputElement | null>(null);

onMounted(() => {
  if (birthdatePicker.value) {
    flatpickr(birthdatePicker.value, {
      dateFormat: 'Y-m-d',
    });
  }
});

const instance = getCurrentInstance();
const proxy = instance?.proxy;

const handleSignup = () => {
  if (proxy && proxy.$addToast) {
    proxy.$addToast('회원가입이 완료되었습니다.', 3000, 'success');
  }
  console.log('Form submitted', formValue.value);
};

const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
  if (proxy && proxy.$addToast) {
    proxy.$addToast(message, 3000, type);
  }
};
</script>

<style scoped lang="scss">
@import '../../assets/scss/color/_black.scss';
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

.signup-content {
  @include flex-column(flex-start, center);
  @include size(100%, 100%);
}

form {
  @include flex-column(flex-start, center);
  @include size(100%, 100%);
}

.title {
  @include noto-sans-kr(800, 30px, #1E1E1C);
}

.form-item {
  @include size(70%, auto);
  @include flex-column(flex-start, flex-start);
  margin-bottom: 18px;

  label {
    @include noto-sans-kr(500, 15px, #1E1E1C);
    margin-bottom: 5px;
  }
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

.authentication-button {
  @include custom-button(#98A2B3, #FCFCFD, 5%, 5%, 6px);
  @include size(130px, 31px);
  margin-left: 10px;
  @include noto-sans-kr(400, 16x, $gray25);
}

.submit-button {
  @include custom-button(#1570EF, #FCFCFD, 5%, 5%, 6px);
  @include noto-sans-kr(500, 14px, $gray25);
  @include size(102px, 36px);
  margin-top: 30px;
}
</style>
