import { Chapter, TvocabType } from '@/interfaces/IChapter';
import { defineStore } from 'pinia';


export const useChapterStore = defineStore('chapter', {
    state: () => ({
        chapter: {} as Chapter,
        vocabType: {} as TvocabType
    }),
    actions: {
        async fetchChapter(url:string) {
            const data = await $fetch(url);
            this.chapter = data as unknown as Chapter;
        },
        async setVocabType(vType: TvocabType) {
            this.vocabType = vType;
        }
    }
});
