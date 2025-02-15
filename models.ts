import mongoose, { Document, Schema } from 'mongoose';

interface IVocabulary extends Document {
    lesson_id: string;
    japanese: string;
    english: string;
    burmese: string;
}

interface ILesson extends Document {
    lesson_id: string;
    topic: string;
    describe: string;
    detail: string;
}

const VocabularySchema: Schema = new Schema({
    lesson_id: { type: String, required: true },
    japanese: { type: String, required: true },
    english: { type: String, required: true },
    burmese: { type: String, required: true }
});

const LessonSchema: Schema = new Schema({
    lesson_id: { type: String, required: true },
    topic: { type: String, required: true },
    describe: { type: String, required: true },
    detail: { type: String, required: true }
});

const Vocabulary = mongoose.model<IVocabulary>('Vocabulary', VocabularySchema);
const Lesson = mongoose.model<ILesson>('Lesson', LessonSchema);

export { Vocabulary, Lesson };
