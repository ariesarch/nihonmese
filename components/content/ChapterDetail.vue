<template>
    <div>
        <!-- {{ chapterStore.chapter }} -->
    </div>
</template>
<script setup lang="ts">
import { defineProps, onMounted } from 'vue';
import { useChapterStore } from '@/store/chapter'

const props = defineProps<{
    config: {
        chapter_id: string;
        lesson_id: string;
        vocab_id: string;
    }
}>();
const chapterStore = useChapterStore();
onMounted(() => {
    chapterStore.fetchChapter(`/api/genki/chapter-${props.config.chapter_id}?chapter_id=${props.config.chapter_id}&lesson_id=${props.config.lesson_id}&vocab_id=${props.config.vocab_id}`)
        .then(() => {
            console.log("Fetched data:", chapterStore.chapter);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
});
</script>