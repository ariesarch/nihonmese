import { defineEventHandler } from 'h3';
import { Vocabulary } from "./vocab.model";
import mongoose from 'mongoose';

export default defineEventHandler(async (event) => {
    try {
        // Log connection state
        console.log("Mongoose Connection State:", mongoose.connection.readyState);
        console.log("Mongoose Connection URI:", mongoose.connection.host);

        // Check if connection is established
        if (mongoose.connection.readyState !== 1) {
            throw new Error('MongoDB connection is not established');
        }

        // Perform count to verify collection exists
        const collectionCount = await Vocabulary.countDocuments();
        console.log("Total Vocabulary Documents:", collectionCount);

        // Fetch all vocabularies with detailed logging
        const vocabularies = await Vocabulary.find({});
        
        console.log("Vocabularies Query Result:", {
            count: vocabularies.length,
            firstDocument: vocabularies[0] || 'No documents found'
        });

        // Additional debugging: list collection names
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("Available Collections:", collections.map(c => c.name));

        // Return vocabularies or an informative message
        return vocabularies.length > 0 
            ? vocabularies 
            : { message: 'No vocabularies found', count: 0 };

    } catch (error) {
        console.error("Comprehensive Error Fetching Vocabularies:", {
            errorName: error instanceof Error ? error.name : 'Unknown Error',
            errorMessage: error instanceof Error ? error.message : 'No error details',
            errorStack: error instanceof Error ? error.stack : 'No stack trace'
        });

        // Return a structured error response
        return {
            error: true,
            message: error instanceof Error ? error.message : 'Unknown error occurred',
            details: 'Failed to fetch vocabularies'
        };
    }
});
