<template>
  <div class="background">
    <n-carousel
        direction="vertical"
        dot-placement="right"
        style="width: 87%; height: 300px; border-radius: 10px; margin: 1.5% 0 25px 5%;"
    >
      <img
          class="carousel-img"
          src="https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=11288960&filePath=L2Rpc2sxL25ld2RhdGEvMjAxNS8wMi9DTFM2OS9OVVJJXzAwMV8wNDQ2X251cmltZWRpYV8yMDE1MTIwMw==&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10006"
      >
      <img
          class="carousel-img"
          src="https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=11289010&filePath=L2Rpc2sxL25ld2RhdGEvMjAxNS8wMi9DTFM2OS9OVVJJXzAwMV8wNDk2X251cmltZWRpYV8yMDE1MTIwMw==&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10006"
      >
    </n-carousel>
    <div class="flex-row" style="justify-content: center">
      <div class="flex-row" style="width: 90%;">
        <button @click="openCreatePlannerModal(1)" class="blue-button" type="button" style="width: 130px; margin: 0 50px 16px 0; min-width: 120px">
          <font-awesome-icon icon="fa-regular fa-calendar-plus" style="margin: 0 8px 2px 0" />
          여행 추가 하기
        </button>
        <Modal :isOpen="modalStore.createModalOpen[1]" :close="() => closeCreatePlannerModal(1)">
          <template #header>
            여행 계획 추가 하기
          </template>
          <template #content>
            <div class="modal-sub-title">여행 계획의 이름을 정해주세요.</div>
            <div class="modal-text">최대 20자 까지 가능해요.</div>
            <input v-model="create.title" type="text" :class="{'modal-input': true, 'modal-error-input': !isTitleValid(create.title)}"/>
            <div v-if="!isTitleValid(create.title)" class="modal-error-text">제목은 최대 20자까지 가능합니다.</div>
            <div class="modal-sub-title" style="margin-top: 18px">여행 계획의 공개 여부를 정해주세요.</div>
            <div class="modal-text">비공개로 설정하면 나만볼 수 있어요.</div>
            <div class="modal-flex-row" style="margin: 10px 0 32px 0">
              <input v-model="create.isPrivate" type="checkbox" style="margin:0 8px 0 2px"/>
              <span class="modal-text">비공개로 설정하기</span>
            </div>
          </template>
          <template #footer>
            <button @click="handleCreatePlanner" class="modal-button" style="height: 40px">추가 하기</button>
          </template>
        </Modal>
        <div class="flex-row" style="width: 555px">
          <div class="form-item">
            <div class="align-contents">
              <input id="title" type="text" v-model="formValue.input" placeholder="찾고 싶은 여행 계획을 적어 주세요." class="custom-input" />
              <button type="submit" class="blue-button" @click="handleSearch">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" style="margin-right: 8px"/>
                <span class="label" style="font-size: 14px; font-weight: 400">검색</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="planner-list-container" ref="plannerList">
      <div class="planner-list-box">
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
                <font-awesome-icon icon="fa-regular fa-eye" style="margin: 0 2px 0 2px" />
                공개중
              </n-tag>
              <n-tag v-else size="small" round :bordered="false" style="margin: 2px 10px 0 0">
                <font-awesome-icon icon="fa-regular fa-eye-slash" style="margin: 0 2px 0 2px" />
                비공개
              </n-tag>
            </div>
            <font-awesome-icon @click="openUpdatePlannerModal(planner.plannerId)" icon="fa-regular fa-pen-to-square" style="margin-right: 15px" class="icon"/>
            <Modal :isOpen="modalStore.updateModalOpen[planner.plannerId]" :close="() => closeUpdatePlannerModal(planner.plannerId)">
              <template #header>
                여행 계획 수정 하기
              </template>
              <template #content>
                <div class="modal-sub-title">여행 계획의 이름을 수정해주세요.</div>
                <div class="modal-text">최대 20자 까지 가능해요.</div>
                <input v-model="update[planner.plannerId].title" type="text" :class="{'modal-input': true, 'modal-error-input': !isTitleValid(update[planner.plannerId].title)}"/>
                <div v-if="!isTitleValid(update[planner.plannerId].title)" class="modal-error-text">제목은 최대 20자까지 가능합니다.</div>
                <div class="modal-sub-title" style="margin-top: 16px">여행 계획의 공개 여부를 정해주세요.</div>
                <div class="modal-text">비공개로 설정하면 나만볼 수 있어요.</div>
                <div class="modal-flex-row" style="margin: 10px 0 32px 0">
                  <input v-model="update[planner.plannerId].isPrivate" type="checkbox" style="margin:0 8px 0 2px"/>
                  <span class="modal-text">비공개로 설정하기</span>
                </div>
              </template>
              <template #footer>
                <button @click="handleUpdatePlanner(planner.plannerId)" style="height: 40px" class="modal-button">수정 하기</button>
              </template>
            </Modal>
            <font-awesome-icon @click="handleDeletePlanner(planner.plannerId)" icon="fa-solid fa-trash-can" class="icon"/>
          </div>
          <div @click="handlePlannerDetail(planner.plannerId)" class="title">{{ planner.title }}</div>
          <div v-if="planner.startDate && planner.endDate" class="flex-row" style="align-items: center">
            <font-awesome-icon v-if="isDatePassed(planner.endDate)" icon="fa-regular fa-calendar-check" class="icon" style="margin: 2px 8px 0 4px; color: #667085; font-size:16px"/>
            <font-awesome-icon v-else icon="fa-regular fa-calendar-check" class="icon" style="margin: 2px 8px 0 4px; color: #F63D68; font-size:16px"/>
            <div class="calendar">{{ planner.startDate }}</div>
            <div class="calendar" style="margin: 0 5px">~</div>
            <div class="calendar">{{ planner.endDate }}</div>
          </div>
          <div class="flex-row" style="justify-content: flex-end; margin-top: 16px">
            <n-avatar-group :options="processedProfileImages(planner.profileImages)" :size="48" :max="4">
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { createPlanner, deletePlanner, getPlannerList, updatePlanner } from '../../api/PlannerApi.ts';
import { plannerCreateRequest, plannerListResponse, plannerUpdateRequest } from '../../dto/PlannerDto.ts';
import { useModalStore } from "../../store/modalStore.ts";
import { useUserStore } from "../../store/userStore.ts";
import { useMessage } from "naive-ui";
import Modal from "../../components/Modal.vue";
import router from "@/router";
import { searchMyPlanners } from "../../api/SearchApi.ts";

