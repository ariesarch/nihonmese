<template>
    <div class="">
        <OrganismsDialogueCard v-if="!isFinishedDialogue && currentDialogueData" :contents="currentDialogueData"
            @update-vocab-id="vocabIdByFlash" />
    </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useChapterStore } from '@/store/chapter'
const chapterStore = useChapterStore();
interface speechType {
    speaker: string;
    speech: string;
}
interface Dialogue {
    dialogue_id: number;
    format: string;
    title: string;
    dialogue_audio: string;
    speeches: speechType[]
}
// const vocabulary: dialogueType = chapterStore.chapter
const vocabulary = ref(chapterStore.chapter.dialogues);
const isFinishedDialogue = ref(false);
const DialogueId = ref<number>(1);
const currentDialogueData = ref<Dialogue |null>();
onMounted(() => {
    currentDialogueData.value = vocabulary.value.dialogue_data.find((vocab: Dialogue) => 
         vocab?.dialogue_id == DialogueId.value);
})
const vocabIdByFlash = () => {
    if (DialogueId.value < vocabulary.value.dialogue_data?.length) {
        DialogueId.value += 1;
        currentDialogueData.value = vocabulary.value.dialogue_data?.find((vocab: Dialogue) => vocab?.dialogue_id == DialogueId.value);
        console.log("Updated:", currentDialogueData.value)
    } else {
        DialogueId.value = 1;
        currentDialogueData.value = vocabulary.value.dialogue_data?.find((vocab: Dialogue) => vocab?.dialogue_id == DialogueId.value);
        isFinishedDialogue.value = true
    }
}
</script>