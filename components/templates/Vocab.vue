<template>
    <div class="">
        <div class="text-3xl fixed top-0 right-2" @click.native="processAudio">🔈</div>
        <OrganismsFlipCard v-if="!isFinishedFlash && currentVocabData" :contents="currentVocabData"
            @update-vocab-id="incrementVocabId" />
        <!-- <OrganismsQuizMultiple v-else :quiz="vocabulary" /> -->
    </div>
</template>
<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue';

interface Vocabulary {
    vocab_id: number;
    format: string;
    quizlet: { [key: string]: any };
}
type contentsType = {
    [key: string]: any;
}
const props = defineProps<{
    vocabularies: Vocabulary [];
}>();
const isFinishedFlash = ref(false);
const vocabId = ref<number>(1);
const currentVocabData = ref<contentsType>();
const processAudio = () => {
    let sound = new Howl({
        src: ['/audio/genki/vocab/K01_05.mp3']
    });
    sound.play();
}
onMounted(() => {
    currentVocabData.value = props.vocabularies.find((vocab:Vocabulary) => vocab?.vocab_id == vocabId.value)?.quizlet;
})
const incrementVocabId = () => {
    if(vocabId.value <= props.vocabularies.length) {
        vocabId.value += 1;
        currentVocabData.value = props.vocabularies.find((vocab: Vocabulary) => vocab?.vocab_id == vocabId.value)?.quizlet;
        console.log("Updated:", currentVocabData.value)
    }
}
</script>