const userStore = useUserStore();
const message = useMessage();
const modalStore = useModalStore();
const noResults = ref(false);
const formValue = ref({
  input: ''
});

// 클릭 이벤트
const handlePlannerDetail = async (plannerId: number) => {
  await router.push({ path: `/planners/${plannerId}` });
}

const create = ref({
  title: '',
  isPrivate: false
});

const update = ref<{ [key: number]: { title: string, isPrivate: boolean } }>({});

const openCreatePlannerModal = (id: number) => {
  create.value.title = '';
  create.value.isPrivate = false;
  modalStore.openCreateModal(id);
};

const closeCreatePlannerModal = (id: number) => {
  modalStore.closeCreateModal(id);
};

const openUpdatePlannerModal = (plannerId: number) => {
  closeAllUpdatePlannerModals();
  if (!update.value[plannerId]) {
    update.value[plannerId] = { title: '', isPrivate: false };
  }
  modalStore.openUpdateModal(plannerId);
};

const closeUpdatePlannerModal = (plannerId: number) => {
  modalStore.closeUpdateModal(plannerId);
};

const closeAllUpdatePlannerModals = () => {
  Object.keys(modalStore.updateModalOpen).forEach(plannerId => {
    modalStore.closeUpdateModal(parseInt(plannerId));
  });
};

// 검증
const isTitleValid = (title: string) => {
  return title.length <= 20;
};

const createDropdownOptions = (options: Array<{ src: string }>) =>
    options.map((option) => ({
      key: option.src,
      label: option.src
    }));

const isDatePassed = (endDate: string) => {
  return new Date(endDate) < new Date();
};

const defaultImage = '../../public/default.png';

const processedProfileImages = (images: string[]) => {
  return images.map(img => {
    return { src: img === 'Default' ? defaultImage : img };
  });
};

const handleSearch = async () => {
  const input = formValue.value.input;

  loading.value = true;
  page.value = 0;
  planners.value = [];
  noResults.value = false;

  try {
    const response = await searchMyPlanners(page.value, size, input);

    if (response.content && response.content.length > 0) {
      planners.value.push(...response.content);
      page.value = response.number + 1;
      totalPages.value = response.totalPages || 1;
    } else {
      noResults.value = true;
      message.error("검색 결과가 존재 하지 않아요. 다른 키워드를 입력해주세요.");
    }

  } catch (error) {
    console.error('Error loading planners:', error);
    message.error("검색 중 오류가 발생했습니다. 다시 시도해주세요.");

  } finally {
    loading.value = false;
  }
}

