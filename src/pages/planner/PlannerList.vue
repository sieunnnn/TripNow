<template>
  <div class="background">
    <n-carousel
        direction="vertical"
        dot-placement="right"
        style="width: 87%; height: 300px; border-radius: 10px;  margin: 1.5% 0 1.5% 5%;"
    >
      <img
          class="carousel-img"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
      >
      <img
          class="carousel-img"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
      >
      <img
          class="carousel-img"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
      >
      <img
          class="carousel-img"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
      >
    </n-carousel>
    <form @submit.prevent="">
      <div class="form-item">
        <label for="travel" style="margin-bottom:8px;">⚡ 이전 여행 계획을 빠르게 찾아 보세요.</label>
        <div class="align-contents">
          <input id="title" type="text" v-model="formValue.title" placeholder="찾고 싶은 여행 계획을 적어 주세요." class="custom-input" />
          <button type="button" class="search-button" @click="">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" style="margin-right: 8px"/>
            <span class="label">검색</span>
          </button>
        </div>
      </div>
    </form>
    <div class="planner-list-container">
      <div class="planner-list-box">
        <div class="planner">
          <div class="flex-row" style="justify-content: space-between;">
            <div class="flex-row">
              <n-tag round :bordered="false" class="tag">
                <font-awesome-icon icon="fa-solid fa-user" style="margin: 0 5px 0 2px"/>
                1인 여행
              </n-tag>
              <n-tag round :bordered="false" type="error" class="tag" >
                <font-awesome-icon icon="fa-regular fa-eye" style="margin: 0 5px 0 2px"/>
                공개중
              </n-tag>
            </div>
            <font-awesome-icon icon="fa-regular fa-pen-to-square" style="margin-right: 12px" class="icon"/>
            <font-awesome-icon icon="fa-solid fa-trash-can" class="icon"/>
          </div>
          <div class="title">제주도 가고 싶어요 우히히힣</div>
          <div class="flex-row" style="align-items: center">
            <font-awesome-icon icon="fa-regular fa-calendar-check" class="icon" style="margin: 0 8px 0 2px; color: #E31B54"/>
            <div class="calendar">2024. 09. 23</div>
            <div class="calendar" style="margin: 0 5px">~</div>
            <div class="calendar">2024. 12. 17</div>
          </div>
          <div class="flex-row" style="justify-content: flex-end; margin-top: 20px">
            <div class="image">사람</div>
            <div class="image">사람</div>
            <div class="image">사람</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const formValue = ref({
  title: ''
})

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

.flex-row {
  @include flex-row(flex-start, flex-start);
  @include size(100%, auto);
}

.flex-col {
  @include flex-column(flex-start, flex-start);
  @include size(100%, auto);
}

.title {
  @include noto-sans-kr(700, 28px, $black);
  @include size(90%, auto);
  margin: 20px 0 12px 0;
}

.tag {
  @include noto-sans-kr(400, 12px, $gray700);
  margin-right: 10px;
}

.icon {
  @include noto-sans-kr(400, 18px, $gray500);
  margin-top: 5px;

  &:hover {
    cursor: pointer;
    color: $blue600;
  }
}

.calendar {
  @include noto-sans-kr(400, 14px, $black);
}

.image {
  @include flex-column(center, center);
  @include size(48px, 48px);
  background-color: $gray300;
  border-radius: 50%;
  margin-left: 10px;
}

.background {
  @include background($gray200);
  @include flex-column(flex-start, flex-start);
  @include size(100vw, 100vh);
}

form {
  @include flex-column(flex-start, flex-start);
  @include size(90%, auto);
  padding-left: 5%;
}

.form-item {
  @include size(33%, auto);
  @include flex-column(flex-start, flex-start);
  margin-bottom: 22px;

  label {
    @include noto-sans-kr(500, 15px, #1E1E1C);
    margin-bottom: 5px;
  }

  .error {
    @include noto-sans-kr(400, 14px, $red500);
    margin: 4px 0 0 2px;
  }
}

.align-contents {
  @include size(100%, auto);
  @include flex-row(flex-start, center);
  justify-items: center;
}

.custom-input {
  @include custom-input($gray400, $black, $gray400, white, transparent);
  @include size(100%, 30px);
  @include noto-sans-kr(400, 16x, $black);
}

.search-button {
  @include flex-row(center, center);
  @include custom-button($blue600, $gray25, 5%, 5%, 6px);
  @include noto-sans-kr(500, 13px, $gray25);
  @include size(110px, 32px);
  vertical-align: center;
  margin-left: 10px;
}

.label {
  margin-top: 3px;
}

.carousel-img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.planner-list-container {
  @include flex-column(flex-start, center);
  width: 100%;
  height: 100%;
  overflow:hidden;
}

.planner-list-box {
  @include size(90%, 95%);
  @include flex-row(flex-start, flex-start);
  overflow-y: scroll;
  flex-wrap: wrap;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
}

.planner {
  @include flex-column(flex-start, flex-start);
  @include size(24%, 220px);
  padding-inline: 20px;
  padding-block: 20px;
  background-color: $gray25;
  border-radius: 15px;
  margin: 0 10px 10px 0;
  overflow: hidden;
  text-wrap: nowrap;
}
</style>