<template>
    <div class="flex">
        <OrganismsFlipCard v-if="!isFinishedFlash"/>
        <OrganismsQuizMultiple v-else :quiz="vocabulary"/>
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
const isFinishedFlash = ref(true);

</script>