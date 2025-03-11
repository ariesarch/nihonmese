<template>
    <div class="">
        <div class="text-3xl fixed top-0 right-2" @click.native="processAudio">🔈</div>
        <OrganismsFlipCard v-if="!isFinishedFlash" :contents="vocabulary.quizlet" />
        <OrganismsQuizMultiple v-else :quiz="vocabulary" />
    </div>
</template>
<script setup lang="ts">
import { ref, defineProps, watchEffect } from 'vue';

interface Vocabulary {
    vocab_id: string;
    format: string;
    quizlet: { [key: string]: any };
}
const props = defineProps<{
    vocabulary: Vocabulary;
}>();
const isFinishedFlash = ref(false);
const processAudio = () => {
    let sound = new Howl({
        src: ['/audio/genki/vocab/K01_05.mp3']
    });
    sound.play();
}
</script>