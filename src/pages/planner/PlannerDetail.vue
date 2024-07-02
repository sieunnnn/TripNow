<template>
  <div class="planner-detail-container">
    <div class="planner-detail-header">
      <div class="title-container">
        <div class="title">
          플래너 제목임
          <div class="travel-date">
            <font-awesome-icon icon="fa-regular fa-calendar" class="icon" />
            <span style="margin-right: 5px">2024.05.16</span>
            <span style="margin-right: 5px">~</span>
            <span style="margin-right: 5px">2024.05.20</span>
          </div>
        </div>
        <div class="menu-container">
          <font-awesome-icon icon="fa-regular fa-pen-to-square"  @click="openUpdateModal(1)"  class="icon"/>
          <font-awesome-icon icon="fa-solid fa-user-plus" class="icon"/>
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
        </n-avatar-group>
      </div>
    </div>
    <div class="planner-detail-box">
      <div class="date-container">
        <div class="date-box">
          <div class="date">
            <div class="text">2024.05.16</div>
            <font-awesome-icon @click="openUpdatePlanBoxModal(1)" icon="fa-regular fa-pen-to-square" class="icon"/>
          </div>
        </div>
        <div class="todo-list">
          <div class="todo-container">
            <div class="todo" @click="openPlanDetailModal(1)">
              <div class="todo-title">흑돼지 조지기</div>
              <div class="content-container">
                <div class="content">
                  <font-awesome-icon icon="fa-regular fa-clock" class="icon" style="margin: 2px 5px 0 1px"/>
                  <span class="text">11:30</span>
                </div>
                <div class="content">
                  <font-awesome-icon icon="fa-solid fa-receipt" class="icon" style="margin-top: 2px;"/>
                  <span class="text">100,000</span>
                </div>
                <div class="content">
                  <font-awesome-icon icon="fa-solid fa-location-dot" class="icon" style="margin: 1px 5px 0 0"/>
                  <span class="text" style="cursor: pointer">제주도 어쩌구 저쩌구 123-4</span>
                </div>
                <div class="content">
                  <font-awesome-icon icon="fa-solid fa-phone" class="icon" style="margin-top: 2px"/>
                  <span class="text">02-123-5678</span>
                </div>
              </div>
            </div>
            <div class="todo" @click="openPlanDetailModal(2)">
              <div class="todo-title">흑돼지 조지기</div>
              <div class="content-container">
                <div class="content">
                  <font-awesome-icon icon="fa-regular fa-clock" class="icon" style="margin: 2px 5px 0 1px"/>
                  <span class="text">11:30</span>
                </div>
                <div class="content">
                  <font-awesome-icon icon="fa-solid fa-receipt" class="icon" style="margin-top: 2px;"/>
                  <span class="text">100,000</span>
                </div>
                <div class="content">
                  <font-awesome-icon icon="fa-solid fa-location-dot" class="icon" style="margin: 1px 5px 0 0"/>
                  <span class="text" style="cursor: pointer">제주도 어쩌구 저쩌구 123-4</span>
                </div>
                <div class="content">
                  <font-awesome-icon icon="fa-solid fa-phone" class="icon" style="margin-top: 2px"/>
                  <span class="text">02-123-5678</span>
                </div>
              </div>
            </div>
            <div class="todo">
              <div class="todo-title">흑돼지 조지기</div>
              <div class="content-container">
                <div class="content">
                  <font-awesome-icon icon="fa-regular fa-clock" class="icon" style="margin: 2px 5px 0 1px"/>
                  <span class="text">11:30</span>
                </div>
                <div class="content">
                  <font-awesome-icon icon="fa-solid fa-receipt" class="icon" style="margin-top: 2px;"/>
                  <span class="text">100,000</span>
                </div>
                <div class="content">
                  <font-awesome-icon icon="fa-solid fa-location-dot" class="icon" style="margin: 1px 5px 0 0"/>
                  <span class="text" style="cursor: pointer">제주도 어쩌구 저쩌구 123-4</span>
                </div>
                <div class="content">
                  <font-awesome-icon icon="fa-solid fa-phone" class="icon" style="margin-top: 2px"/>
                  <span class="text">02-123-5678</span>
                </div>
              </div>
            </div>
            <div class="todo">
              <div class="todo-title">흑돼지 조지기</div>
              <div class="content-container">
                <div class="content">
                  <font-awesome-icon icon="fa-regular fa-clock" class="icon" style="margin: 2px 5px 0 1px"/>
                  <span class="text">11:30</span>
                </div>
                <div class="content">
                  <font-awesome-icon icon="fa-solid fa-receipt" class="icon" style="margin-top: 2px;"/>
                  <span class="text">100,000</span>
                </div>
                <div class="content">
                  <font-awesome-icon icon="fa-solid fa-location-dot" class="icon" style="margin: 1px 5px 0 0"/>
                  <span class="text" style="cursor: pointer">제주도 어쩌구 저쩌구 123-4</span>
                </div>
                <div class="content">
                  <font-awesome-icon icon="fa-solid fa-phone" class="icon" style="margin-top: 2px"/>
                  <span class="text">02-123-5678</span>
                </div>
              </div>
            </div>
            <div class="todo-create">
              <div class="content-container" @click="openCreatePlanModal(1)">
                <font-awesome-icon icon="fa-regular fa-square-check" class="icon"/>
                <n-gradient-text :gradient="{ deg: 150, from: 'rgb(52,64,84)', to: 'rgb(152,162,179)' }" class="text">
                  일정 추가하기
                </n-gradient-text>
              </div>
            </div>
          </div>
        </div>
        <div class="budget-box">
          <div class="budget">
            <div class="text">200,000</div>
            <font-awesome-icon icon="fa-solid fa-won-sign" class="icon"/>
          </div>
        </div>
      </div>
      <div class="date-container">
        <div class="date-create">
          <div class="content-container" @click="openCreatePlanBoxModal">
            <font-awesome-icon icon="fa-regular fa-calendar-plus" class="icon"/>
            <n-gradient-text :gradient="{ deg: 150, from: 'rgb(52,64,84)', to: 'rgb(152,162,179)' }" class="text">
              여행 날짜 추가하기
            </n-gradient-text>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 여행 계획 수정 모달 -->
  <Modal :isOpen="modalStore.updateModalOpen[1]" :close="() => closeUpdateModal(1)">
    <template #header>
      여행 계획 수정하기
    </template>
    <template #content>
      <div class="modal-sub-title">여행 계획의 이름을 수정해주세요.</div>
      <div class="modal-text">최대 20자 까지 가능해요.</div>
      <input v-model="updateTitle.title" placeholder="대충 제목" type="text" class="modal-input"/>
      <div class="modal-error-text">제목은 최대 20자까지 가능합니다.</div>
      <div class="modal-sub-title" style="margin-top: 18px">여행 계획의 공개 여부를 정해주세요.</div>
      <div class="modal-text">비공개로 설정하면 나만볼 수 있어요.</div>
      <div class="modal-flex-row" style="margin: 10px 0 32px 0">
        <input v-model="updateTitle.isPrivate" type="checkbox" style="margin:0 8px 0 2px"/>
        <span class="modal-text">비공개로 설정하기</span>
      </div>
    </template>
    <template #footer>
      <button @click="handleUpdatePlanner(1)" class="modal-button">수정 하기</button>
    </template>
  </Modal>

  <!-- 여행 날짜 수정 모달 -->
  <Modal :isOpen="modalStore.updatePlanBoxModalOpen[1]" :close="() => closeUpdatePlanBoxModal(1)">
    <template #header>
      여행 날짜 수정하기
    </template>
    <template #content>
      <div class="modal-sub-title">변경할 날짜를 선택해주세요.</div>
      <DatePicker style="width: 100%; margin: 12px 0 18px 0"/>
    </template>
    <template #footer>
      <button @click="handleUpdatePlanner(1)" class="modal-button">생성 하기</button>
    </template>
  </Modal>

  <!-- 여행 날짜 추가 모달 -->
  <Modal :isOpen="modalStore.createModalOpen" :close="closeCreatePlanBoxModal">
    <template #header>
      여행 날짜 추가하기
    </template>
    <template #content>
      <div class="modal-sub-title">새로운 여행 날짜를 선택해주세요.</div>
      <DatePicker style="width: 100%; margin: 12px 0 18px 0"/>
    </template>
    <template #footer>
      <button @click="handleUpdatePlanner(1)" class="modal-button">생성 하기</button>
    </template>
  </Modal>

  <!-- 여행 일정 추가 모달 -->
  <Modal :isOpen="modalStore.createPlanModalOpen[1]" :close="() => closeCreatePlanModal(1)">
    <template #header>
      여행 일정 추가하기
    </template>
    <template #content>
      <div class="modal-sub-title" style="margin: 10px 0 2px 0">여행 일정의 이름을 적어주세요.</div>
      <input class="modal-input"/>
      <div class="modal-sub-title" style="margin: 8px 0 2px 0">일정 수행 시간을 선택해주세요.</div>
      <input type="time" class="modal-input"/>
      <div class="modal-sub-title" style="margin: 8px 0 2px 0">방문하는 곳의 주소를 적어주세요.</div>
      <input class="modal-input"/>
      <div class="modal-sub-title" style="margin: 10px 0 2px 0">MEMO</div>
      <textarea class="modal-input" style="height: 120px; resize: none"/>
      <div class="modal-sub-title" style="margin: 10px 0 8px 0">여행 계획의 공개 여부를 정해주세요.</div>
      <div class="modal-text" style="margin: 10px 0 8px 0">비공개로 설정하면 나만볼 수 있어요.</div>
      <div class="modal-flex-row" style="margin-bottom: 28px">
        <input type="checkbox" style="margin-right: 5px" />
        <span class="modal-text" style="margin-bottom: 4px">비공개로 설정하기</span>
      </div>
    </template>
    <template #footer>
      <button @click="handleUpdatePlanner(1)" class="modal-button">추가 하기</button>
    </template>
  </Modal>

  <!-- 플랜 상세 모달 -->
  <Modal :isOpen="modalStore.planDetailModalOpen[1]" :close="() => closePlanDetailModel(1)">
    <template #header>
      흑돼지 조지기
    </template>
    <template #content>
      대략적인 플랜 상세 내용 1
    </template>
    <template #footer>
      <div style="margin-top: 28px">
        <button @click="handleUpdatePlanner(1)" class="modal-button" style="margin-right: 10px">수정 하기</button>
        <button @click="handleUpdatePlanner(1)" class="modal-button">닫기</button>
      </div>
    </template>
  </Modal>

  <!-- 추후 삭제 -->
  <Modal :isOpen="modalStore.planDetailModalOpen[2]" :close="() => closePlanDetailModel(2)">
    <template #header>
      흑돼지 조지기
    </template>
    <template #content>
      대략적인 플랜 상세 내용 2
    </template>
    <template #footer>
      <div style="margin-top: 28px">
        <button @click="handleUpdatePlanner(1)" class="modal-button" style="margin-right: 10px">수정 하기</button>
        <button @click="handleUpdatePlanner(1)" class="modal-button">닫기</button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Modal from "../../components/Modal.vue";
