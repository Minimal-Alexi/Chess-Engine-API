import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI as string);
        console.log('D: MongoDB connected successfully\n', `Host: ${connectionInstance.connection.host}\n`, `Database: ${connectionInstance.connection.name}`);
    } catch (error) {
        console.error('E: MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;