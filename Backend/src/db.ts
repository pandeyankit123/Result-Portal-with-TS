import mongoose from 'mongoose';
require('dotenv').config();

const uri: string = process.env.MONGO_URI!;

const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', (error as Error).message);
    process.exit(1);
  }
};

export default connectToDatabase;