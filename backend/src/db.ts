import mongoose from 'mongoose';

const uri: string = 'mongodb://127.0.0.1:27017/rp';

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
