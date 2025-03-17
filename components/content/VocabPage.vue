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
            <form class="max-w-sm mx-auto" v-if="!isStartJourney">
                <select v-model="selectedLang" id="countries"
                    class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option value="en">English</option>
                    <option value="mm">Myanmar</option>
                </select>
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an
                    option</label>
            </form>
            <AtomsButton variant="outline" size="lg" class="w-1/3 mx-auto rounded-full"
                @click="isStartJourney = !isStartJourney" v-if="!isStartJourney">
                Start Journey
            </AtomsButton>
            <TemplatesVocab v-else :selectedLang="selectedLang" :isNormalDir="isNormalDir"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, defineProps, watchEffect, watch } from 'vue';
import { Howl, Howler } from 'howler';
import { useChapterStore } from '@/store/chapter'

const chapterStore = useChapterStore();

interface Vocabulary {
    vocab_id: number;
    format: string;
    quizlet: { [key: string]: any };
}
const isStartJourney = ref(false);
const vocabularies = ref<Vocabulary[]>([]); 
const selectedLang = ref<string>('mm');
const isNormalDir = ref(true);
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
watch(
    () => chapterStore.chapter,
    (newChapter) => {
        if (newChapter && newChapter.vocabs) {
            console.log("Chapter data updated in Component B:", newChapter);
            sound = new Howl({ src: newChapter.vocabs.vocab_audio });
        }
    },
    { immediate: true }
);

</script>