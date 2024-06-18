<template>
  <div class="date-input-container">
    <div class="custom-date-input">
      <input
          type="text"
          v-model="formattedDate"
          readonly
          class="input"
          :placeholder="placeholder"
      />
      <font-awesome-icon icon="fa-regular fa-calendar" @click="toggleDatePicker" class="icon" />
    </div>
    <div v-if="popoverVisible" class="calendar-container">
      <va-date-picker
          v-model="selectedDate"
          format="YYYY.M.D."
          highlight-weekend
          color="#1570EF"
          @confirm="handleConfirm"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps } from 'vue';
import { VaDatePicker } from 'vuestic-ui';
import 'vuestic-ui/css';

const props = defineProps({
  modelValue: {
    type: Date,
    default: () => new Date(),
  },
  placeholder: {
    type: String,
    default: 'YYYY.M.D.',
  }
});

const selectedDate = ref<Date | null>(props.modelValue);
const formattedDate = ref('');
const popoverVisible = ref(false);

const toggleDatePicker = () => {
  popoverVisible.value = !popoverVisible.value;
};

const handleConfirm = (date: Date | null) => {
  if (date) {
    updateFormattedDate(date);
  }
  popoverVisible.value = false;
};

const updateFormattedDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
  formattedDate.value = new Date(date).toLocaleDateString('ko-KR', options).replace(/\./g, '. ');
};

watch(selectedDate, (newDate) => {
  if (newDate) {
    updateFormattedDate(newDate);
    popoverVisible.value = false;
  }
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

.date-input-container {
  position: relative;
}

.custom-date-input {
  @include custom-input();
  @include size(100%, 30px);
  @include flex-row(space-between, center);
  @include noto-sans-kr(400, 16px, $black);
  text-align: center;

  &:hover {
    border-color: darken($gray400, 10%);
    outline: $blue100 solid 3px;
  }
}

.input {
  border: none;
  outline: transparent;
}

.icon {
  color: $gray500;
}

.calendar-container {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 5px;
  border: $gray400, solid, 1px;
  border-radius: 10px;
  z-index: 9999999;
  backdrop-filter: blur(12px);
  background-color: rgba(252,252,253, 0.8);
  padding: 20px;
}
</style>
