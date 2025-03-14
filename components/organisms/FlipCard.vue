<template>
    <div class="h-80 w-full cursor-pointer flex flex-col justify-center">
        <div class="flip-card w-full flex-grow" :class="{ 'rotate-x-180': flipped }">
            <div @click="flipCard"
                class="flip-card-front w-full h-full absolute flex flex-col items-center justify-center">
                <h4 class="text-2xl font-bold text-primary-500">{{front}}</h4>
            </div>

            <div @click="flipCard"
                class="flip-card-back w-full h-full absolute flex items-center justify-center rotate-x-180">
                <div>
                    <h4 class="my-auto text-2xl font-bold text-green-700">{{ back }}</h4>
                    <h4 class="my-auto text-2xl font-bold text-green-700">{{ back_mm }}</h4>
                </div>
            </div>
        </div>
        <div class="flex justify-center gap-2 bg-gray-100 py-2">
            <AtomsButton variant="outline" size="sm" @click="goNext(false)">Prev</AtomsButton>
            <AtomsButton variant="outline" size="sm" @click="goNext" :disabled="currentIterator >= totalLength">Next</AtomsButton>
        </div>
        <slot />
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps,onMounted,defineEmits,watch } from 'vue';
type contentsType = {
    [key: string]: any;
}
const props = defineProps < {
    contents: contentsType,
} >();

const flipped = ref(false);
const front = ref('');
const back = ref('');
const back_mm = ref('');
let currentIterator = 0;
let keys: (string | string)[] = [];
let totalLength = 0;
const flipCard = () => {
    setValues();
    flipped.value = !flipped.value;
};
const setValues = () => {
    if (currentIterator >= totalLength) {
        return;
    }
    front.value = keys[currentIterator];
    back.value = props.contents[keys[currentIterator]].en;
    back_mm.value = props.contents[keys[currentIterator]].mm;
}
const goNext = (isNext = true) => {
    if (isNext && currentIterator >= totalLength){
        console.log('case to updateParentVocab')
        updateParentVocab();
    }
    else if ((!isNext && currentIterator == 0)) {
        return;
    }else{
        currentIterator = isNext ? currentIterator + 1 : currentIterator - 1;
        console.log(currentIterator)
        setValues();
    }
    flipped.value = false;
}
const initiateQuizlet = () => {
    if (props.contents) {
        keys = Object.keys(props.contents);
        console.log(keys)
        totalLength = keys.length;
        currentIterator =0;
        setValues();
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
        setValues();
        flipped.value = false;
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
