<template>
    <div>
        <div class="flex flex-col h-96 w-full rounded-lg shadow-2xl my-1 p-2">
            <AtomsButton variant="outline" size="lg" class="w-1/3 mx-auto rounded-full"
                @click="isStartJourney = !isStartJourney" v-if="!isStartJourney">
                Start Journey
            </AtomsButton>
            <TemplatesPractice v-else :practiceId="practiceId"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { TpracticeId } from '@/interfaces/IChapter';
const props = defineProps<{
    practiceId: TpracticeId
}>();
const isStartJourney = ref(false);
</script>