<template>
    <div class="">
        <OrganismsFlipCard v-if="!isFinishedFlash && currentVocabData" :contents="currentVocabData"
            :isNormalDir="isNormalDir" :selectedLang="selectedLang" @update-vocab-id="vocabIdByFlash" />
        <OrganismsQuizMultiple v-else-if="currentVocabData" :quiz="currentVocabData"
            :selectedLang="selectedLang" :isNormalDir="isNormalDir" />
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
type langType = string; 
type dirType = boolean; 
// const vocabulary: vocabType = chapterStore.chapter.vocabs
const vocabulary = ref(chapterStore.chapter);

const props = defineProps<{
    selectedLang: langType;
    isNormalDir: dirType;
}>();
const isFinishedFlash = ref(false);
const vocabId = ref<number>(1);
const currentVocabData = ref<Vocabulary>();
onMounted(() => {
    currentVocabData.value = vocabulary.value.vocabs.vocab_data.find((vocab:Vocabulary) => vocab?.vocab_id == vocabId.value);
})
const vocabIdByFlash = () => {
    if(vocabId.value < vocabulary.value.vocabs.vocab_data.length) {
        vocabId.value += 1;
        currentVocabData.value = vocabulary.value.vocabs.vocab_data.find((vocab: Vocabulary) => vocab?.vocab_id == vocabId.value);
        console.log("Updated:", currentVocabData.value)
    }else{
        vocabId.value = 1;
        currentVocabData.value = vocabulary.value.vocabs.vocab_data.find((vocab: Vocabulary) => vocab?.vocab_id == vocabId.value);
        isFinishedFlash.value = true
    }
}
</script>