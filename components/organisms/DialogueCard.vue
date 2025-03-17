<template>
    <div class="h-full w-full cursor-pointer flex flex-col justify-center gap-4">
        <h4 class="text-center text-primary-500">{{ vocabTitle }}</h4>
        {{ dialogueRef }}asdfdf
        <div class="flip-card w-full bg-primary-300 p-3 relative h-40">
            <div
                class="flip-card-front w-full h-full absolute flex flex-col items-center justify-center">
                <h4 class="text-2xl font-bold text-primary-500">{{ dialogueRef }}</h4>
                <h4 class="my-auto text-2xl font-bold text-green-700">{{ front_optional }}</h4>
            </div>
        </div>
        <div class="flex justify-center gap-2 bg-gray-100 py-2 flex-wrap">
            <AtomsButton variant="outline" size="sm" @click="goNext({ isNext: false })">Prev</AtomsButton>
            <AtomsButton v-for="(page, index) in keys" :index="index"
                :variant="currentIterator == index ? 'solid' : 'outline'" size="sm"
                @click="goNext({ isNext: true, page: index })">
                {{ index + 1 }}
            </AtomsButton>
            <AtomsButton variant="outline" size="sm" @click="goNext({ isNext: true })">
                Next
            </AtomsButton>
        </div>
        <slot />
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted, defineEmits, watch } from 'vue';
import { Howl, Howler } from 'howler';
interface speechType {
    speaker: string;
    speech: string;
}
interface Dialogue {
    dialogue_id: number;
    format: string;
    title: string;
    dialogue_audio: string;
    audio_start: number,
    audio_end: number,
    speeches: speechType[]
}
const props = defineProps<{
    contents: Dialogue
}>();
const dialogueRef = ref<Dialogue>();
const startRef = ref(1);
const endRef = ref(200);
const front_optional = ref('');
const vocabTitle = ref('');
let currentIterator = 0;
let keys: (string | string)[] = [];
let totalLength = 0;
let sound: Howl | null = null;
let isPlaying = ref(false);


const goNext = (params: any) => {
    let { isNext = true, page = null } = params;
    if (page == currentIterator) return;
    console.log("Page:", page, isNext, currentIterator, totalLength);
    if (isNext && currentIterator >= totalLength - 1) {
        console.log('case to updateParentVocab')
        updateParentVocab();
    }
    else if ((!isNext && currentIterator == 0)) {
        return;
    } else {
        currentIterator = page ?? (isNext ? currentIterator + 1 : currentIterator - 1);
        console.log(currentIterator)
    }
}
// const processAudio = () => {
//     if (!sound) return;
//     if (!isPlaying.value) {
//         sound.play();
//         isPlaying.value = true;
//     } else {
//         sound.pause();
//         isPlaying.value = false
//         console.log("pasus")
//     }
// }
const processAudio = () => {
    if (!sound) return;

    // Log the current state of the sound and the time values
    console.log("sound playing:", isPlaying.value);
    console.log("sound seek time:", startRef.value);

    // If audio is not playing, start it from the desired start time
    if (!isPlaying.value) {
        sound.seek(startRef.value);  // Start the audio from the defined start time
        sound.play();
        isPlaying.value = true;
        console.log("Audio started");
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
            clearInterval(checkAudioEnd);  // Clear interval once we stop the audio
            console.log("Audio stopped at end time.");
        }
    }, 100);  // Check every 100ms for accuracy
};

const initiateQuizlet = () => {
    if (props.contents) {
        vocabTitle.value = props.contents.title;
        // keys = Object.keys(props.contents.quizlet);
        console.log("Title",props.contents.title)
        totalLength = props.contents.speeches.length;
        currentIterator = 0;
        sound = new Howl({ src: props.contents.dialogue_audio });
        dialogueRef.value = props.contents
        startRef.value = props.contents.audio_start
        endRef.value = props.contents.audio_end
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
    () => props.contents,
    () => {
        initiateQuizlet();
        processAudio();
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