const handleCreatePlanner = async () => {
  if (!isTitleValid(create.value.title)) {
    message.error("제목은 최대 20자까지 가능합니다.");
    return;
  }

  const data: plannerCreateRequest = {
    title: create.value.title,
    isPrivate: create.value.isPrivate
  };

  const response = await createPlanner(data);

  if (response === 200) {
    message.success("여행 계획 생성에 성공 했어요.", {
      keepAliveOnHover: true
    });

    modalStore.closeCreateModal(1);
    await loadMorePlanners(true);

  } else {
    message.error("여행 계획 생성에 실패 했어요. 잠시 후 다시 시도해주세요.", {
      keepAliveOnHover: true
    });
  }
};

const handleUpdatePlanner = async (plannerId: number) => {
  const planner = update.value[plannerId];
  if (!planner || !isTitleValid(planner.title)) {
    message.error("제목은 최대 20자까지 가능합니다.");
    return;
  }

  const data: plannerUpdateRequest = {
    title: planner.title,
    isPrivate: planner.isPrivate
  };

  const response = await updatePlanner(data, plannerId);

  if (response === 200) {
    message.success("여행 계획 수정에 성공 했어요.", {
      keepAliveOnHover: true
    });

    modalStore.closeUpdateModal(plannerId);
    await loadMorePlanners(true);

  } else {
    message.error("여행 계획 수정에 실패 했어요. 잠시 후 다시 시도해주세요.", {
      keepAliveOnHover: true
    });
  }
};

const handleDeletePlanner = async (plannerId: number) => {
  const response = await deletePlanner(plannerId);

  if (response === 200) {
    message.success("여행 계획 삭제에 성공 했어요.", {
      keepAliveOnHover: true
    });

    await loadMorePlanners(true);

  } else {
    message.error("여행 계획 삭제에 실패 했어요. 잠시 후 다시 시도해주세요.", {
      keepAliveOnHover: true
    });
  }
}

// 무한 스크롤
const planners = ref<plannerListResponse[]>([]);
const page = ref(0);
const size = 12;
const totalPages = ref(1);
const loading = ref(false);

const loadMorePlanners = async (reset = false) => {
  if (reset) {
    planners.value = [];
    page.value = 0;
    totalPages.value = 1;
  }

  if (loading.value || page.value >= totalPages.value) return;

  console.log('Loading planners...');

  loading.value = true;

  try {
    const response = await getPlannerList(page.value, size);

    if (response.content) {
      planners.value.push(...response.content);
      page.value = response.number + 1;
      totalPages.value = response.totalPages || 1;
    }

  } catch (error) {
    console.error('Error loading planners:', error);

  } finally {
    loading.value = false;
  }
};

const handleScroll = () => {
  const container = plannerList.value;
  if (!container) return;

  const scrollTop = container.scrollTop;
  const scrollHeight = container.scrollHeight;
  const clientHeight = container.clientHeight;

  if (scrollTop + clientHeight >= scrollHeight - 50) {
    loadMorePlanners();
  }
};

const plannerList = ref<HTMLElement | null>(null);

onMounted(async () => {
  try {
    await userStore.fetchUserInfo();

    if (userStore.isUserLoggedIn) {
      await loadMorePlanners(true);
      plannerList.value?.addEventListener('scroll', handleScroll);
    }

  } catch (error) {
    console.error(error);
  }
});

onBeforeUnmount(() => {
  plannerList.value?.removeEventListener('scroll', handleScroll);
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
  @include flex-row(flex-start, flex-start);
  justify-items: center;
}

.custom-input {
  @include custom-input($gray400, $black, $gray400, white, transparent);
  @include size(100%, 32px);
  @include noto-sans-kr(400, 16px, $black);
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
  @include flex-column(flex-start, flex-start);
  padding: 0 5%;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.planner-list-box {
  @include flex-row(flex-start, flex-start);
  flex-wrap: wrap;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
}

.planner {
  @include flex-column(flex-start, flex-start);
  @include size(380px, auto);
  min-width: 380px;
  padding-inline: 20px;
  padding-block: 20px;
  background-color: $gray25;
  border-radius: 15px;
  margin: 0 20px 20px 0;
  overflow: hidden;
}
</style>
