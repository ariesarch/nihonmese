import { useFetch } from 'nuxt/app';
import { defineStore } from 'pinia';

interface Vocabulary {
    vocab_id: number;
    format: string;
    title: string;
    quizlet: { [key: string]: any };
}
interface speechType {
    speaker: string;
    speech: string;
}

interface vocabsType {
    vocab_audio: string;
    vocab_data: Vocabulary[]
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
interface dialoguesType {
    dialogue_data: Dialogue[]
}

interface chapterType {
    chapter_id: string;
    lesson_id: string;
    vocabs: vocabsType;
    dialogues: dialoguesType;
}
export const useChapterStore = defineStore('chapter', {
    state: () => ({
        chapter: {} as chapterType
    }),
    actions: {
        async fetchChapter(url:string) {
            const data = await $fetch(url);
            this.chapter = data as unknown as chapterType;
        }
    }
});
