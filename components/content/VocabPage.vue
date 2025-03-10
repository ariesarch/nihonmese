<template>
    <div class="flex flex-col h-96 w-full rounded-lg shadow-2xl my-1 p-2">
        <AtomsButton variant="outline" size="lg" class="w-1/3 mx-auto my-auto rounded-full"
            @click="isStartJourney = !isStartJourney" v-if="!isStartJourney">
            Start Journey
        </AtomsButton>
        <TemplatesVocab v-else :vocabulary="vocabulary"/>
    </div>
</template>
<script setup lang="ts">
import { ref, defineProps, watchEffect } from 'vue';
const props = defineProps < {
    config: {
        chapter_id: string;
        lesson_id: string;
        vocab_id: string;
    }
} > ();
interface Vocabulary {
    vocab_id: string;
    format: string;
    quizlet: { [key: string]: any };
}
const isStartJourney = ref(false);
const vocabulary = ref<Vocabulary | null>(null); 

watchEffect(async()=> {
    if (isStartJourney) {
        const fetchedLesson = await $fetch(`/api/lesson_content?chapter_id=${props.config.chapter_id}&lesson_id=${props.config.lesson_id}&vocab_id=${props.config.vocab_id}`);
        vocabulary.value = fetchedLesson as Vocabulary;
    }
})
</script>