import mongoose, { Schema } from 'mongoose';

// Define the schema for the flashcards
const vocabularySchema = new Schema<{
  lesson_id: number;
  japanese: string;
  english: string;
  burmese?: string;
  form?: string;
}>(
  {
    lesson_id: { type: Number, required: true },
    japanese: { type: String, required: true },
    english: { type: String, required: true },
    burmese: { type: String, default: '' },
    form: { type: String, default: '' },
  }
);

const Vocabulary = mongoose.model('Vocabulary', vocabularySchema);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/nohonmese')
  .then(() => {
    console.log('MongoDB connected');
    return Vocabulary.deleteMany(); // Clear existing data
  })
  .then(() => {
    // Data to insert
    const flashcards: { lesson_id: number; japanese: string; english: string; burmese?: string; form?: string; }[] = [
      { lesson_id: 1, japanese: '私', english: 'I' },
      { lesson_id: 1, japanese: 'あなた', english: 'You' },
      { lesson_id: 1, japanese: 'あの人', english: 'That person, he, she' },
      { lesson_id: 1, japanese: '先生', english: 'Teacher, instructor' },
      { lesson_id: 1, japanese: '学生', english: 'Student' },
      // Add more entries as needed
    ];

    // Insert the data
    return Vocabulary.insertMany(flashcards);
  })
  .then(() => {
    console.log('Flashcards seeded');
    return mongoose.disconnect();
  })
  .catch((err: any) => {
    console.error('Error seeding flashcards:', err);
    mongoose.disconnect();
  });