import { useModalStore } from "../../store/modalStore.ts";
import { useMessage } from "naive-ui";
import DatePicker from "@/components/DatePicker.vue";

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

const updateTitle = ref({
  title: '',
  isPrivate: false
})

const openUpdateModal = (id: number) => {
  modalStore.openUpdateModal(id);
  closeAllUpdatePlannerModals();
};

const closeUpdateModal = (id: number) => {
  modalStore.closeUpdateModal(id);
}

const openUpdatePlanBoxModal = (planBoxId: number) => {
  modalStore.openUpdatePlanBoxModal(planBoxId);
};

const closeUpdatePlanBoxModal = (planBoxId: number) => {
  modalStore.closeUpdatePlanBoxModal(planBoxId);
}

const createPlanBox = ref({
  birthday: new Date()
});

const closeAllUpdatePlannerModals = () => {
  Object.keys(modalStore.updateModalOpen).forEach(plannerId => {
    modalStore.closeUpdatePlanBoxModal(parseInt(plannerId));
  });
};

const openCreatePlanBoxModal = () => {
  modalStore.openCreateModal();
};

const closeCreatePlanBoxModal = () => {
  modalStore.closeCreateModal();
};

const openCreatePlanModal = (planId: number) => {
  modalStore.openCreatePlanModal(planId);
};

