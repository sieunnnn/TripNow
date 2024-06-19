<template>
  <div class="nav-bar-container">
    <div class="logo-container">
      <div class="logo">
        <img src="../../public/icon.png"  alt="icon" height="40" style="margin-left: 5px"/>
        <img src="../../public/logo.png"  alt="logo" height="26" style="margin: 13px 0 0 10px" class="image"/>
      </div>
      <n-divider />
      <div class="photo">
        <n-badge :value="value" :max="15">
          <n-avatar
            round
            :size="48"
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
        </n-badge>
        <div class="nickname">
          <div>
            김시은어쩌구
          </div>
          <div style="font-size: 16px; font-weight: 200; margin-top: 2px">
            <div># 9939</div>
          </div>
        </div>
      </div>
    </div>
    <div class="menu-container">
      <div class="menu-items">
        <div class="menu-button">
          <font-awesome-icon icon="fa-solid fa-house-user" class="icon"/>
          <span class="text">대시 보드</span>
        </div>
        <div class="menu-button">
          <font-awesome-icon icon="fa-solid fa-map-location-dot" class="icon"/>
          <span class="text">여행 계획</span>
        </div>
        <div class="menu-button">
          <font-awesome-icon icon="fa-solid fa-image" class="icon"/>
          <span class="text">여행 기록</span>
        </div>
        <div class="menu-button">
          <font-awesome-icon icon="fa-solid fa-earth-asia" class="icon"/>
          <span class="text">둘러 보기</span>
        </div>
        <div class="menu-button">
          <font-awesome-icon icon="fa-solid fa-envelope" class="icon"/>
          <span class="text">메세지 보내기</span>
        </div>
        <div class="menu-button">
          <font-awesome-icon icon="fa-solid fa-gear" class="icon"/>
          <span class="text">회원정보 수정</span>
        </div>
      </div>
      <div class="logout">
        <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" class="icon" />
        <span class="text">로그아웃</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {ref} from "vue";

const value = ref(5);
</script>

<style scoped lang="scss">
@import '../assets/scss/mixins/_display.scss';
@import '../assets/scss/mixins/_button.scss';
@import '../assets/scss/mixins/_typo.scss';
@import '../assets/scss/color/_blue.scss';
@import '../assets/scss/color/_black.scss';

.nav-bar-container {
  @include flex-column(flex-start, flex-start);
  background-color: $gray100;
  overflow: hidden;
  transition: width 0.5s ease;
  padding: 0 20px;

  &:hover {
    width: 100%; /* 호버 시 너비 */
    color: $gray500;

    .image, .nickname {
      display: inline;
    }

    .text {
      margin-left: 20px;
      transition: width 0.5s ease;
    }

    .logout {
      .text {
        font-size: 16px !important;
      }
    }
  }

  .text, .image, .nickname {
    display: none;
  }
}

.logo {
  margin: 15px 0 0 0;
  @include flex-row(100%, auto);
}

.icon {
  margin-left: 15px;
}

.photo {
  margin-top: 40px;
  @include flex-row(flex-start, center);
}

.logo-container, .user-container, .menu-container, .photo {
  width: 100%;
}

.logo-container {
  flex: 3;
  margin-left: 5px;
}

.nickname {
  @include flex-column();
  @include pretendard(900, 20px, $black);
  margin-left: 30px;
}

.menu-container {
  @include flex-column(space-between, flex-start);
  flex: 8;
}

.menu-items {
  @include flex-column(flex-start, flex-start);
  width: 100%;
}

.menu-button {
  @include flex-row(flex-start, center);
  @include pretendard(400, 25px, $gray500);
  width: 100%;
  align-items: center;
  margin-bottom: 18px;
  padding: 10px 0;
  cursor: pointer;

  .icon {
    font-size: 22px;
  }

  .text {
    @include pretendard(400, 16px, $gray500);
    white-space: nowrap;
    margin-left: 10px;
  }

  &:hover {
    background-color: $blue600;
    border-radius: 6px;
    @include size(100%, auto);
  }

  &:hover .text {
    display: inline-block;
    color: $gray25;
  }

  &:hover .icon {
    color: $gray25;
  }
}

.nav-bar-container:hover .text {
  display: inline-block;
}

.logout {
  flex: 1;
  @include flex-row(flex-start, center);
  cursor: pointer;
  position: fixed;
  bottom: 5%;
  margin: 0 0 0 4px;
  transition: width 0.5s ease;

  .text {
    @include pretendard(400, 18px, $gray400);
  }

  .icon {
    @include pretendard(400, 18px, $gray400);
  }

  &:hover {
    .icon {
      color: $blue600;
    }

    .text {
      @include pretendard(400, 18px, $blue600);
    };
  }
}
</style>
