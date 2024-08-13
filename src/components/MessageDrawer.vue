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
                <button class="delete-button" @click="handleDeleteFriend(friend.friendId)">친구 끊기</button>
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
        <n-tab-pane name="message" tab="메세지">
          <div v-if="openFriendsList" class="friend-container">
            <div class="friend-content" @click="openMessages()" style="cursor: pointer">
              <div class="friend-box">
                <div class="friend-info">
                  <n-avatar
                      round
                      size="small"
                      src="../../../public/default.png"
                      style="margin-left: 3px"
                  />
                  <div class="friend-nickname">시은</div>
                  <div class="friend-tag">#1234</div>
                </div>
                <div class="friend-tag" style="font-size: 15px">안녀어엉</div>
              </div>
              <hr style="width: 100%; margin: 12px 0 0 0">
            </div>
            <div class="friend-content">
              <div class="friend-box">
                <div class="friend-info">
                  <n-avatar
                      round
                      size="small"
                      src="../../../public/default.png"
                      style="margin-left: 3px"
                  />
                  <div class="friend-nickname">시은</div>
                  <div class="friend-tag">#1234</div>
                </div>
                <div class="friend-tag" style="font-size: 15px">안녀어엉</div>
              </div>
              <hr style="width: 100%; margin: 12px 0 0 0">
            </div>
          </div>

          <!-- message -->
          <div v-if="!openFriendsList" class="chatting-container">
            <hr style="width: 100%; margin: 0 0 5px 0">
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
            <div class="message-container" style="height: 75vh; padding-top: 30px">
              <div class="message">
                <div class="send-user">
                  <div class="user-container">
                    <div>
                      <span class="message-nickname">시니</span>
                      <span class="message-tag"># 1234</span>
                    </div>
                    <div class="message-bubble">
                      앙농
                    </div>
                    <span class="message-tag">2024. 07. 09 10 : 00</span>
                  </div>
                </div>
                <div class="receive-user">
                  <n-avatar
                      round
                      size="medium"
                      src="../../../public/default.png"
                  />
                  <div class="receive-container">
                    <div class="user-container">
                      <span class="message-nickname">누군가</span>
                      <span class="message-tag">#3456</span>
                    </div>
                    <div class="message-bubble">
                      hey
                    </div>
                    <span class="message-tag" style="margin-left: 10px">2024. 07. 09 10 : 00</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="input-container" style="padding: 3px">
              <input type="text" placeholder="대화 내용을 입력해주세요." />
              <button type="button">전송하기</button>
            </div>
          </div>
        </n-tab-pane>
      </n-tabs>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import { defineProps, defineEmits } from "vue";
import {searchUsers} from "../api/SearchApi.ts";
import { userSearchResponse } from "../dto/SearchDto.ts";
import {acceptFriend, deleteFriend, getFriends, getWaitingAcceptFriends, requestFriend} from "@/api/FriendApi.ts";
import {friendRequestRequest, friendResponse} from "@/dto/FriendDto.ts";
import {useMessage} from "naive-ui";
import {useUserStore} from "@/store/userStore.ts";

const userStore = useUserStore();

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

const openFriendsList = ref(true);

const openMessages = () => {
  openFriendsList.value = false;
}

const backToFriendsList = () => {
  openFriendsList.value = true;
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

onMounted(async () => {
  await userStore.fetchUserInfo();
  await handleWaitingList();
  await handleFriendList();
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
