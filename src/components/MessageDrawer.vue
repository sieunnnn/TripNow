<template>
  <n-drawer v-model:show="localMessageStatus" :width="500" style="padding: 30px 0 0 12px">
    <n-drawer-content :native-scrollbar="false" :width="996">
      <n-tabs type="segment" animated>
        <n-tab-pane name="search" tab="친구 찾기">
          <div class="search-container">
            <input v-model="searchInput" class="search-input" placeholder="친구를 맺고 싶은 유저의 이메일을 입력해주세요.">
            <button type="submit" class="search-button" @click="handleUserSearch()">
              <font-awesome-icon icon="fa-solid fa-magnifying-glass" style="margin-right: 5px"/>
              검색
            </button>
          </div>
          <div v-for="user in userSearchResponse" :key="user.userId" class="search-result-container">
            <div class="search-content">
              <div class="user-container">
                <n-avatar
                    round
                    size="medium"
                    :src="user.profileImageUrl || '../../../public/default.png'"
                />
                <div class="user-nickname">{{ user.nickname }}</div>
                <div class="user-userTag">#{{ user.userTag }}</div>
              </div>
              <button class="add-button" @click="handleSendRequest(user.userId)">친구 요청</button>
            </div>
            <hr v-if="index < userSearchResponse.length - 1" style="width: 100%; margin: 12px 0">
          </div>
        </n-tab-pane>
        <n-tab-pane name="friend" tab="친구  목록">
          <div class="friend-container">
            <div v-for="friend in friendList" :key="friend.friendId" class="friend-content">
              <div class="friend-box">
                <div class="friend-info">
                  <n-avatar
                      round
                      size="medium"
                      :src="friend.profileImageUrl == 'Default' ? '../../../public/default.png' : friend.profileImageUrl"
                      style="margin-left: 3px"
                  />
                  <div class="friend-nickname">{{ friend.nickname }}</div>
                  <div class="friend-tag"># {{ friend.userTag }}</div>
                </div>
                <div>
                  <button class="default-button" style="margin-right: 8px" @click="openSendMessageModal(friend.friendId)">쪽지 보내기</button>
                  <button class="delete-button" @click="handleDeleteFriend(friend.friendId)">친구 끊기</button>
                </div>
                <Modal :isOpen="modalStore.sendMessageModalOpen[friend.friendId]" :close="() => closeSendMessageModal(friend.friendId)">
                  <template #header>
                    쪽지 보내기
                  </template>
                  <template #content>
                      <textarea class="modal-input" v-model="messageForm.content" type="text" style="height: 100px; resize: none"/>
                  </template>
                  <template #footer>
                    <button @click="handleSendMessage(friend.friendId)" class="modal-button" style="height: 40px">쪽지 보내기</button>
                  </template>
                </Modal>
              </div>
              <hr style="width: 100%; margin: 12px 0">
            </div>
          </div>
        </n-tab-pane>
        <n-tab-pane name="request" tab="친구 요청" @activate="handleWaitingList">
          <div class="friend-container">
            <div v-for="friend in waitingList" :key="friend.friendId" class="friend-content">
              <div class="friend-box">
                <div class="friend-info">
                  <n-avatar
                      round
                      size="medium"
                      :src="friend.profileImageUrl == 'Default' ? '../../../public/default.png' : friend.profileImageUrl"
                      style="margin-left: 3px"
                  />
                  <div class="friend-nickname">{{ friend.nickname }}</div>
                  <div class="friend-tag"># {{ friend.userTag }}</div>
                </div>
                <button class="accept-button" @click="handleAccept(friend.friendId, friend.friendUserId)">요청 승낙</button>
              </div>
              <hr style="width: 100%; margin: 12px 0 0 0">
            </div>
          </div>
        </n-tab-pane>
        <n-tab-pane name="message" tab="메세지" @click="loadMoreFriends()">
          <div v-for="friend in friendMessageList" :key="friend.friendId" v-if="openFriendsList == null" class="friend-container">
            <div class="friend-content" @click="openMessages(friend.friendId)" style="cursor: pointer">
              <div class="friend-box">
                <div class="friend-info">
                  <n-avatar
                      round
                      size="small"
                      :src="friend.friendProfileImage == 'Default' ? '../../../public/default.png' : friend.friendProfileImage"
                      style="margin-left: 3px"
                  />
                  <div class="friend-nickname">{{ friend.friendNickname }}</div>
                  <div class="friend-tag"># {{ friend.friendTag }}</div>
                </div>
                <div class="friend-tag" style="font-size: 15px; width: 280px; overflow: hidden; font-size: 12px">{{ friend.recentMessage }}</div>
              </div>
              <hr style="width: 100%; margin: 12px 0 0 0">
            </div>
          </div>

          <!-- message -->
          <div v-if="openFriendsList != null" class="chatting-container" style="padding-top: 5px">
            <div @click="backToFriendsList()" style="cursor: pointer">
              <font-awesome-icon
                  icon="fa-solid fa-circle-arrow-left"
                  style="margin-right: 10px; color: #00C74A"
              />
              <span
                  class="message-nickname"
                  style="margin-left: 0"
              >
                뒤로 가기
              </span>
            </div>
            <hr style="width: 100%; margin: 5px 0 0 0">
            <div class="message-container" style="height: 75vh; padding-top: 10px">
              <div v-for="message in friendMessages" :key="message.messageId" class="message">
                <div v-if="message.isSent" class="send-user">
                  <div class="user-container">
                    <div>
