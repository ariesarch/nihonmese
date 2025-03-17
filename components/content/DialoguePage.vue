<template>
    <div>
        <div class="flex flex-col h-96 w-full rounded-lg shadow-2xl my-1 p-2">
            <AtomsButton variant="outline" size="lg" class="w-1/3 mx-auto rounded-full"
                @click="isStartJourney = !isStartJourney" v-if="!isStartJourney">
                Start Journey
            </AtomsButton>
            <TemplatesDialogue v-else/>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref,watch} from 'vue'
import { useChapterStore } from '@/store/chapter'
const isStartJourney = ref(false);

const chapterStore = useChapterStore();
watch(
    () => chapterStore.chapter,
    (newChapter) => {
        if (newChapter && newChapter.dialogues) {
            console.log("Chapter data updated in Component B:", newChapter);
        }
    },
    { immediate: true }
);
</script>