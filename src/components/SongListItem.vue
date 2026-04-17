<script setup>
import { ref } from 'vue'
const props = defineProps({
    song: {
        type: Object,
        required: true
    }
})
const song = ref(props.song)
</script>
<template>
    <div class="flex w-full items-center justify-between flex-row px-[15px] mb-[15px]">
        <div class="flex items-center justify-between flex-row">
            <van-image lazy-load class="w-[40px] h-[40px]" radius="5px" fit="cover" :src="song.picUrl" />
            <div class="ml-[10px]">
                <div class="text-[16px] font-bold">{{ song.name }}-{{ song.alia }}</div>
                <div class="text-[14px] text-[#999]">{{ song.singerNames }}-{{ song.alName }}</div>
            </div>
        </div>
        <div class="flex items-center justify-between flex-row">
            <van-icon v-if="song.mv != 0" name="live" />
            <van-icon name="weapp-nav" />
        </div>
    </div>
</template>
