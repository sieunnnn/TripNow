<template>
  <div class="background">
    <n-carousel
        direction="vertical"
        dot-placement="right"
        style="width: 87%; height: 300px; border-radius: 10px; margin: 1.5% 0 25px 5%;"
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
      <div class="flex-row" style="width: 90%;">
        <button @click="openCreatePlannerModal" class="blue-button" type="button" style="width: 130px; margin: 0 50px 16px 0; min-width: 120px">
          <font-awesome-icon icon="fa-regular fa-calendar-plus" style="margin: 0 8px 2px 0" />
          여행 추가 하기
        </button>
        <Modal>
          <template #header>
            여행 계획 추가 하기
          </template>
          <template #content>
            <div class="modal-sub-title">여행 계획의 이름을 정해주세요.</div>
            <div class="modal-text">최대 20자 까지 가능해요.</div>
            <input type="text" class="modal-input"/>
            <div class="modal-sub-title" style="margin-top: 18px">여행 계획의 공개 여부를 정해주세요.</div>
            <div class="modal-text">비공개로 설정하면 나만볼 수 있어요.</div>
            <div class="modal-flex-row" style="margin: 10px 0 32px 0">
              <input type="checkbox" style="margin:0 8px 0 2px">
              <span class="modal-text">비공개로 설정하기</span>
            </div>
          </template>
          <template #footer>
            <button class="modal-button">추가 하기</button>
          </template>
        </Modal>
        <div class="flex-row" style="width: 555px">
          <div class="form-item">
            <div class="align-contents">
              <input id="title" type="text" v-model="formValue.title" placeholder="찾고 싶은 여행 계획을 적어 주세요." class="custom-input" />
              <button type="submit" class="blue-button" @click="handleSearch">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" style="margin-right: 8px"/>
                <span class="label" style="font-size: 14px; font-weight: 400">검색</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="planner-list-container">
      <n-infinite-scroll :load="loadMorePlanners" class="planner-list-box" :distance="10">
        <div v-for="planner in planners" :key="planner.plannerId" class="planner">
          <div class="flex-row" style="justify-content: space-between;">
            <div class="flex-row">
              <n-tag v-if="planner.profileImages.length === 1" size="small" round :bordered="false" style="margin: 2px 10px 0 0">
                <font-awesome-icon icon="fa-solid fa-user" style="margin: 0 2px 0 2px"/>
                1인 여행
              </n-tag>
              <n-tag v-else size="small" round :bordered="false" type="info" style="margin: 2px 10px 0 0">
                <font-awesome-icon icon="fa-solid fa-user" style="margin: 0 2px 0 2px"/>
                그룹 여행
              </n-tag>
              <n-tag v-if="!planner.isPrivate" size="small" round :bordered="false" type="success" style="margin: 2px 10px 0 0">
                <font-awesome-icon icon="fa-regular fa-eye-slash" style="margin: 0 2px 0 2px" />
                공개중
              </n-tag>
              <n-tag v-else size="small" round :bordered="false" style="margin: 2px 10px 0 0">
                <font-awesome-icon icon="fa-regular fa-eye" style="margin: 0 2px 0 2px" />
                비공개
              </n-tag>
            </div>
            <font-awesome-icon icon="fa-regular fa-pen-to-square" style="margin-right: 15px" class="icon"/>
            <font-awesome-icon icon="fa-solid fa-trash-can" class="icon"/>
          </div>
          <div class="title">{{ planner.title }}</div>
          <div class="flex-row" style="align-items: center">
            <font-awesome-icon v-if="isDatePassed(planner.endDate)" icon="fa-regular fa-calendar-check" class="icon" style="margin: 2px 8px 0 4px; color: #667085; font-size:16px"/>
            <font-awesome-icon v-else icon="fa-regular fa-calendar-check" class="icon" style="margin: 2px 8px 0 4px; color: #F63D68; font-size:16px"/>
            <div class="calendar">{{ planner.startDate }}</div>
            <div class="calendar" style="margin: 0 5px">~</div>
            <div class="calendar">{{ planner.endDate }}</div>
          </div>
          <div class="flex-row" style="justify-content: flex-end; margin-top: 16px">
            <n-avatar-group :options="planner.profileImages.map(img => ({ src: img }))" :size="48" :max="4">
              <template #avatar="{ option }">
                <n-avatar :src="option.src"/>
              </template>
              <template #rest="{ options: restOptions, rest }">
                <n-dropdown :options="createDropdownOptions(restOptions)" placement="top">
                  <n-avatar>+{{ rest }}</n-avatar>
                </n-dropdown>
              </template>
            </n-avatar-group>
          </div>
        </div>
      </n-infinite-scroll>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getPlannerList } from '../../api/PlannerApi.ts';
import { plannerListResponse } from '../../dto/PlannerDto.ts';
import Modal from "../../components/Modal.vue";
import { useModalStore } from "../../store/modalStore.ts";

const formValue = ref({
  title: ''
});

const modalStore = useModalStore();

const openCreatePlannerModal = () => {
  modalStore.openModal();
};

const planners = ref<plannerListResponse[]>([]);
const page = ref(0);
const size = 20;
const totalPages = ref(1);
const loading = ref(false);

const loadMorePlanners = async () => {
  if (loading.value || page.value >= totalPages.value) return;

  console.log('Loading planners...');

  loading.value = true;

  try {
    const response = await getPlannerList(page.value, size);
    planners.value.push(...response.content);
    page.value = response.number + 1;
    totalPages.value = response.totalPages;

    console.log(response.content);

  } catch (error) {
    console.error('Error loading planners:', error);

  } finally {
    loading.value = false;
  }
};

const createDropdownOptions = (options: Array<{ src: string }>) =>
    options.map((option) => ({
      key: option.src,
      label: option.src
    }));

const isDatePassed = (endDate: string) => {
  return new Date(endDate) < new Date();
};

onMounted(() => {
  loadMorePlanners();
});
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
@import "../../assets/styles/modal.scss";

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
  @include size(500px, auto);
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
  @include size(100%, 32px);
  @include noto-sans-kr(400, 16x, $black);
}

.blue-button {
  @include flex-row(center, center);
  @include custom-button($blue600, $gray25, 5%, 5%, 6px);
  @include noto-sans-kr(400, 14px, $gray25);
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
  padding: 0 5%;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.planner-list-box {
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
