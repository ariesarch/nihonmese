<template>
    <div>
        <div v-show="isStartJourney" class="text-3xl text-center cursor-pointer" @click.native="processAudio">
            {{ !isPlaying ? '🔈' :'⏸️'}}
        </div>
        <div class="flex flex-col h-96 w-full rounded-lg shadow-2xl my-1 p-2">
            <div class="flex justify-center items-center space-x-6">
                <!-- Displaying the current languages -->
                <div class="flex items-center space-x-2">
                    <span class="text-xl font-semibold">{{ isNormalDir ? 'Japanese' : selectedLang == 'en' ? 'English' :
                        'Myanmar' }}</span>
                </div>
                <!-- Bi-Directional Arrow -->
                <div class="text-3xl cursor-pointer">
                    <span @click="toggleSourceLang">🔄</span> <!-- This is the bi-directional arrow -->
                </div>
                <!-- Display the language on the other side -->
                <div class="flex items-center space-x-2">
                    <span class="text-xl font-semibold">{{ isNormalDir ? selectedLang == 'en' ? 'English' : 'Myanmar' :
                        'Japanese' }}</span>
                </div>
            </div>
            <AtomsButton variant="outline" size="lg" class="w-1/3 mx-auto rounded-full"
                @click="isStartJourney = !isStartJourney" v-if="!isStartJourney">
                Start Journey
            </AtomsButton>
            <TemplatesVocab v-else :selectedLang="selectedLang" :isNormalDir="isNormalDir" :vocabType="vocabType"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, defineProps, watchEffect, watch, onMounted } from 'vue';
import { Howl } from 'howler';
import { useChapterStore } from '@/store/chapter'
import { Chapter, Vocab, TlangType, TdirType, TvocabType } from '@/interfaces/IChapter';
const chapterStore = useChapterStore();
const props = defineProps<{
    vocabType: TvocabType
}>();
const isStartJourney = ref(false);
const selectedLang = ref<TlangType>('mm');
const isNormalDir = ref <TdirType>(true);
const toggleSourceLang = () => {
    isNormalDir.value = !isNormalDir.value
}
let isPlaying = ref(false);
let sound: Howl | null = null;
const processAudio = () => {
    if (!sound) return;
    if(!isPlaying.value) {
        sound.play();
        isPlaying.value = true;
    }else{
        sound.pause();
        isPlaying.value = false
        console.log("pasus")
    }
}
// onMounted(() => {
//     chapterStore.setVocabType(props.vocabType);
// });
watch(
    () => chapterStore.chapter,
    (newChapter) => {
        const vocabType = props.vocabType as keyof Chapter;
        const vocab = newChapter[vocabType] as Vocab;
        if (newChapter && vocab) {
            sound = new Howl({ src: vocab?.vocab_audio });
        }
    },
    { immediate: true }
);

</script>