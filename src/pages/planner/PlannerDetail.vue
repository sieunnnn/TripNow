<template>
  <div class="planner-detail-container">
    <div class="planner-detail-header">
      <div class="title-container">
        <div class="tag-container">
          <n-tag v-if="groupMemberResponse.length === 1" size="small" round :bordered="false" style="margin: 2px 10px 0 0">
            <font-awesome-icon icon="fa-solid fa-user" style="margin: 0 2px 0 2px"/>
            1인 여행
          </n-tag>
          <n-tag v-else size="small" round :bordered="false" type="info" style="margin: 2px 10px 0 0">
            <font-awesome-icon icon="fa-solid fa-user" style="margin: 0 2px 0 2px"/>
            그룹 여행
          </n-tag>
          <n-tag v-if="!plannerDetail?.isPrivate" size="small" round :bordered="false" type="success" style="margin: 2px 10px 0 0">
            <font-awesome-icon icon="fa-regular fa-eye" style="margin: 0 2px 0 2px" />
            공개중
          </n-tag>
          <n-tag v-else size="small" round :bordered="false" style="margin: 2px 10px 0 0">
            <font-awesome-icon icon="fa-regular fa-eye-slash" style="margin: 0 2px 0 2px" />
            비공개
          </n-tag>
        </div>
        <div class="title">
          {{ plannerDetail?.title }}
          <div class="travel-date" v-if="plannerDetail?.startDate">
            <font-awesome-icon icon="fa-regular fa-calendar" class="icon" />
            <span style="margin-right: 5px">{{ plannerDetail?.startDate }}</span>
            <span style="margin-right: 5px">~</span>
            <span style="margin-right: 5px">{{ plannerDetail?.endDate }}</span>
          </div>
        </div>
        <div class="menu-container">
          <font-awesome-icon icon="fa-regular fa-pen-to-square" class="icon"/>
          <n-gradient-text :gradient="{ deg: 150, from: 'rgb(29,41,57)', to: 'rgb(71,84,103)' }" class="text" @click="openUpdateModal(1)">
            계획 변경
          </n-gradient-text>
          <font-awesome-icon icon="fa-solid fa-user-plus" class="icon" style="font-size: 14px; margin-bottom: 1px"/>
          <n-gradient-text :gradient="{ deg: 150, from: 'rgb(29,41,57)', to: 'rgb(71,84,103)' }" class="text" @click="openMemberModal(1)">
            여행 친구 초대
          </n-gradient-text>
          <font-awesome-icon icon="fa-solid fa-user-pen" class="icon" style="font-size: 14px; margin-bottom: 1px"/>
          <n-gradient-text :gradient="{ deg: 150, from: 'rgb(29,41,57)', to: 'rgb(71,84,103)' }" class="text" @click="openMemberManageModel(2); handleGetGroupMember(index)">
            여행 친구 관리
          </n-gradient-text>
          <font-awesome-icon v-if="groupMemberResponse.length === 1" icon="fa-solid fa-comment-dots" class="icon" />
          <n-gradient-text v-if="groupMemberResponse.length === 1" :gradient="{ deg: 150, from: 'rgb(29,41,57)', to: 'rgb(71,84,103)' }" class="text" @click="openChatting(true)">
            대화 하기
          </n-gradient-text>
          <n-drawer v-model:show="chattingStatus" :width="480" style="padding-left: 12px">
            <n-drawer-content :native-scrollbar="false" :width="996">
              <div class="chatting-container">
