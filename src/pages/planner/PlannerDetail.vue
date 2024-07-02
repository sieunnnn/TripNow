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
          <font-awesome-icon icon="fa-regular fa-pen-to-square" class="icon"/>
          <n-gradient-text :gradient="{ deg: 150, from: 'rgb(29,41,57)', to: 'rgb(152,162,179)' }" class="text" @click="openUpdateModal(1)">
            계획 변경하기
          </n-gradient-text>
          <font-awesome-icon icon="fa-solid fa-user-plus" class="icon" style="font-size: 14px"/>
          <n-gradient-text :gradient="{ deg: 150, from: 'rgb(29,41,57)', to: 'rgb(152,162,179)' }" class="text" @click="openMemberModal(1)">
            여행 친구 초대
          </n-gradient-text>
          <font-awesome-icon icon="fa-solid fa-user-pen" class="icon" style="font-size: 14px"/>
          <n-gradient-text :gradient="{ deg: 150, from: 'rgb(29,41,57)', to: 'rgb(152,162,179)' }" class="text" @click="openMemberManageModel(2)">
            여행 친구 관리
          </n-gradient-text>
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
                  <n-tooltip trigger="hover" placement="right-start" style="padding: 25px 20px; border-radius: 8px">
                    <template #trigger>
                      <span class="text" style="cursor: pointer">제주도 어쩌구 저쩌구 123-4</span>
                    </template>
                    <div class="tooltip-text">📍 제주도 어쩌구 저쩌구 123-4</div>
                    <img src="../../../public/map_example.png" style="width: 200px">
                  </n-tooltip>
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
          <div class="content-container" @click="openCreatePlanBoxModal(2)">
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
      <div class="modal-flex-row" style="margin: 10px 0 26px 0">
        <input v-model="updateTitle.isPrivate" type="checkbox" style="margin:0 8px 0 2px"/>
        <span class="modal-text">비공개로 설정하기</span>
      </div>
    </template>
    <template #footer>
      <button @click="handleUpdatePlanner(1)" class="modal-button">수정 하기</button>
    </template>
  </Modal>

  <!-- 여행 멤버 추가 모달 -->
  <Modal :isOpen="modalStore.createModalOpen[1]" :close="() => closeMemberModal(1)">
    <template #header>
      여행 친구 초대
    </template>
    <template #content>
      <div class="modal-sub-title">여행 친구를 초대해보세요.</div>
      <div class="modal-text">친구 초대는 최대 6명 까지 가능해요.</div>
      <input placeholder="친구의 이메일을 입력 후 엔터를 눌러주세요." type="text" class="modal-input" style="margin-bottom: 16px"/>
      <div class="search-container">
        <div class="search-container">
          <div class="search-content">
            <div style="display: flex; flex-direction: row; align-items: center">
              <n-avatar
                  round
                  size="small"
                  src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
              />
              <div class="search-text">김시은 (#1234)</div>
            </div>
            <button class="add-button">추가 하기</button>
          </div>
          <hr style="width: 100%; margin: 12px 0">
        </div>
      </div>
    </template>
  </Modal>

  <!-- 여행 멤버 수정 모달 -->
  <Modal :isOpen="modalStore.updateModalOpen[2]" :close="() => closeMemberManageModel(2)">
    <template #header>
      여행 친구 관리
    </template>
    <template #content>
      <div class="modal-sub-title">여행 친구 목록</div>
      <div class="modal-text" style="margin-bottom: 25px">⚠️ 친구를 한번 내보내면 되돌릴 수 없어요.</div>
      <div class="search-container">
        <div class="search-container">
          <div class="search-content">
            <div style="display: flex; flex-direction: row; align-items: center">
              <n-avatar
                  round
                  size="small"
                  src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
              />
              <div class="search-text">김시은 (#1234)</div>
            </div>
            <button class="delete-button">내보내기</button>
          </div>
          <hr style="width: 100%; margin: 12px 0">
        </div>
      </div>
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
  <Modal :isOpen="modalStore.createModalOpen[2]" :close="() => closeCreatePlanBoxModal(2)">
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
import { useModalStore } from "../../store/modalStore.ts";
import { useMessage } from "naive-ui";
import Modal from "../../components/Modal.vue";
import DatePicker from "../../components/DatePicker.vue";

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

const openMemberModal = (id: number) => {
  modalStore.openCreateModal(id);
}

const closeMemberModal = (id: number) => {
  modalStore.closeCreateModal(id);
}

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

const openCreatePlanBoxModal = (id: number) => {
  modalStore.openCreateModal(id);
};

const closeCreatePlanBoxModal = (id: number) => {
  modalStore.closeCreateModal(id);
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

const openMemberManageModel = (id: number) => {
  modalStore.openUpdateModal(id);
}

const closeMemberManageModel = (id: number) => {
  modalStore.closeUpdateModal(id);
}

const closeAllCreatModals = () => {
  Object.keys(modalStore.updateModalOpen).forEach(id => {
    modalStore.closeUpdatePlanBoxModal(parseInt(id));
  });
}

const closeAllUpdatePlannerModals = () => {
  Object.keys(modalStore.updateModalOpen).forEach(plannerId => {
    modalStore.closeUpdatePlanBoxModal(parseInt(plannerId));
  });
};

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
  margin-top: 58px;

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
      @include noto-sans-kr(400, 17px, $gray600);
    }
  }
}

.menu-container {
  margin: 12px 0 0 5px;

  .icon {
    @include noto-sans-kr(400, 15px, $gray500);
    font-family: "Noto Sans KR", sans-serif;
    margin-right: 6px;
    cursor: pointer;
  }

  .text {
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 400;
    font-size: 16px;
    cursor: pointer;
    margin-right: 12px;
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

.tooltip-text {
  @include noto-sans-kr(400, 16px, $gray25);
  margin-bottom: 10px;
}

.search-container {
  @include flex-column();

  .search-content {
    @include flex-row(space-between, center);

    .search-text {
      @include noto-sans-kr(500, 16px, $black);
      margin-left: 10px;
    }
  }

  .add-button {
    @include custom-button($blue600);
    padding: 6px 10px;
    @include noto-sans-kr(400, 14px, $gray25);
  }

  .delete-button {
    @include custom-button($red600);
    padding: 6px 10px;
    @include noto-sans-kr(400, 14px, $gray25);
  }
}
</style>