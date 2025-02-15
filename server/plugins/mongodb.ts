import { useNitro } from "nuxt/kit";
import { connectToMongoDB } from '../db/mongoose';  // Import the MongoDB connection utility

export default defineNitroPlugin(async (nitroApp) => {
    console.log("Nitro Plugin is being executed");

    try {
        // Connect to MongoDB
        await connectToMongoDB();
        console.log("MongoDB connected successfully!");

        // Continue with other Nitro configurations if necessary
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
});
