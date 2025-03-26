<template>
    <div class="h-full w-full cursor-pointer flex flex-col justify-center gap-4">
        <h4 class="text-center text-primary-500">{{ vocabTitle }}</h4>
        <div class="flip-card w-full p-3 relative h-40">
            <div class="flip-card-front w-full h-full absolute flex flex-col items-center justify-center">
                <!-- <h4 class="text-2xl font-bold text-primary-500">{{ dialogueRef }}</h4> -->
                <h6 class="my-auto text-2xl font-bold text-green-700">{{ typedSpeaker }}: {{ typedSpeech }}</h6>
            </div>
        </div>
        <div class="flex justify-center gap-2 bg-gray-100 py-2 flex-wrap" v-show="!isPlaying">
            <AtomsButton variant="outline" size="sm" @click="goNext({ isNext: false })">Prev</AtomsButton>
            <AtomsButton v-for="(page, index) in keys" :index="index"
                :variant="currentIterator == index ? 'solid' : 'outline'" size="sm"
                @click="goNext({ isNext: true, page: index })">
                {{ index + 1 }}
            </AtomsButton>
            <AtomsButton variant="outline" size="sm" @click="goNext({ isNext: true })"
                v-show="currentIterator < totalQuizletsLength - 1">
                Next
            </AtomsButton>
        </div>
        <slot />
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted, defineEmits, watch, Ref } from 'vue';
import { Howl, Howler } from 'howler';
import { IPracticeData, IQuizlet, ISpeech } from '@/interfaces/IChapter';

const props = defineProps<{
    practice_data: IPracticeData
}>();
const dialogueRef = ref<IPracticeData>();
const startRef = ref(1);
const endRef = ref(200);
const isTyping = ref(true);
const vocabTitle = ref('');
let currentIterator = 0;
let keys: (string | string)[] = [];
let totalQuizletsLength = 0;
let sound: Howl | null = null;
let isPlaying = ref(false);
const speechRef = ref<ISpeech>();
const typedSpeaker = ref('');
const typedSpeech = ref('');

// Define the function for the typing effect
const typeTextEffect = (
    text: string,
    textType: string,
    typingDuration: number,
    onFinish?: () => void
) => {
    // const displayedText = ref<string>('');

    let index = 0;
    const totalCharacters = text.length;
    const intervalDuration = typingDuration / totalCharacters;
    const interval = setInterval(() => {
        if (index < totalCharacters) {
            if (textType == "speaker") {
                typedSpeaker.value += text[index];
            } else {
                typedSpeech.value += text[index];
            }
            index++;
        } else {
            clearInterval(interval);
            if (onFinish) {
                onFinish();
            }
        }
    }, intervalDuration);
};
const processAudio = () => {
    if (!sound) return;
    // If audio is not playing, start it from the desired start time
    if (!isPlaying.value) {
        sound.seek(startRef.value);
        sound.play();
        isPlaying.value = true;
        console.log("Audio started");
        const totalDuration = 1000 * (endRef.value - startRef.value);
        console.log("Total Duration:", totalDuration)
        if (speechRef.value) {
            typeTextEffect(speechRef.value.speaker, "speaker", 1000);
            typeTextEffect(speechRef.value.speech, "speech", totalDuration);
        }
    } else {
        sound.pause();
        isPlaying.value = false;
        console.log("Paused");
    }
    // Stop audio at the specific end time
    const checkAudioEnd = setInterval(() => {
        if (sound && sound.seek() >= endRef.value) {
            sound.pause();
            isPlaying.value = false;
            clearInterval(checkAudioEnd);
            console.log("Audio stopped at end time.", endRef.value);
        }
    }, 100);
};
const goNext = (params: any) => {
    let { isNext = true, page = null } = params;
    if (page == currentIterator) return;
    console.log("Page:", page, isNext, currentIterator, totalQuizletsLength);
    if (isNext && currentIterator >= totalQuizletsLength - 1) {
        console.log('case to updateParentVocab')
        updateParentVocab();
    }
    else if ((!isNext && currentIterator == 0)) {
        return;
    } else {
        console.log("Process pagination")
        typedSpeaker.value = '';
        typedSpeech.value = '';
        currentIterator = page ?? (isNext ? currentIterator + 1 : currentIterator - 1);
        console.log(currentIterator)
        // setSpeech();

    }
}
const setSpeech = () => {
    speechRef.value = props.practice_data.speeches[currentIterator]
    startRef.value = speechRef.value.audio_start
    endRef.value = speechRef.value.audio_end
    processAudio();
}
const initiateQuizlet = () => {
    if (props.practice_data) {
        vocabTitle.value = props.practice_data.title;
        // keys = Object.keys(props.practice_data.quizlet);
        console.log("Title", props.practice_data.title)
        totalQuizletsLength = props.practice_data.quizlets.length;
        currentIterator = 0;
        sound = new Howl({ src: props.practice_data.practice_audio });
        dialogueRef.value = props.practice_data
        // speechRef.value = props.practice_data.speeches[0]
        // setSpeech();
    }
}

const emit = defineEmits<{
    (e: 'update-vocab-id'): void;
}>();
const updateParentVocab = () => {
    emit('update-vocab-id');
    console.log("Emit")
}
watch(
    () => props.practice_data,
    () => {
        initiateQuizlet();
    },
    { immediate: true }
);

</script>

<style scoped>
.flip-card {
    transform-style: preserve-3d;
    transition: transform 0.6s;
}

.flip-card-front,
.flip-card-back {
    backface-visibility: hidden;
}

.rotate-x-180 {
    transform: rotateX(180deg);
}
</style>