const closeCreatePlanModal = (planId: number) => {
  modalStore.closeCreatePlanModal(planId);
};

const openPlanDetailModal = (planId: number) => {
  modalStore.openPlanDetailModal(planId);
  closeAllPlanDetailModals();
}

const closePlanDetailModel = (planId: number) => {
  modalStore.closePlanDetailModal(planId);
}

const closeAllPlanDetailModals = () => {
  Object.keys(modalStore.updateModalOpen).forEach(planId => {
    modalStore.closeUpdatePlanBoxModal(parseInt(planId));
  });
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
  @include size(100%, 100%);
  @include flex-column(flex-start, center);
}

.planner-detail-header {
  flex: 0 0 14%;
  //@include background($blue100);
  @include flex-row(space-between, center);
  @include size(90%, 100%);
}

.planner-detail-box {
  flex: 1;
  //@include background($red100);
  @include flex-row(flex-start, flex-start);
  @include size(90%, 100%);
  overflow-x: scroll;
}

.planner-detail-box::-webkit-scrollbar {
  display: none;
}

.title-container {
  display: flex;
  @include flex-column();
  @include size(90%, 100%);
}

.title {
  @include flex-row(flex-start, center);
  @include noto-sans-kr(900, 37px, $black);
  margin-top: 56px;

  .travel-date {
    @include flex-row(flex-start, center);
    @include size(auto, auto);
    margin: 18px 0 0 5px;

    .icon {
      @include noto-sans-kr(400, 16px, $gray500);
      margin: 0 8px 0 6px;
      color: $pink500;
    }

    span {
      @include noto-sans-kr(400, 17px, $gray500);
    }
  }
}