<!--                      <span class="message-nickname">{{ message.sendUserNickname }}</span>-->
<!--                      <span class="message-tag"># {{ message.sendUserTag }}</span>-->
                    </div>
                    <div class="message-bubble">
                      {{ message.content }}
                    </div>
                    <span class="message-tag" style="font-size: 11px">{{ message.sendAt }}</span>
                  </div>
                </div>
                <div v-else class="receive-user">
                  <n-avatar
                      round
                      size="medium"
                      src="../../../public/default.png"
                  />
                  <div class="receive-container">
                    <div class="user-container">
                      <span class="message-nickname">{{ message.sendUserNickname }}</span>
                      <span class="message-tag"># {{ message.sendUserTag }}</span>
                    </div>
                    <div class="message-bubble">
                      {{ message.content }}
                    </div>
                    <span class="message-tag" style="margin-left: 10px; font-size: 12px">{{ message.sendAt }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="input-container" style="padding: 3px">
              <input v-model="messageForm.content" type="text" placeholder="대화 내용을 입력해주세요." />
              <button type="button" @click="handleSendMessage(openFriendsList)">전송하기</button>
            </div>
          </div>
        </n-tab-pane>
      </n-tabs>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import { defineProps, defineEmits } from "vue";
import {searchUsers} from "../api/SearchApi.ts";
import { userSearchResponse } from "../dto/SearchDto.ts";
import {acceptFriend, deleteFriend, getFriends, getWaitingAcceptFriends, requestFriend} from "@/api/FriendApi.ts";
import {friendRequestRequest, friendResponse} from "@/dto/FriendDto.ts";
import {useMessage} from "naive-ui";
import {useUserStore} from "@/store/userStore.ts";
import Modal from "@/components/Modal.vue";
import {useModalStore} from "@/store/modalStore.ts";
import {getMassageList, getMassages, sendMessage} from "@/api/MessageApi.ts";
import {messageListResponse, messageResponse} from "@/dto/MessageDto.ts";

const userStore = useUserStore();
const modalStore = useModalStore();

const props = defineProps({
  messageStatus: Boolean,
});

const message = useMessage();

const emits = defineEmits(['update:messageStatus']);

const localMessageStatus = ref(props.messageStatus);

watch(() => props.messageStatus, (newVal) => {
  localMessageStatus.value = newVal;
});

watch(localMessageStatus, (newVal) => {
  emits('update:messageStatus', newVal);
});

const openFriendsList = ref(null);

const openMessages = (friendId: number) => {
  console.log('openMessages called with friendId:', friendId);
  openFriendsList.value = friendId;
  loadMoreMessages(friendId, true);
}

const backToFriendsList = (friendId: number) => {
  openFriendsList.value = null;
}

// api
const searchInput = ref('');
const userSearchResponse = ref<Array<userSearchResponse>>([]);

const handleUserSearch = async () => {
  const input = searchInput.value.trim();
  if (input !== '') {
    const userSearchData = await searchUsers(input);
    userSearchResponse.value = userSearchData;
  }
};

// 친구 요청
const handleSendRequest = async (friendId: number) => {
  const response = await requestFriend(friendId);

  if (response == 200) {
    message.success("친구 요청에 성공 했어요.", {
      keepAliveOnHover: true
    });

    await handleWaitingList();

  } else if (response == "INVALID_VALUE_04") {
    message.error("이미 친구인 유저에게는 친구 요청을 보낼 수 없어요.", {
      keepAliveOnHover: true
    });
  }
}

// 친구 승낙 리스트
const waitingList = ref<Array<friendResponse>>([]);
const handleWaitingList = async () => {
  try {
    const response = await getWaitingAcceptFriends();
    waitingList.value = response;

  } catch (error) {
    console.error('Error loading waiting list: ',error);
  }
}

// 친구 승낙
const handleAccept = async (friendId: number, friendUserId: number) => {
  const response = await acceptFriend(friendId, friendUserId);

  if (response == 200) {
    message.success("요청 승낙에 성공 했어요.", {
      keepAliveOnHover: true
    });

    await handleWaitingList();
    await handleFriendList();

  }
}

// 친구 리스트
const friendList = ref<Array<friendResponse>>([]);
const handleFriendList = async () => {
  try {
    const response = await getFriends();
    friendList.value = response;

  } catch (error) {
    console.error('Error loading friend list: ',error);
  }
}

const handleDeleteFriend = async (friendId: number) => {
  try {
    const response = await deleteFriend(friendId);

    if (response == 200) {
      message.success("친구 끊기에 성공 했어요.", {
        keepAliveOnHover: true
      });
    }

    await handleFriendList();

  } catch (error) {
    console.error('Error delete friend: ',error);
  }
}

const openSendMessageModal = (friendId: number) => {
  modalStore.openSendMessageModal(friendId);
}

const closeSendMessageModal = (friendId: number) => {
  modalStore.closeSendMessageModal(friendId);
}

const messageForm = ref({
  content: ''
});

const handleSendMessage = async (friendId: number) => {
    try {
      const response = await sendMessage(friendId, messageForm.value.content);
      if (response == 200) {
        message.success("쪽지 보내기에 성공 했어요.", {
          keepAliveOnHover: true
        })

        messageForm.value.content = '';
        await loadMoreFriends(true);
        await loadMoreMessages(friendId, true);
        closeSendMessageModal(friendId);
      }
    } catch (error) {
      console.error('Error delete friend: ',error);
    }
}

// 무한 스크롤
const friendMessageList = ref<messageListResponse[]>([]);
const page = ref(0);
const size = 12;
const totalPages = ref(1);
const loading = ref(false);

const loadMoreFriends = async (reset = false) => {
  if (reset) {
    friendMessageList.value = [];
    page.value = 0;
    totalPages.value = 1;
  }

  if (loading.value || page.value >= totalPages.value) return;
  console.log('Loading messages...');
  loading.value = true;

  try {
    const response = await getMassageList(page.value, size);

    if (response.content) {
      friendMessageList.value.push(...response.content);
      page.value = response.number + 1;
      totalPages.value = response.totalPages || 1;
    }

  } catch (error) {
    console.error('Error loading message list:', error);

  } finally {
    loading.value = false;
  }
}

const friendListContainer = ref<HTMLElement | null>(null);

const handleScroll = () => {
  const container = friendListContainer.value;
  if (!container) return;

  const scrollTop = container.scrollTop;
  const scrollHeight = container.scrollHeight;
  const clientHeight = container.clientHeight;

  if (scrollTop + clientHeight >= scrollHeight - 50) {
    loadMoreFriends();
  }
};

const friendMessages = ref<messageResponse[]>([]);

const loadMoreMessages = async (friendId: number, reset = false) => {
  if (reset) {
    friendMessages.value = [];
    page.value = 0;
    totalPages.value = 1;
  }

  if (loading.value || page.value >= totalPages.value) return;
  console.log('Loading messages...');
  loading.value = true;

  try {
    const response = await getMassages(friendId, page.value, size);

    if (response.content) {
      friendMessages.value.push(...response.content);
      page.value = response.number + 1;
      totalPages.value = response.totalPages || 1;
    }

  } catch (error) {
    console.error('Error loading message list:', error);

  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  await userStore.fetchUserInfo();
  await handleWaitingList();
  await handleFriendList();
  await loadMoreFriends(true);
  plannerList.value?.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  friendListContainer.value?.removeEventListener('scroll', handleScroll);
});

</script>

<style scoped lang="scss">
@import '../assets/scss/color/_black.scss';
@import '../assets/scss/color/_blue.scss';
@import '../assets/scss/color/_red.scss';
@import '../assets/scss/mixins/_background.scss';
@import '../assets/scss/mixins/_display.scss';
@import '../assets/scss/mixins/_input.scss';
@import '../assets/scss/mixins/_button.scss';
@import '../assets/scss/mixins/_typo.scss';
@import "../assets/styles/message.scss";
@import "../assets/styles/modal.scss";

.search-container {
  @include flex-row();
  @include size(100%, auto);
  @include noto-sans-kr(400, 16px, $black);
  padding: 10px 4px 4px 4px;


  .search-input {
    @include custom-input();
    @include size(80%, 30px);
    margin-right: 10px;
  }

  .search-button {
    @include custom-button();
    @include size(90px, 31px);
    @include noto-sans-kr(400, 14px, $gray25);
  }
}

.search-result-container {
  @include flex-column();
  margin: 15px 4px 4px 4px;

  .search-content {
    @include flex-row(space-between, center);
    @include size(100%,auto);

    .user-container {
      @include flex-row(flex-start, center);

      .user-nickname {
        @include noto-sans-kr(700, 18px, $black);
        margin:0 10px 0 10px;
      }

      .user-userTag {
        @include noto-sans-kr(400, 16px, $gray500);
        margin-top: 2px;
      }
    }

    .add-button {
      @include custom-button();
      @include size(89px, 30px);
      @include noto-sans-kr(400, 14px, $gray25);
      background-color: $gray400;

      &:hover {
        background-color: darken($gray400, 15%);
      }

      &:focus {
        outline: none;
        background-color: darken($gray400, 15%);
      }
    }
  }
}

.friend-container {
  @include flex-column();
}

.friend-content {
  @include flex-column();
  margin-top: 10px;
  padding: 1px;
}

.friend-box {
  @include flex-row(space-between, center);

  .friend-nickname {
    @include noto-sans-kr(700, 18px, $black);
    margin:0 10px 0 10px;
  }

  .friend-tag {
    @include noto-sans-kr(400, 16px, $gray500);
    margin-top: 2px;
  }

  .delete-button {
    @include custom-button-red();
    @include size(90px, 28px);
    @include noto-sans-kr(400, 14px, $gray25);
  }

  .default-button {
    @include custom-button-default();
    @include size(90px, 28px);
    @include noto-sans-kr(400, 14px, $gray25);
  }

  .accept-button {
    @include custom-button();
    @include size(90px, 28px);
    @include noto-sans-kr(400, 14px, $gray25);
  }
}

.friend-info {
  @include flex-row();
}

</style>
