import { H3Event } from 'h3';  // Ensure you're importing the correct event type
import * as vocabService from './vocab.service';

// Controller function to handle the GET request for all vocabularies
export const getAllVocab = async (event: H3Event) => {
    try {
        // Call the service layer to get vocab list
        const vocabList = await vocabService.getAllVocab();
        // console.log((vocabList), "Controller")
        // Return a successful response with the vocab list
        // return { json: () => vocabList };
        return vocabList;
    } catch (error) {
        // Handle errors
        console.error("Error in getAllVocab:", error);
        return {
            status: 500,
            body: { message: "Internal Server Error" },
        };
    }
};