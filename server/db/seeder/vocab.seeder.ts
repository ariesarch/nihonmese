require('ts-node/register'); 
import mongoose from 'mongoose';
import { connectToMongoDB } from '../mongoose';
import { Vocabulary } from '~/server/api/vocabularies/vocab.model';
// Sample vocab data
const vocabData = [
    {
        japanese: 'こんにちは',
        romanji: 'Konnichiwa',
        burmese: 'မင်္ဂလာပါ',
        english: 'Hello',
        form: 'Greeting',
    },
    {
        japanese: 'ありがとう',
        romanji: 'Arigatou',
        burmese: 'ကျေးဇူးတင်ပါသည်',
        english: 'Thank you',
        form: 'Expression',
    },
    {
        japanese: 'さようなら',
        romanji: 'Sayounara',
        burmese: 'သွားပါရစေ',
        english: 'Goodbye',
        form: 'Farewell',
    },
    {
        japanese: 'おはよう',
        romanji: 'Ohayou',
        burmese: 'မနက်ခင်းပါ',
        english: 'Good morning',
        form: 'Greeting',
    },
];

// Function to insert vocab data
const seedVocab = async () => {
    try {
        // Connect to MongoDB
        await connectToMongoDB();

        // Check if the collection is already populated
        const count = await Vocabulary.countDocuments();
        if (count > 0) {
            console.log('Vocabulary collection already populated.');
            return;
        }

        // Insert vocab data into the collection
        const result = await Vocabulary.insertMany(vocabData);
        console.log(`${result.length} vocab items inserted.`);
    } catch (error) {
        console.error('Error seeding vocabulary:', error);
    } finally {
        // Close the connection
        mongoose.connection.close();
    }
};

// Run the seeder
seedVocab();
