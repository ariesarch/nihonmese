<template>
    <div class="">
        <OrganismsFlipCard v-if="!isFinishedFlash && currentVocabData" :contents="currentVocabData"
            :isNormalDir="isNormalDir" :selectedLang="selectedLang" @update-vocab-id="vocabIdByFlash" />
        <OrganismsQuizMultiple v-else-if="currentVocabData" :quiz="currentVocabData"
            :selectedLang="selectedLang" :isNormalDir="isNormalDir" />
    </div>
</template>
<script setup lang="ts">
import { ref, defineProps, onMounted,watch } from 'vue';
import { useChapterStore } from '@/store/chapter'
import { Chapter,Vocabulary, TlangType, TdirType, TvocabId, TisNext, TvocabType, Vocab } from '@/interfaces/IChapter';
const chapterStore = useChapterStore();

const vocabulary = ref<Vocab>(chapterStore.chapter.vocabs);
// const vType = ref<TvocabType>(chapterStore.vocabType);
const props = defineProps<{
    selectedLang: TlangType;
    isNormalDir: TdirType;
    vocabType: TvocabType;
}>();
const isFinishedFlash = ref(false);
const vocabId = ref<TvocabId>(1);
const currentVocabData = ref<Vocabulary>();
watch(
    () => chapterStore.chapter,
    (newChapter) => {
        const vocabType = props.vocabType as keyof Chapter;
        const vocab = newChapter[vocabType] as Vocab;
        if (newChapter && vocab) {
            currentVocabData.value = vocab.vocab_data.find((vocab: Vocabulary) => vocab?.vocab_id == vocabId.value);
        }
    },
    { immediate: true }
);
// onMounted(() => {
//     vocabulary.value = chapterStore.chapter[props.vocabType]
//     console.log("TTT", props.vocabType)
//     currentVocabData.value = vocabulary.value.vocab_data.find((vocab:Vocabulary) => vocab?.vocab_id == vocabId.value);
// })
const vocabIdByFlash = (isNext: TisNext) => {
    if (vocabId.value < vocabulary.value.vocab_data.length) {
        vocabId.value = isNext? vocabId.value + 1 : vocabId.value -1;
        currentVocabData.value = vocabulary.value.vocab_data.find((vocab: Vocabulary) => vocab?.vocab_id == vocabId.value);
        console.log("Updated:", vocabId.value)
    } else {
        console.log("Updated decrease:")
        vocabId.value = 1;
        currentVocabData.value = vocabulary.value.vocab_data.find((vocab: Vocabulary) => vocab?.vocab_id == vocabId.value);
        isFinishedFlash.value = true
    }
}
</script>