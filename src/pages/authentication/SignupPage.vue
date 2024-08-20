<template>
  <div class="background">
    <div class="white-box">
      <div class="signup-content">
        <div class="align-text">
          <div class="title" style="margin-top: 40px">
            회원가입을 위해 <br>
            정보를 입력해주세요.
          </div>
        </div>
        <form @submit.prevent="handleSignup">
          <div class="form-item">
            <label for="email">이메일</label>
            <div class="align-contents">
              <input id="email" type="email" v-model="formValue.email" placeholder="이메일을 적어주세요." class="custom-input" />
              <button type="button" class="authentication-button" @click="handleEmailSend">이메일 인증</button>
            </div>
          </div>
          <div class="form-item">
            <label for="authCode">인증번호</label>
            <div class="align-contents">
              <input id=authCode type="password" v-model="code" placeholder="인증번호를 적어주세요." class="custom-input" :disabled="isCodeInputDisabled"/>
              <button type="button" class="authentication-button" @click="handleAuthValidate">인증 하기</button>
            </div>
          </div>
          <div class="form-item">
            <label for="password">비밀번호</label>
            <input id="password" type="password" v-model="formValue.password" placeholder="비밀번호를 적어주세요." :class="{'custom-input': true, 'error-input': passwordError}" :disabled="isInputDisabled"/>
            <div v-if="passwordError" class="error">{{ passwordError }}</div>
          </div>
          <div class="form-item">
            <label for="nickname">닉네임</label>
            <input id="nickname" type="text" v-model="formValue.nickname" placeholder="닉네임을 적어주세요." :class="{'custom-input': true, 'error-input': nicknameError}" :disabled="isInputDisabled"/>
            <div v-if="nicknameError" class="error">{{ nicknameError }}</div>
          </div>
          <div class="form-item">
            <label for="birthday">생년월일</label>
            <input type="date" class="custom-input" v-model="formValue.birthday" placeholder="생일을 선택해주세요." style="width: 100%" :disabled="isInputDisabled"/>
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
import { authenticationMailSend, authenticationValidate, signup } from '../../api/AuthenticationApi.ts';
import { authenticationRequest, authenticationValidateRequest, signupRequest } from '../../dto/AuthenticationDto.ts';
import { ref, computed } from 'vue';
import { useMessage } from 'naive-ui';

import DatePicker from "../../components/DatePicker.vue";
import router from "@/router";

const formValue = ref({
  email: '',
  password: '',
  nickname: '',
  birthday: new Date()
});

const message = useMessage();

const code = ref('');
const isCodeInputDisabled = ref(true);
const isInputDisabled = ref(true);

const passwordPattern = /^[A-Za-z\d~!@#$%^&*()_\-+=\[\]{}|\\;:'",.<>?/]{8,20}$/;
const nicknamePattern = /^[a-zA-Z가-힣\d]+$/;

const passwordError = computed(() => {
  return passwordPattern.test(formValue.value.password) ? '' : '영문, 숫자, 특수문자를 사용하여 8-20 자로 만들어주세요.';
});

const nicknameError = computed(() => {
  return nicknamePattern.test(formValue.value.nickname) && formValue.value.nickname.length >= 2 && formValue.value.nickname.length <= 12
      ? ''
      : '닉네임은 2-12 글자로 만들수 있어요.';
});

const handleEmailSend = async () => {
  const data: authenticationRequest = {
    email: formValue.value.email,
  };

  const response = await authenticationMailSend (data);

  if (response.status === 200) {
    message.success("인증 번호가 담긴 메일을 발송 했어요.", {
      keepAliveOnHover: true
    });

    isCodeInputDisabled.value = false;

  } else if (response.status === 400) {
    if (response.data.errorCode === 'MAIL_01') {
      message.error("잘못된 이메일 형식이에요.", {
        keepAliveOnHover: true
      });

    } else if (response.data.errorCode === 'INVALID_VALUE_02') {
      message.warning("이미 존재하는 이메일이에요. 로그인 페이지로 이동할게요.", {
        keepAliveOnHover: true
      });

      await router.push('/login');
    }
  }
};

const handleAuthValidate = async () => {
  const data: authenticationValidateRequest = {
    email: formValue.value.email,
    tempCode: code.value,
  };

  const response = await authenticationValidate (data);

  if (response === 200) {
    message.success("이메일 인증이 완료 되었어요.", {
      keepAliveOnHover: true
    });

    isInputDisabled.value = false;

  } else {
    message.error("인증 번호를 다시 입력해주세요.", {
      keepAliveOnHover: true
    });
  }
};

const handleSignup = async () => {
  const data: signupRequest = {
    email: formValue.value.email,
    password: formValue.value.password,
    nickname: formValue.value.nickname,
    birthday: formValue.value.birthday,
  };

  const status = await signup(data);

  if (status === 200) {
    message.success("회원 가입이 완료 되었어요.", {
      keepAliveOnHover: true
    });

    await router.push('/login')

  } else {
    message.error("회원가입을 다시 시도해주세요.", {
      keepAliveOnHover: true
    });
  }
};
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
  @include size(500px, 80%);
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
  @include noto-sans-kr(900, 30px, #1E1E1C);
}

.form-item {
  @include size(70%, auto);
  @include flex-column(flex-start, flex-start);
  margin-bottom: 18px;

  label {
    @include noto-sans-kr(700, 15px, #1E1E1C);
    margin-bottom: 5px;
  }

  .error {
    @include noto-sans-kr(500, 14px, $red500);
    margin: 4px 0 0 2px;
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
  @include noto-sans-kr(400, 14x, $black);
}

.error-input {
  @include custom-input-error();
}

.authentication-button {
  @include custom-button($gray400, #FCFCFD, 5%, 5%, 6px);
  @include size(130px, 32px);
  margin-left: 10px;
  @include noto-sans-kr(400, 14px, $gray25);
}

.submit-button {
  @include custom-button($blue600, $gray25, 5%, 5%, 6px);
  @include noto-sans-kr(500, 14px, $gray25);
  @include size(100%, 45px);
  margin-top: 25px;
}
</style>
