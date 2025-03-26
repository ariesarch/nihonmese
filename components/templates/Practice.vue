<template>
    <div class="">
        {{ currentPracticeData }}
        <OrganismsPracticeCard v-if="!isFinishedPractice && currentPracticeData" :practice_data="currentPracticeData"
            @update-vocab-id="vocabIdByFlash" />
    </div>
</template>
<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue';
import { useChapterStore } from '@/store/chapter'
import { IPracticeData, TpracticeId } from '@/interfaces/IChapter';
const props = defineProps<{
    practiceId: TpracticeId
}>();
const chapterStore = useChapterStore();
const practice = ref(chapterStore.chapter.practices);

const isFinishedPractice = ref(false);
const practiceId = ref<number>(props.practiceId);
const currentPracticeData = ref<IPracticeData>();
// onMounted(() => {
//     // currentPracticeData.value = vocabulary.vocab_data.find((vocab: Vocabulary) => vocab?.vocab_id == practiceId.value);
// })
onMounted(() => {
    currentPracticeData.value = practice.value.practice_data.find((vocab: IPracticeData) =>
        vocab?.practice_id == practiceId.value);
})
const vocabIdByFlash = () => {
    if (practiceId.value < practice.value.practice_data.length) {
        practiceId.value += 1;
        currentPracticeData.value = practice.value.practice_data.find((vocab: IPracticeData) => vocab?.practice_id == practiceId.value);
        console.log("Updated:", currentPracticeData.value)
    } else {
        practiceId.value = 1;
        currentPracticeData.value = practice.value.practice_data.find((vocab: IPracticeData) => vocab?.practice_id == practiceId.value);
        isFinishedPractice.value = true
    }
}
</script>