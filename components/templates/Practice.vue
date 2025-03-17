<template>
    <div class="">
        {{ chapterStore.chapter.vocabs }}
        <OrganismsDialogueCard v-if="!isFinishedDialogue && currentDialogueData" :contents="currentDialogueData"
            @update-vocab-id="vocabIdByFlash" />
    </div>
</template>
<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue';
import { useChapterStore } from '@/store/chapter'
const chapterStore = useChapterStore();
interface Vocabulary {
    vocab_id: number;
    format: string;
    title: string;
    quizlet: { [key: string]: any };
}
interface vocabType {
    vocab_audio: string;
    vocab_data: Vocabulary[]
}

const vocabulary: vocabType = chapterStore.chapter.vocabs

const isFinishedDialogue = ref(false);
const vocabId = ref<number>(1);
const currentDialogueData = ref<Vocabulary>();
onMounted(() => {
    // currentDialogueData.value = vocabulary.vocab_data.find((vocab: Vocabulary) => vocab?.vocab_id == vocabId.value);
})
const vocabIdByFlash = () => {
    if (vocabId.value < vocabulary.vocab_data.length) {
        vocabId.value += 1;
        currentDialogueData.value = vocabulary.vocab_data.find((vocab: Vocabulary) => vocab?.vocab_id == vocabId.value);
        console.log("Updated:", currentDialogueData.value)
    } else {
        vocabId.value = 1;
        currentDialogueData.value = vocabulary.vocab_data.find((vocab: Vocabulary) => vocab?.vocab_id == vocabId.value);
        isFinishedDialogue.value = true
    }
}
</script>