<!--                <div class="chatting-title">{{ plannerDetail?.title }} 대화방</div>-->
                <div class="chatting-member-container">
                  <n-avatar-group :options="processedProfileImages()" :size="48" :max="7" style="margin-top: 2px">
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
<!--                <hr style="width: 100%; margin: 12px 0">-->
                <div class="message-container">
                  <div v-for="(msg, index) in messages" :key="index" class="message">
                    <div v-if="msg.userId === userStore.userInfo?.userId" class="send-user">
                      <div class="user-container">
                        <div>
                          <span class="message-nickname">{{ msg.nickname }}</span>
                          <span class="message-tag">#{{ msg.userTag }}</span>
                        </div>
                        <div class="message-bubble">
                          {{ msg.message }}
                        </div>
                      </div>
                    </div>
                    <div v-else class="receive-user">
                      <n-avatar round
                                size="medium"
                                :src="profileImageUrl"/>
                      <div class="receive-container">
                        <div class="user-container">
                          <span class="message-nickname">{{ msg.nickname }}</span>
                          <span class="message-tag">#{{ msg.userTag }}</span>
                        </div>
                        <div class="message-bubble">
                          {{ msg.message }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="input-container">
                  <input type="text" v-model="chatValue.message" placeholder="대화 내용을 입력해주세요." />
                  <button @click="handleMessage" type="button">전송하기</button>
                </div>
              </div>
            </n-drawer-content>
          </n-drawer>
        </div>
      </div>
      <div style="margin-top: 46px">
        <n-avatar-group :options="processedProfileImages()" :size="65" :max="7">
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
    <div class="planner-detail-box">
      <div class="planner-date-box">
        <div v-for="(detail, index) in plannerDetails" :key="index" class="date-container">
          <div class="date-box">
            <div class="date">
              <div class="text">{{ detail.planDate }}</div>
              <n-dropdown
                  :options="dateOptions"
                  size="large"
                  @select="(key: any) => handleDateSelect(key, detail.planBoxId)"
                  placement="bottom-end"
              >
                <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" class="icon" />
              </n-dropdown>
            </div>

            <!-- 여행 날짜 수정 모달 -->
            <Modal :isOpen="modalStore.updatePlanBoxModalOpen[detail.planBoxId]" :close="() => closeUpdatePlanBoxModal(detail.planBoxId)">
              <template #header>
                여행 날짜 수정하기
              </template>
              <template #content>
                <div class="modal-sub-title">변경할 날짜를 선택해주세요.</div>
                <input v-model="planBox.updateDate" type="date" class="modal-input" style="width: 100%; margin: 12px 0 28px 0"/>
              </template>
              <template #footer>
                <button @click="handleUpdatePlanBox(detail.planBoxId)" class="modal-button">수정 하기</button>
              </template>
            </Modal>

            <!-- 여행 날짜 삭제 모달 -->
            <Modal :isOpen="modalStore.deletePlanBoxModelOpen[detail.planBoxId]" :close="() => closeDeletePlanBoxModal(detail.planBoxId)">
              <template #header>
                여행 날짜 삭제하기
              </template>
              <template #content>
                <div class="modal-text">한번 날짜를 삭제하면 되돌릴 수 없어요. </div>
                <div class="modal-text">삭제 하려면 아래 버튼을 눌러주세요.</div>
              </template>
              <template #footer>
                <button @click="handleDeletePlanBox(detail.planBoxId)" class="modal-warning-button" style="margin-top: 28px;">삭제 하기</button>
              </template>
            </Modal>
          </div>
          <div class="todo-list">
            <div class="todo-container">
              <div class="todo"  v-for="plan in detail.planResponses" :key="plan.planId">
                <div class="todo-title">
                  <div>{{ plan.title }}</div>
                  <n-dropdown
                      :options="dateOptions"
                      size="large"
                      @select="(key: any) => handlePlanSelect(key, detail.planBoxId, plan.planId)"
                      placement="bottom-end"
                  >
                    <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" class="icon" />
                  </n-dropdown>

                  <!-- 여행 일정 수정 모달 -->
                  <Modal :isOpen="modalStore.updatePlanModalOpen[plan.planId]" :close="() => closeUpdatePlanModal(plan.planId)">
                    <template #header>
                      여행 일정 수정하기
                    </template>
                    <template #content>
                      <div class="modal-sub-title" style="margin: 10px 0 2px 0">여행 일정의 이름을 적어주세요.</div>
                      <input v-model="updatedPlan.title" class="modal-input" :placeholder="plan.title"/>
                      <div class="modal-sub-title" style="margin: 8px 0 2px 0">일정 수행 시간을 선택해주세요.</div>
                      <input v-model="updatedPlan.time" type="time" class="modal-input" :placeholder="plan.time"/>
                      <div class="modal-sub-title" style="margin: 8px 0 2px 0">방문하는 곳의 주소를 입력해주세요.</div>
                      <SearchAddress @updateAddress="handleUpdatePlanAddress"/>
                      <div ref="mapContainer" class="map-container"></div>
                      <div class="modal-sub-title" style="margin: 10px 0 2px 0">MEMO</div>
                      <textarea v-model="updatedPlan.memo" class="modal-input" style="height: 120px; resize: none" :placeholder="plan.memo"/>
                      <div class="modal-sub-title" style="margin: 10px 0 8px 0">여행 계획의 공개 여부를 정해주세요.</div>
                      <div class="modal-text" style="margin: 10px 0 8px 0">비공개로 설정하면 나만 볼 수 있어요.</div>
                      <div class="modal-flex-row" style="margin-bottom: 28px">
                        <input v-model="updatedPlan.isPrivate" type="checkbox" style="margin-right: 5px"/>
                        <span class="modal-text" style="margin-bottom: 4px">비공개로 설정하기</span>
                      </div>
                    </template>
                    <template #footer>
                      <button @click="handleUpdatePlan(detail.planBoxId, plan.planId)" class="modal-button">수정 하기</button>
                    </template>
                  </Modal>

                  <!-- 여행 일정 삭제 모달 -->
                  <Modal :isOpen="modalStore.deletePlanModalOpen[plan.planId]" :close="() => closeDeletePlanModal(plan.planId)">
                    <template #header>
                      여행 일정 삭제하기
                    </template>
                    <template #content>
                      <div class="modal-text">한번 일정을 삭제하면 되돌릴 수 없어요. </div>
                      <div class="modal-text">삭제 하려면 아래 버튼을 눌러주세요.</div>
                    </template>
                    <template #footer>
                      <button @click="handleDeletePlan(detail.planBoxId, plan.planId)" class="modal-warning-button" style="margin-top: 28px;">삭제 하기</button>
                    </template>
                  </Modal>
                </div>
                <div class="content-container">
                  <div class="content">
                    <font-awesome-icon icon="fa-regular fa-clock" class="icon" style="margin: 2px 5px 0 1px"/>
                    <span class="text">{{ plan.time }}</span>
                  </div>
                  <div class="content">
                    <font-awesome-icon icon="fa-solid fa-receipt" class="icon" style="margin-top: 2px;"/>
                    <span class="text">100,000</span>
                  </div>
                  <div class="content">
                    <font-awesome-icon icon="fa-solid fa-phone" class="icon" style="margin-top: 2px"/>
                    <span class="text">02-123-5678</span>
                  </div>
                  <div class="content" style="flex-direction: column">
                    <div class="content">
                      <font-awesome-icon icon="fa-solid fa-location-dot" class="icon" style="margin: 1px 5px 0 0"/>
                      <span class="text">{{ plan.address }}</span>
                    </div>
                    <DrawMap :address="plan.address"/>
                  </div>
                  <div class="content">
                    <span class="text">{{ plan.content }}</span>
                  </div>
                </div>
              </div>
              <div class="todo-create">
                <div class="content-container" @click="openCreatePlanModal(detail.planBoxId)">
                  <font-awesome-icon icon="fa-regular fa-square-check" class="icon"/>
                  <n-gradient-text :gradient="{ deg: 150, from: 'rgb(52,64,84)', to: 'rgb(152,162,179)' }" class="text">
                    일정 추가하기
                  </n-gradient-text>
                </div>
              </div>

              <!-- 여행 일정 추가 모달 -->
              <Modal :isOpen="modalStore.createPlanModalOpen[detail.planBoxId]" :close="() => closeCreatePlanModal(detail.planBoxId)">
                <template #header>
                  여행 일정 추가하기
                </template>
                <template #content>
                  <div class="modal-sub-title" style="margin: 10px 0 2px 0">여행 일정의 이름을 적어주세요.</div>
                  <input v-model="plan.title" class="modal-input"/>
                  <div class="modal-sub-title" style="margin: 8px 0 2px 0">일정 수행 시간을 선택해주세요.</div>
                  <input v-model="plan.time" type="time" class="modal-input"/>
                  <div class="modal-sub-title" style="margin: 8px 0 2px 0">방문하는 곳의 주소를 입력해주세요.</div>
                  <SearchAddress  @updateAddress="handleCreatePlanAddress"/>
                  <div ref="mapContainer" class="map-container"></div>
                  <div class="modal-sub-title" style="margin: 10px 0 2px 0">MEMO</div>
                  <textarea v-model="plan.memo" class="modal-input" style="height: 120px; resize: none"/>
                  <div class="modal-sub-title" style="margin: 10px 0 8px 0">여행 계획의 공개 여부를 정해주세요.</div>
                  <div class="modal-text" style="margin: 10px 0 8px 0">비공개로 설정하면 나만볼 수 있어요.</div>
                  <div class="modal-flex-row" style="margin-bottom: 28px">
                    <input v-model="plan.isPrivate" type="checkbox" style="margin-right: 5px" />
                    <span class="modal-text" style="margin-bottom: 4px">비공개로 설정하기</span>
                  </div>
                </template>
                <template #footer>
                  <button @click="handleCreatePlan(detail.planBoxId)" class="modal-button">추가 하기</button>
                </template>
              </Modal>
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

        <!-- 여행 날짜 추가 모달 -->
        <Modal :isOpen="modalStore.createModalOpen[2]" :close="() => closeCreatePlanBoxModal(2)">
          <template #header>
            여행 날짜 추가하기
          </template>
          <template #content>
            <div class="modal-sub-title">새로운 여행 날짜를 선택해주세요.</div>
            <input type="date" class="modal-input" v-model="planBox.date" style="width: 100%; margin: 12px 0 18px 0"/>
          </template>
          <template #footer>
            <button @click="handleCreatePlanBox()" class="modal-button">생성 하기</button>
          </template>
        </Modal>
      </div>
    </div>
<!--      <div class="chattingButton">-->
<!--        <font-awesome-icon icon="fa-solid fa-comments" class="icon"/>-->
<!--      </div>-->
  </div>

  <!-- 여행 계획 수정 모달 -->
  <Modal :isOpen="modalStore.updateModalOpen[1]" :close="() => closeUpdateModal(1)">
    <template #header>
      여행 계획 수정하기
    </template>
    <template #content>
      <div class="modal-sub-title">여행 계획의 이름을 수정해주세요.</div>
      <div class="modal-text">최대 20자 까지 가능해요.</div>
      <input v-model="updateTitle.title" :placeholder="plannerDetail?.title" type="text" :class="{'modal-input': true, 'modal-error-input': !isTitleValid(updateTitle.title)}"/>
      <div v-if="!isTitleValid(updateTitle.title)" class="modal-error-text">제목은 최대 20자까지 가능합니다.</div>
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
      <input
          v-model="searchInput"
          @input="handleUserSearch"
          @keyup.enter="handleUserSearch"
          placeholder="친구의 이메일을 입력 후 엔터를 눌러주세요."
          type="email"
          class="modal-input"
          style="margin-bottom: 16px"/>
      <div class="search-container">
        <div v-for="user in userSearchResponse" :key="user.userId" class="search-container">
          <div class="search-content">
            <div style="display: flex; flex-direction: row; align-items: center">
              <n-avatar
                  round
                  size="small"
                  :src="user.profileImageUrl || '../../../public/default.png'"
              />
              <div class="search-nickname">{{ user.nickname }}</div>
              <div class="search-userTag">#{{ user.userTag }}</div>
            </div>
            <button class="add-button" @click="handleAddMember(user.userId, plannerDetail.plannerId)">추가 하기</button>
          </div>
          <hr v-if="index < userSearchResponse.length - 1" style="width: 100%; margin: 12px 0">
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
          <div v-for="member in groupMemberResponse" :key="member.groupMemberId" class="search-content">
            <div style="display: flex; flex-direction: row; align-items: center">
              <n-avatar
                  round
                  size="small"
                  :src="member.profileImageUrl || '../../../public/default.png'"
              />
              <div class="search-nickname">{{ member.nickname }}</div>
              <div class="search-userTag">#{{ member.userTag }}</div>
            </div>
            <button v-if="!member.isHost" class="delete-button" @click="handleDeleteMember(member.groupMemberId, plannerDetail.plannerId)">내보내기</button>
          </div>
          <hr v-if="index < groupMemberResponse.length - 1" style="width: 100%; margin: 12px 0">
        </div>
      </div>
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
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import { useModalStore } from "../../store/modalStore.ts";
import { useMessage } from "naive-ui";
import { useRoute } from "vue-router";
import { getPlannerDetail } from "../../api/PlannerApi.ts";
import { searchUsers } from "../../api/SearchApi.ts";
import { userSearchResponse } from "../../dto/SearchDto.ts";
import { groupMemberAddRequest, groupMemberResponse } from "../../dto/GroupMemberDto.ts";
import { addGroupMembers, deleteGroupMember, getGroupMembers } from "../../api/GroupMemberApi.ts";
import { Client } from "@stomp/stompjs";
import SockJS from 'sockjs-client';
import { useUserStore } from "../../store/userStore.ts";
import Modal from "../../components/Modal.vue";
import axios from "axios";
import {
  createPlan,
  createPlanBox, deletePlan,
  deletePlanBox,
  sendMessage,
  setClient, updatePlan,
  updatePlanBox
} from "../../api/websocket/WebsocketPublish.ts";
import { chatDto } from "../../dto/ChattingDto.ts";
import {
  planBoxCreateRequest,
  planBoxUpdateRequest,
  planCreateRequest
} from "../../dto/PlannerDto.ts";
import SearchAddress from "@/components/SearchAddress.vue";
import DrawMap from "@/components/DrawMap.vue";

const message = useMessage();
const userStore = useUserStore();
const route = useRoute();
const chattingStatus = ref(false);

// 채팅방
const openChatting = (status: boolean) => {
  chattingStatus.value = status;
}

// 프로필 이미지
const profileImageUrl = computed(() => {
  const defaultImage = '../../public/default.png';
  return userStore.userInfo?.profileImgUrl === 'Default' ? defaultImage : userStore.userInfo?.profileImgUrl;
});

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

const openCreatePlanBoxModal = (id: number) => {
  modalStore.openCreateModal(id);
};

const closeCreatePlanBoxModal = (id: number) => {
  modalStore.closeCreateModal(id);
};

const openUpdatePlanBoxModal = (planBoxId: number) => {
  modalStore.openUpdatePlanBoxModal(planBoxId);
};

const closeUpdatePlanBoxModal = (planBoxId: number) => {
  modalStore.closeUpdatePlanBoxModal(planBoxId);
};

const openDeletePlanBoxModal = (planBoxId: number) => {
  modalStore.openDeletePlanBoxModal(planBoxId);
};

const closeDeletePlanBoxModal = (planBoxId: number) => {
  modalStore.closeDeletePlanBoxModal(planBoxId);
}

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

const openUpdatePlanModal = (planBoxId, planId) => {
  const selectedPlan = plannerDetails.value
      .find(detail => detail.planBoxId === planBoxId)
      .planResponses.find(plan => plan.planId === planId);

  updatedPlan.value = { ...selectedPlan };
  modalStore.openPlanUpdateModal(planId);
};

const closeUpdatePlanModal = (planId) => {
  modalStore.closePlanUpdateModal(planId);
  updatedPlan.value = {
    isPrivate: false,
    title: '',
    time: '',
    address: '',
    memo: ''
  };
};

const openDeletePlanModal = (planId: number) => {
  modalStore.openPlanDeleteModal(planId);
}

const closeDeletePlanModal = (planId: number) => {
  modalStore.closePlanDeleteModal(planId);
}

const openMemberManageModel = (id: number) => {
  modalStore.openUpdateModal(id);
}

const closeMemberManageModel = (id: number) => {
  modalStore.closeUpdateModal(id);
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


// validate
const isTitleValid = (title: string) => {
  return title.length <= 20;
};


// api
const plannerDetail = ref(null);
const index = ref<number | null>(null);
const plannerId = ref();

const fetchPlannerData = async (plannerId: number) => {
  try {
    const plannerData = await getPlannerDetail(plannerId);
    plannerDetail.value = plannerData;
    plannerDetails.value = plannerData.planBoxResponses || [];

    const groupMemberData = await getGroupMembers(plannerId);
    groupMemberResponse.value = groupMemberData;
  } catch (error) {
    console.error('Error fetching planner data:', error);
  }
};

const searchInput = ref('');
const userSearchResponse = ref<Array<userSearchResponse>>([]);

const handleUserSearch = async () => {
  const input = searchInput.value.trim();
  if (input !== '') {
    const userSearchData = await searchUsers(input);
    userSearchResponse.value = userSearchData;
  }
};

const groupMemberResponse = ref<Array<groupMemberResponse>>([]);

const handleAddMember = async (userId: number, plannerId: number) => {
  const data: groupMemberAddRequest = {
    userId: userId
  }
  const groupMemberData = await addGroupMembers(data, plannerId);
  groupMemberResponse.value = groupMemberData;
}

const handleGetGroupMember = async (plannerId: number) => {
  const groupMemberData = await getGroupMembers(plannerId);
  groupMemberResponse.value = groupMemberData;
  console.log(groupMemberResponse.value);
}

const handleDeleteMember = async (plannerId: number, groupMemberId: number) => {
  const groupMemberData = await deleteGroupMember(plannerId, groupMemberId);
  groupMemberResponse.value = groupMemberData;
}

const defaultImage = '../../public/default.png';

const processedProfileImages = () => {
  if (!groupMemberResponse.value || !Array.isArray(groupMemberResponse.value)) {
    return [];
  }
  return groupMemberResponse.value.map(member => {
    return { src: member.profileImageUrl ? member.profileImageUrl : defaultImage };
  });
};

const createDropdownOptions = (restOptions) => {
  return restOptions.map(option => {
    return { label: option.src, value: option.src };
  });
};

// 드롭다운
const dateOptions = [
  {
    label: '수정하기',
    key: 'edit',
  },
  {
    label: '삭제하기',
    key: 'delete',
  },
];

const handleDateSelect = (key: string | number, planBoxId:number) => {
  if (key === 'edit') {
    openUpdatePlanBoxModal(planBoxId);
  } else if (key === 'delete') {
    openDeletePlanBoxModal(planBoxId);
  }
};

// 웹소켓 연결
const connected = ref(false);
const client = ref<Client | null>(null);
const accessToken = localStorage.getItem("Authorization");
const connectionUrl = "http://localhost:8080/ws?token=" + accessToken;

const connect = async() => {
  try {
    const response = await axios.get(connectionUrl);
    if (response.status === 200) {
      client.value = new Client({
        webSocketFactory: () => {
          const socket = new SockJS(connectionUrl);
          socket.onclose = (event) => {
            console.log("socket closed", event);
          };
          return socket;
        },
        debug: (str) => {
          console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      client.value.onConnect = () => {
        connected.value = true;
        console.log("connected success");
        subscribe(`/sub/planner/${plannerId.value}`);
        setClient(client.value);
      }

      client.value.onDisconnect = () => {
        connected.value = false;
        console.log("socket closed");
      }

      client.value.onStompError = (frame) => {
        console.error(frame.headers['message']);
        console.error(frame.body);
      };

      client.value.activate();
    }
  } catch (e) {
    console.log(e);
    return;
  }
}

// 구독
const subscribe = (destination) => {
  if (client.value) {
    client.value.subscribe(destination, (message) => {
      console.log("message:", message.body);
      const parsedMessage = JSON.parse(message.body);

      if (parsedMessage.type === "chat") {
        handleReceivedMessage(parsedMessage.message);
      } else if (
          parsedMessage.type === "create-planBox" ||
          parsedMessage.type === "update-planBox" ||
          parsedMessage.type === "delete-planBox" ||
          parsedMessage.type === "create-plan" ||
          parsedMessage.type === "update-plan" ||
          parsedMessage.type === "delete-plan"
      ) {
        handlePlannerDetailResponse(parsedMessage.message);
      }
    });
  } else {
    console.log("Client is not connected");
  }
};

// 메세지 보내기
const chatValue = ref({
  message: ''
})

const handleMessage = async () => {
  const data: chatDto = {
    userId: userStore.userInfo?.userId,
    userTag: userStore.userInfo?.userTag,
    nickname: userStore.userInfo?.nickname,
    profileImageUrl: userStore.userInfo?.profileImgUrl,
    message: chatValue.value.message
  }

  sendMessage(plannerId.value, data);
  chatValue.value.message = '';
}
// 수신한 메시지 처리
const messages = ref<Array<any>>([]);

const handleReceivedMessage = (message: any) => {
  messages.value.push(message);
  console.log("Processing message:", message);
};

// 플랜박스 생성하기
const planBox = ref({
  date: new Date(),
  updateDate: new Date()
});

const handleCreatePlanBox = async () => {
  const data: planBoxCreateRequest = {
    planDate: planBox.value.date
  };

  createPlanBox(plannerId.value, data);
  closeCreatePlanBoxModal(2);
};

const handleUpdatePlanBox = async (planBoxId: number) => {
  const data: planBoxUpdateRequest = {
    planDate: planBox.value.updateDate
  };

  updatePlanBox(plannerId.value, planBoxId, data);
  closeUpdatePlanBoxModal(planBoxId);
};

const handleDeletePlanBox = async (planBoxId: number) => {
  deletePlanBox(plannerId.value, planBoxId);
  closeDeletePlanBoxModal(planBoxId);
}

const plan = ref({
  isPrivate: false,
  title: '',
  time: '',
  address: '',
  memo: ''
});

const handleCreatePlanAddress = (address) => {
  plan.value.address = address;
  console.log(address);
};

const handleCreatePlan = async (planBoxId) => {
  const data = {
    isPrivate: plan.value.isPrivate,
    title: plan.value.title,
    time: plan.value.time,
    content: plan.value.memo,
    address: plan.value.address
  }

  createPlan(plannerId.value, planBoxId, data);
  closeCreatePlanModal(planBoxId);
}

const handlePlanSelect = (key: string | number, planBoxId: number, planId: number) => {
  if (key === 'edit') {
    openUpdatePlanModal(planBoxId, planId);
  } else if (key === 'delete') {
    openDeletePlanModal(planId);
  }
};

const updatedPlan = ref({
  isPrivate: false,
  title: '',
  time: '',
  address: '',
  memo: ''
});

const handleUpdatePlanAddress = (address) => {
  updatedPlan.value.address = address;
  console.log('Address updated to:', address);
};

const handleUpdatePlan = async (planBoxId: number, planId: number) => {
  const data = {
    isPrivate: updatedPlan.value.isPrivate,
    title: updatedPlan.value.title,
    time: updatedPlan.value.time,
    content: updatedPlan.value.memo,
    address: updatedPlan.value.address
  }
  updatePlan(plannerId.value, planBoxId, planId, data);
  closeUpdatePlanModal(planId);
}

const handleDeletePlan = async (planBoxId: number, planId: number) => {
  deletePlan(plannerId.value, planBoxId, planId);
  closeDeletePlanModal(planId);
}

const plannerDetails = ref<Array<any>>([]);

const handlePlannerDetailResponse = (newPlannerDetails) => {
  plannerDetails.value = newPlannerDetails;
  console.log("Updated planner details: ", plannerDetails.value);
};


onMounted(async () => {
  try {
    await userStore.fetchUserInfo();
    await connect();

    if (userStore.isUserLoggedIn) {
      plannerId.value = route.params.plannerId;
      index.value = plannerId;
      await fetchPlannerData(plannerId.value);
    }

  } catch (error) {
    console.error(error);
  }
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
@import "../../assets/styles/message.scss";

.planner-detail-container {
  @include background($gray200);
  @include size(100%, 100%);
  @include flex-column(center, center);
  overflow-x: hidden;
}

.planner-detail-header {
  flex: 0 0 14%;
  //@include background($blue100);
  @include flex-row(space-between, center);
  @include size(90%, 100%);
}

.planner-detail-box {
  flex: 1;
  @include flex-row(flex-start, flex-start);
  @include size(90%, 100%);
  overflow-x: hidden;
}

.title-container {
  display: flex;
  @include flex-column();
  @include size(100%, 100%);
}

.title {
  @include flex-row(flex-start, center);
  @include noto-sans-kr(900, 37px, $black);
  margin-top: 10px;

  .travel-date {
    @include flex-row(flex-start, center);
    @include size(auto, auto);
    margin: 18px 0 0 5px;

    .icon {
      @include noto-sans-kr(400, 18px, $gray500);
      margin: 0 8px 0 16px;
      color: $pink500;
    }

    span {
      @include noto-sans-kr(400, 19px, $gray600);
    }
  }
}

.menu-container {
  margin: 13px 0 0 5px;

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

.planner-date-box{
  @include flex-row(flex-start, flex-start);
  @include size(100%, 100%);
  //background-color: blue;
  overflow-x: scroll;
  padding:10px 0 2% 0;
}

.date-container {
  @include size(370px, 100%);
  min-width: 370px;
  //background: blue;

  .date-box {
    @include size(94%, 10%);
    @include flex-row(center, center);

    .date {
      @include flex-row(space-between, center);
      @include size(100%, 90%);
      background: $blue600;
      border-radius: 10px;
    }

    .text {
      @include noto-sans-kr(600, 26px, $gray25);
      margin-left: 28%;
    }

    .icon {
      @include noto-sans-kr(300, 20px, $gray25);
      margin: 15px;
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
          @include flex-row(space-between, center);
          @include size(100%, auto);
          @include noto-sans-kr(900, 21px, $black);

          .icon {
            @include noto-sans-kr(400, 18px, $gray500);
            margin: 0;
          }
        }

        .content-container {
          @include flex-column();
          @include size(100%, auto);
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
      @include noto-sans-kr(600, 28px, $gray25);
    }

    .icon {
      @include noto-sans-kr(300, 18px, $gray25);
      margin: 10px 0 4px 8px;
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

.planner-date-box::-webkit-scrollbar {
  display: none;
}

.tooltip-text {
  @include noto-sans-kr(400, 16px, $gray25);
  margin-bottom: 10px;
}

.search-container {
  @include flex-column();

  .search-content {
    @include flex-row(space-between, flex-end);

    .search-nickname {
      @include noto-sans-kr(700, 18px, $black);
      margin-left: 10px;
    }

    .search-userTag {
      @include noto-sans-kr(500, 14px, $gray600);
      margin: 5px 0 0 6px;
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

.tag-container {
  @include flex-row();
  font-family: "Noto Sans KR", sans-serif;
  margin-top: 26px;
}

.chattingButton {
  @include size(80px, 80px);
  @include flex-column(center, center);
  border-radius: 50%;
  background-repeat : no-repeat;
  background-size : cover;
  position: fixed;
  top: 90%;
  right: 1%;
  z-index: 999;
  box-shadow: 0px 2px 21px 3px $gray400;

  .icon {
    @include noto-sans-kr(400, 30px, $gray25);
  }
}

.modal-add-container {
  @include flex-row();
  align-items: center;

  .modal-button {
    @include size(150px, 25px);
    margin-left: 10px;
    padding: 0;
  }
}

.maps-integration {
  width: 100%;
  height: 300px;
  margin-bottom: 16px;
}

.place-picker-container {
  padding: 10px;
}
</style>