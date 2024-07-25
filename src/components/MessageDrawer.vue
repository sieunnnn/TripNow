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
              <button class="add-button" @click="handleSendRequest()">친구 요청</button>
            </div>
            <hr v-if="index < userSearchResponse.length - 1" style="width: 100%; margin: 12px 0">
          </div>
        </n-tab-pane>
        <n-tab-pane name="friend" tab="친구  목록">
          <div class="friend-container">
            <div class="friend-content">
              <div class="friend-box">
                <div class="friend-info">
                  <n-avatar
                      round
                      size="medium"
                      src="../../../public/default.png"
                  />
                  <div class="friend-nickname">시은</div>
                  <div class="friend-tag">#1234</div>
                </div>
                <button class="delete-button">친구 끊기</button>
              </div>
              <hr style="width: 100%; margin: 12px 0">
            </div>
          </div>
        </n-tab-pane>
        <n-tab-pane name="request" tab="친구 요청">
          ㅇㅇ
        </n-tab-pane>
        <n-tab-pane name="message" tab="메세지">
          메세지
        </n-tab-pane>
      </n-tabs>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { defineProps, defineEmits } from "vue";
import {searchUsers} from "../api/SearchApi.ts";
import { userSearchResponse } from "../dto/SearchDto.ts";

const props = defineProps({
  messageStatus: Boolean,
});

const emits = defineEmits(['update:messageStatus']);

const localMessageStatus = ref(props.messageStatus);

watch(() => props.messageStatus, (newVal) => {
  localMessageStatus.value = newVal;
});

watch(localMessageStatus, (newVal) => {
  emits('update:messageStatus', newVal);
});


// api
const searchInput = ref('');
const userSearchResponse = ref<Array<userSearchResponse>>([]);

const handleUserSearch = async () => {
  const input = searchInput.value.trim();
  console.log("input: ", input);
  if (input !== '') {
    const userSearchData = await searchUsers(input);
    userSearchResponse.value = userSearchData;
  }
};
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
}

.friend-info {
  @include flex-row();
}

</style>