.menu-container {
  margin-left: 5px;
  .icon {
    @include noto-sans-kr(400, 19px, $gray500);
    margin:10px 12px 0 0;
    cursor: pointer;
  }
}

.date-container {
  @include size(370px, 100%);
  min-width: 370px;
  //background: blue;

  .date-box {
    @include size(94%, 10%);
    @include flex-row(center, center);

    .date {
      @include flex-row(center, center);
      @include size(100%, 90%);
      background: $blue600;
      border-radius: 10px;
    }

    .text {
      @include noto-sans-kr(600, 28px, $gray25);
    }

    .icon {
      @include noto-sans-kr(300, 16px, $gray25);
      margin: 13px 0 6px 12px;
      cursor: pointer;
    }
  }

  .todo-list {
    @include size(94%, 80%);
    //background: blue;
    padding-top: 10px;

    .todo-container::-webkit-scrollbar {
      display: none;
    }

    .todo-container {
      @include size(100%, 98%);
      //background: orange;
      overflow-y: scroll;

      .todo {
        @include size(100%, auto);
        @include flex-column(flex-start, flex-start);
        //min-height: 150px;
        border-radius: 10px;
        padding: 25px;
        background: $gray25;
        margin-bottom: 15px;
        cursor: pointer;

        .todo-title {
          @include noto-sans-kr(900, 21px, $black);
        }

        .content-container {
          @include flex-column();
          margin: 12px 0 0 3px;

          .content {
            @include flex-row();
            margin-bottom: 3px;

            .icon {
              @include noto-sans-kr(500, 14px, $black);
              color: $gray500;
              margin-right: 5px;
              width: 15px;
            }

            .text {
              @include noto-sans-kr(400, 15px, $black);
              margin-bottom: 6px;
            }
          }
        }
      }

      .todo-create {
        @include size(100%, auto);
        @include flex-column(flex-start, flex-start);
        //min-height: 150px;
        border-radius: 10px;
        padding: 25px;
        background-color: $gray25;
        opacity : 0.7;
        border: 1px dashed $gray600;
        margin-bottom: 15px;
        cursor: pointer;

        .content-container {
          @include flex-row(center, center);
          @include size(100%, 100%);

          .icon {
            @include noto-sans-kr(500, 16px, $black);
            color: $gray500;
            margin: 2px 7px 0 0;
            width: 15px;
          }

          .text {
            font-family: "Noto Sans KR", sans-serif;
            font-size: 18px;
          }
        }
      }
    }
    }

  .budget-box {
    @include size(94%, 10%);
    @include flex-row(center, flex-start);

    .budget {
      @include flex-row(center, center);
      @include size(100%, 90%);
      background: $blue600;
      border-radius: 10px;
    }

    .text {
      @include noto-sans-kr(600, 30px, $gray25);
    }

    .icon {
      @include noto-sans-kr(300, 20px, $gray25);
      margin: 10px 0 2px 8px;
      cursor: pointer;
    }
  }

  .date-create {
    @include size(94%, 9%);
    @include flex-column(flex-start, flex-start);
    //min-height: 150px;
    border-radius: 10px;
    padding: 25px;
    background-color: $gray25;
    opacity : 0.7;
    border: 1px dashed $gray600;
    margin: 4px 0 4px 0;

    .content-container {
      @include flex-row(center, center);
      @include size(100%, 100%);
      cursor: pointer;

      .icon {
        @include noto-sans-kr(500, 16px, $black);
        color: $gray500;
        margin: 2px 7px 0 0;
        width: 15px;
      }

      .text {
        font-family: "Noto Sans KR", sans-serif;
        font-size: 18px;
      }
    }
  }
}
</style>