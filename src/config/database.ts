import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.DB_URI as string);
        console.log('D: DB connected successfully\n', `Host: ${connectionInstance.connection.host}\n`, `Database: ${connectionInstance.connection.name}`);
    } catch (error) {
        console.error('E: DB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;