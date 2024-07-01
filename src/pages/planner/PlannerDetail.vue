<template>
<div class="planner-detail-container">
  <div class="planner-detail-header">
    <div class="title-container">
      <div class="title">
        플래너 제목임
        <font-awesome-icon icon="fa-regular fa-pen-to-square"  @click="openUpdatePlannerModal(planner)"  class="icon"/>
        <Modal :isOpen="modalStore.updateModalOpen" :close="closeUpdatePlannerModal">
          <template #header>
            여행 계획 수정 하기
          </template>
          <template #content>
            <div class="modal-sub-title">여행 계획의 이름을 수정해주세요.</div>
            <div class="modal-text">최대 20자 까지 가능해요.</div>
            <input v-model="update.title" :placeholder="planner.title" type="text" :class="{'modal-input': true, 'modal-error-input': !isTitleValid}"/>
            <div v-if="!isTitleValid" class="modal-error-message">제목은 최대 20자까지 가능합니다.</div>
            <div class="modal-sub-title" style="margin-top: 18px">여행 계획의 공개 여부를 정해주세요.</div>
            <div class="modal-text">비공개로 설정하면 나만볼 수 있어요.</div>
            <div class="modal-flex-row" style="margin: 10px 0 32px 0">
              <input v-model="update.isPrivate" type="checkbox" style="margin:0 8px 0 2px"/>
              <span class="modal-text">비공개로 설정하기</span>
            </div>
          </template>
          <template #footer>
            <button @click="handleUpdatePlanner(planner.plannerId)" class="modal-button">수정 하기</button>
          </template>
        </Modal>
      </div>
      <div class="travel-date">
        <font-awesome-icon icon="fa-regular fa-calendar" class="icon" />
        <span style="margin-right: 5px">2024.05.16</span>
        <span style="margin-right: 5px">~</span>
        <span style="margin-right: 5px">2024.05.20</span>
      </div>
    </div>
    <div style="margin-top: 22px">
      <n-avatar-group :options="options" :size="65" :max="7">
        <template #avatar="{ option: { name, src } }">
          <n-tooltip>
            <template #trigger>
              <n-avatar :src="src" />
            </template>
            {{ name }}
          </n-tooltip>
        </template>
        <template #rest="{ options: restOptions, rest }">
          <n-dropdown :options="createDropdownOptions(restOptions)" placement="top">
            <n-avatar>+{{ rest }}</n-avatar>
          </n-dropdown>
        </template>
      </n-avatar-group>
    </div>
  </div>
  <div class="planner-detail-box">
    <div class="date-container">
      <div class="date-box">
        <div class="date">
          <div class="text">2024.05.16</div>
          <font-awesome-icon icon="fa-regular fa-pen-to-square" class="icon"/>
        </div>
      </div>
      <div class="todo-list">
        <div class="todo">
          <div class="todo-title">흑돼지 조지기</div>
          <div class="content-container">
            <div class="content">
              <font-awesome-icon icon="fa-solid fa-location-dot" class="icon"/>
              <span class="text" style="cursor: pointer">제주도 어쩌구 저쩌구 123-4</span>
            </div>
            <div class="content">
              <font-awesome-icon icon="fa-solid fa-phone" class="icon"/>
              <span class="text">02-123-5678</span>
            </div>
            <div class="content">
              <font-awesome-icon icon="fa-solid fa-receipt" class="icon"/>
              <span class="text">100,000</span>
              <span>
                <n-tag :bordered="false" size="small" round >
                  Real Love
                </n-tag>
              </span>
            </div>
          </div>
          <div class="todo-time">
            <span></span>
          </div>
          <div></div>
        </div>
        <div class="todo">
          <div class="todo-title"></div>
          <div class="todo-time">
            <span></span>
          </div>
          <div></div>
        </div>
      </div>
      <div class="budget-box">
        <div class="budget">
          <font-awesome-icon icon="fa-solid fa-won-sign" class="icon"/>
          <div class="text">200,000</div>
        </div>
      </div>
    </div>
    <div class="date-container">
      <div class="date-box"></div>
      <div class="todo-list">
        <div class="todo">
          <div class="todo-title"></div>
          <div class="todo-time">
            <span></span>
          </div>
          <div></div>
        </div>
      </div>
      <div class="budget"></div>
    </div>
    <div class="date-container">
      <div class="date-box"></div>
      <div class="todo-list">
        <div class="todo">
          <div class="todo-title"></div>
          <div class="todo-time">
            <span></span>
          </div>
          <div></div>
        </div>
      </div>
      <div class="budget"></div>
    </div>
    <div class="date-container">
      <div class="date-box"></div>
      <div class="todo-list">
        <div class="todo">
          <div class="todo-title"></div>
          <div class="todo-time">
            <span></span>
          </div>
          <div></div>
        </div>
      </div>
      <div class="budget"></div>
    </div>
    <div class="date-container">
      <div class="date-box"></div>
      <div class="todo-list">
        <div class="todo">
          <div class="todo-title"></div>
          <div class="todo-time">
            <span></span>
          </div>
          <div></div>
        </div>
      </div>
      <div class="budget"></div>
    </div>
    <div class="date-container">
      <div class="date-box"></div>
      <div class="todo-list">
        <div class="todo">
          <div class="todo-title"></div>
          <div class="todo-time">
            <span></span>
          </div>
          <div></div>
        </div>
      </div>
      <div class="budget"></div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import Modal from "../../components/Modal.vue";
