
import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue';

export const useMsgStore = defineStore('msg', () => {
    const active = ref(false)
    return { active }
})