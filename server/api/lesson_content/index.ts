import { defineEventHandler } from 'h3';
import lessons from './data.json';

export default defineEventHandler((event) => {

    const { chapter_id,lesson_id,vocab_id } = getQuery(event)
    console.log('chapter-id', typeof (chapter_id))
    if (chapter_id) {
        const lesson = lessons.find((chapter) => chapter.chapter_id === chapter_id && chapter.lesson_id === lesson_id);
        if (lesson?.vocabs && vocab_id) {
            // const vocab = lesson.vocabs.find((vocab)=> vocab.vocab_id == vocab_id);
            console.log('Result:', JSON.stringify(lesson?.vocabs))
            return lesson?.vocabs;
        } else {
            return { message: 'Lesson not found' };
        }
    }

    return lessons;
});