import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get MongoDB connection string from environment variables
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://devroot:devroot@localhost:27007/nihonmese?authSource=admin';

export const connectToMongoDB = async () => {
    try {
        // Check if already connected
        if (mongoose.connection.readyState === 1) {
            console.log("Already connected to MongoDB.");
            return;
        }

        // Connect to MongoDB with updated options
        await mongoose.connect(MONGODB_URI, {
            // Recommended options for newer Mongoose versions
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        });

        // Log successful connection
        console.log(`MongoDB connected successfully to: ${MONGODB_URI}`);

        // Optional: Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('Lost MongoDB connection');
        });
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("Collections in database:", collections);

    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        
        // Rethrow the error to allow the caller to handle it
        throw new Error(`MongoDB Connection Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

// Optional: Add a function to gracefully close the connection
export const disconnectFromMongoDB = async () => {
    try {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error disconnecting from MongoDB:', error);
    }
};
