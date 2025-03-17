<template>
    <div class="h-full w-full cursor-pointer flex flex-col justify-center gap-4">
        <h4 class="text-center text-primary-500">{{ vocabTitle }}</h4>
        <div class="flip-card w-full bg-primary-300 p-3 relative h-40" :class="{ 'rotate-x-180': flipped }">
            <div @click="flipCard"
                class="flip-card-front w-full h-full absolute flex flex-col items-center justify-center">
                <h4 class="text-2xl font-bold text-primary-500">{{front}}</h4>
                <h4 class="my-auto text-2xl font-bold text-green-700">{{ front_optional }}</h4>
            </div>

            <div @click="flipCard"
                class="flip-card-back w-full h-full absolute flex items-center justify-center rotate-x-180">
                <div>
                    <h4 class="my-auto text-2xl font-bold text-green-700">{{ back }}</h4>
                    <h4 class="my-auto text-2xl font-bold text-green-700">{{ back_optional }}</h4>
                </div>
            </div>
        </div>
        <div class="flex justify-center gap-2 bg-gray-100 py-2 flex-wrap">
            <AtomsButton variant="outline" size="sm" @click="goNext({isNext:false})">Prev</AtomsButton>
            <AtomsButton v-for="(page,index) in keys" :index="index"
                :variant="currentIterator == index ? 'solid' : 'outline'" size="sm"
                @click="goNext({isNext:true,page: index})">
                {{ index+1 }}
            </AtomsButton>
            <AtomsButton variant="outline" size="sm" @click="goNext({ isNext: true })">
                Next
            </AtomsButton>
        </div>
        <slot />
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps,onMounted,defineEmits,watch } from 'vue';
interface Vocabulary {
    vocab_id: number;
    format: string;
    title: string;
    quizlet: { [key: string]: any };
}
type langType = string; 
type dirType = boolean; 
const props = defineProps<{
    contents: Vocabulary,
    selectedLang: langType;
    isNormalDir: dirType;
}>();
const flipped = ref(false);
const front = ref('');
const back = ref('');
const front_optional = ref('');
const back_optional = ref('');
const vocabTitle = ref('');
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
    
    if (props.isNormalDir) {
        front.value = keys[currentIterator];
        back.value = props.contents.quizlet[keys[currentIterator]][props.selectedLang];
        back_optional.value = props.contents.quizlet[keys[currentIterator]][props.selectedLang == 'mm' ? 'en' : 'mm'];
    }else{
        console.log(props.isNormalDir)
        console.log(keys)
        back.value = keys[currentIterator];
        front.value = props.contents.quizlet[keys[currentIterator]][props.selectedLang];
        front_optional.value = props.contents.quizlet[keys[currentIterator]][props.selectedLang == 'mm' ? 'en' : 'mm'];
    }
}

const goNext = (params:any) => {
    let { isNext = true,page = null } = params;
    if(page == currentIterator)return;
    console.log("Page:",page, isNext,currentIterator,totalLength);
    if (isNext && currentIterator >= totalLength-1){
        console.log('case to updateParentVocab')
        updateParentVocab();
    }
    else if ((!isNext && currentIterator == 0)) {
        return;
    }else{
        currentIterator = page ?? (isNext ? currentIterator + 1 : currentIterator -1);
        console.log(currentIterator)
        setValues();
    }
    flipped.value = false;
}
const initiateQuizlet = () => {
    if (props.contents.quizlet) {
        vocabTitle.value = props.contents.title;
        keys = Object.keys(props.contents.quizlet);
        console.log(props.contents.title)
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
    () => props.contents.quizlet,
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