import {useModalStore} from "../../store/modalStore.ts";
import {plannerUpdateRequest} from "../../dto/PlannerDto.ts";
import {updatePlanner} from "../../api/PlannerApi.ts";
import { useMessage } from "naive-ui";

const message = useMessage();

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

const createDropdownOptions = (options: Array<{ name: string; src: string }>) => {
  return options.map((option) => ({
    key: option.name,
    label: option.name
  }));
};

// 모달
const modalStore = useModalStore();

const update = ref({
  title: '',
  isPrivate: false
})

const openUpdatePlannerModal = (planner: any) => {
  update.value.title = planner.title;
  update.value.isPrivate = planner.isPrivate;
  modalStore.openUpdateModal();
};

const closeUpdatePlannerModal = () => {
  modalStore.closeUpdateModal();
}

// 검증
const isTitleValid = computed(() => update.value.title.length <= 20);

// api
const handleUpdatePlanner = async (plannerId: number) => {
  if (!isTitleValid.value) {
    message.error("제목은 최대 20자까지 가능합니다.");
    return;
  }

  const data: plannerUpdateRequest = {
    title: update.value.title,
    isPrivate: update.value.isPrivate
  };

  const response = await updatePlanner(data, plannerId);

  if (response === 200) {
    message.success("여행 계획 수정에 성공 했어요.", {
      keepAliveOnHover: true
    });

    modalStore.closeUpdateModal();
    await loadMorePlanners(true);

  } else {
    message.error("여행 계획 수정에 실패 했어요. 잠시 후 다시 시도해주세요.", {
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
@import "../../assets/styles/modal.scss";

.planner-detail-container {
  @include background($gray200);
  @include size(90%, 100%);
  @include flex-column(flex-start, center);
}

.planner-detail-header {
  flex: 0 0 14%;
  @include background($blue100);
  @include flex-row(space-between, center);
  @include size(90%, 100%);
}

.planner-detail-box {
  flex: 1;
  @include background($red100);
  @include flex-row(flex-start, flex-start);
  @include size(90%, 100%);
  overflow-x: scroll;
}

.title-container {
  display: flex;
  @include flex-column();
  @include size(90%, 100%);
}

.title {
  margin-top: 42px;
  @include noto-sans-kr(900, 40px, $black);

  .icon {
    @include noto-sans-kr(400, 20px, $gray500);
    margin-left: 10px;
    cursor: pointer;
  }
}

.travel-date {
  @include flex-row(flex-start, center);
  @include size(auto, auto);
  margin: 12px 0 0 5px;

  .icon {
    @include noto-sans-kr(400, 18px, $gray500);
    margin-right: 6px;
    color: $pink500;
  }

  span {
    @include noto-sans-kr(400, 17px, $gray500);
  }
}

.date-container {
  @include size(25%, 100%);
  min-width: 380px;
  background: blue;

  .date-box {
    @include size(94%, 12%);
    @include flex-row(center, center);

    .date {
      @include flex-row(center, center);
      @include size(100%, 90%);
      background: $blue700;
      border-radius: 10px;
    }

    .text {
      @include noto-sans-kr(600, 36px, $gray25);
    }

    .icon {
      @include noto-sans-kr(300, 18px, $gray25);
      margin: 13px 0 0 12px;
      cursor: pointer;
    }
  }

  .todo-list {
    @include size(94%, 76%);
    background: orange;

    .todo {
      @include size(100%, auto);
      @include flex-column(flex-start, flex-start);
      min-height: 200px;
      border-radius: 10px;
      padding: 25px 20px;
      background: $gray25;
      margin-bottom: 15px;

      .todo-title {
        @include noto-sans-kr(900, 26px, $black);
      }

      .content-container {
        @include flex-column();
        margin: 12px 0 0 3px;

        .content {
          @include flex-row();

          .icon {
            @include noto-sans-kr(500, 16px, $black);
            color: $gray500;
            margin-right: 5px;
          }

          .text {
            @include noto-sans-kr(500, 16px, $black);
            margin-bottom: 6px;
          }
        }
      }
    }
  }

  .budget-box {
    @include size(94%, 12%);
    @include flex-row(center, center);

    .budget {
      @include flex-row(center, center);
      @include size(100%, 90%);
      background: $blue700;
      border-radius: 10px;
    }

    .text {
      @include noto-sans-kr(600, 36px, $gray25);
    }

    .icon {
      @include noto-sans-kr(300, 26px, $gray25);
      margin: 10px 10px 0 0;
      cursor: pointer;
    }
  }
}
</style>