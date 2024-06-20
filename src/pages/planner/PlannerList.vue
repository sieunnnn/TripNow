<template>
  <div class="background">
    <n-carousel
        direction="vertical"
        dot-placement="right"
        style="width: 87%; height: 300px; border-radius: 10px;  margin: 1.5% 0 25px 5%;"
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
    <div class="flex-row" style="justify-content: center">
      <div class="flex-row" style="align-items: flex-end; justify-content: space-between; width: 90%;">
        <button class="blue-button" type="button" @click="handleCreatePlannerModal" style="width: 130px; margin: 0 0 16px 0; min-width: 120px">
          <font-awesome-icon icon="fa-regular fa-calendar-plus" style="margin: 0 8px 2px 0" />
          여행 추가 하기
        </button>
        <div class="flex-row" style="width: 550px">
          <div class="form-item">
            <div class="align-contents">
              <input id="title" type="text" v-model="formValue.title" placeholder="찾고 싶은 여행 계획을 적어 주세요." class="custom-input" />
              <button type="submit" class="blue-button" @click="handleSearch">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" style="margin-right: 8px"/>
                <span class="label">검색</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="planner-list-container">
      <div class="planner-list-box">
        <div class="planner">
          <div class="flex-row" style="justify-content: space-between;">
            <div class="flex-row">
              <n-tag size="small" round :bordered="false" style="margin: 2px 10px 0 0">
                <font-awesome-icon icon="fa-solid fa-user" style="margin: 0 2px 0 2px"/>
                1인 여행
              </n-tag>
              <n-tag size="small" round :bordered="false" type="warning" style="margin-top: 2px;">
                <font-awesome-icon icon="fa-regular fa-eye" style="margin: 0 2px 0 2px" />
                공개중
              </n-tag>
            </div>
            <font-awesome-icon icon="fa-regular fa-pen-to-square" style="margin-right: 15px" class="icon"/>
            <font-awesome-icon icon="fa-solid fa-trash-can" class="icon"/>
          </div>
          <div class="title">제주도 가고 싶어요 우히히힣</div>
          <div class="flex-row" style="align-items: center">
            <font-awesome-icon icon="fa-regular fa-calendar-check" class="icon" style="margin: 0 8px 0 2px; color: #FB6514"/>
            <div class="calendar">2024. 09. 23</div>
            <div class="calendar" style="margin: 0 5px">~</div>
            <div class="calendar">2024. 12. 17</div>
          </div>
          <div class="flex-row" style="justify-content: flex-end; margin-top: 16px">
            <n-avatar-group :options="options" :size="48" :max="4">
              <template #avatar="{ option: { name, src } }">
                <n-tooltip>
                  <template #trigger>
                    <n-avatar :src="src"/>
                  </template>
                  {{ name }}
                </n-tooltip>
              </template>
              <template #rest="{ options: restOptions, rest }">
                  <n-avatar :options="createDropdownOptions(restOptions)">+{{ rest }}</n-avatar>
              </template>
            </n-avatar-group>
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

let createModalOpen = ref(false);

const handleCreatePlannerModal = async () => {
  createModalOpen.value = true;
}

const handleSearch = async () => {
}

const options = ref([
  {
    name: 'Leonardo DiCaprio',
    src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
  },
  {
    name: 'Jennifer Lawrence',
    src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
  },
  {
    name: 'Audrey Hepburn',
    src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
  },
  {
    name: 'Anne Hathaway',
    src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
  },
  {
    name: 'Taylor Swift',
    src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
  }
]);

type Option = {
  name: string;
  src: string;
};

const createDropdownOptions = (options: Option[]) => {
  return options.map((option: Option) => ({
    key: option.name,
    label: option.name
  }));
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

.flex-row {
  @include flex-row(flex-start, flex-start);
  @include size(100%, auto);
}

.flex-col {
  @include flex-column(flex-start, flex-start);
  @include size(100%, auto);
}

.title {
  @include noto-sans-kr(900, 28px, $black);
  @include size(90%, auto);
  margin: 20px 0 12px 0;
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
  @include noto-sans-kr(400, 14px, $gray600);
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
  @include size(550px, auto);
}

.form-item {
  @include size(495px, auto);
  @include flex-column(flex-start, flex-start);
  margin-bottom: 16px;

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

.blue-button {
  @include flex-row(center, center);
  @include custom-button($blue600, $gray25, 5%, 5%, 6px);
  @include noto-sans-kr(500, 13px, $gray25);
  @include size(80px, 32px);
  min-width: 80px;
  vertical-align: center;
  margin-left: 10px;
}

.label {
  @include noto-sans-kr(500, 13px, $gray25);
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
  min-width: 400px;
  padding-inline: 20px;
  padding-block: 20px;
  background-color: $gray25;
  border-radius: 15px;
  margin: 0 10px 10px 0;
  overflow: hidden;
  text-wrap: nowrap;
}
</style>