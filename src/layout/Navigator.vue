<template>
  <div class="nav-bar-container">
    <div class="logo-container">
      <div class="logo"><font-awesome-icon icon="fa-solid fa-paper-plane" /></div>
      <div class="photo">사진</div>
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
          <span class="text">쪽지 보내기</span>
        </div>
        <!--        <div class="menu-button">-->
        <!--          <font-awesome-icon icon="fa-solid fa-bell" class="icon"/>-->
        <!--          <span class="text">알림</span>-->
        <!--        </div>-->
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

    .photo {
      visibility: hidden;
      display: inline-block;
    }

    .menu-container {
      margin-top: 40px;
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

  .text {
    display: none;
  }
}

.icon {
  margin-left: 15px;
}

.logo-container, .user-container, .menu-container {
  width: 100%;
}

.logo-container {
  margin-top: 30px;
}

.photo {
  display: none;
  height: 200px;
}

.menu-container {
  @include flex-column(space-between, flex-start);
  height: 100%;
  margin-top: 240px;
}

.menu-items {
  @include flex-column(flex-start, flex-start);
  width: 100%;
}

.menu-button {
  @include flex-row(flex-start, center);
  @include noto-sans-kr(400, 25px, $gray500);
  width: 100%;
  align-items: center;
  margin-bottom: 18px;
  padding: 10px 0;
  cursor: pointer;

  .icon {
    font-size: 22px;
  }

  .text {
    @include noto-sans-kr(400, 16px, $gray500);
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
  @include flex-row(flex-start, center);
  cursor: pointer;
  position: fixed;
  bottom: 5%;
  margin: 0 0 0 4px;
  transition: width 0.5s ease;
  @include noto-sans-kr(400, 18px, $gray400);

  .icon {
    @include noto-sans-kr(400, 18px, $gray400);
  }

  &:hover {
    .icon {
      color: $blue600;
    }

    .text {
      @include noto-sans-kr(400, 18px, $blue600);
    };
  }
}
</style>
