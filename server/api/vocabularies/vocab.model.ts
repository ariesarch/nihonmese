import { Schema, model } from 'mongoose';
import { IVocab } from '~/interfaces/IVocab';

// Define the schema for the vocabulary with more robust validation
const vocabularySchema = new Schema<IVocab>({
    japanese: { 
        type: String, 
        required: [true, 'Japanese word is required'],
        trim: true
    },
    romanji: { 
        type: String, 
        required: [true, 'Romanji transliteration is required'],
        trim: true
    },
    burmese: { 
        type: String, 
        required: [true, 'Burmese translation is required'],
        trim: true
    },
    english: { 
        type: String, 
        required: [true, 'English translation is required'],
        trim: true
    },
    form: { 
        type: String, 
        required: [true, 'Word form is required'],
        enum: ['Greeting', 'Expression', 'Farewell', 'Noun', 'Verb', 'Adjective']
    }
}, {
    // Add timestamps to track creation and update times
    timestamps: true,
    // Ensure consistent collection name
    collection: 'vocabularies'
});

// Create the model with explicit collection name
const Vocabulary = model<IVocab>('Vocabulary', vocabularySchema);

export { Vocabulary };