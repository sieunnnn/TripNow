import { ComponentCustomProperties } from 'vue';
import { addToast } from './components/ToastManager'; // 경로는 실제 ToastManager.vue 파일의 경로로 수정하세요

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $addToast: typeof addToast;
    }
}
