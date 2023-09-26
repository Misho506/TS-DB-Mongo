import mongoose from 'mongoose';
import * as dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
  try {
    console.log('------------>', process.env.MONGO_URI);
    // const conn = await mongoose.connect(process.env.MONGO_URI)
    const conn = await mongoose.connect(process.env.MONGO_URI + process.env.MONGO_SAMPLE_GUIDES_DB) //Connect to a specific dabatase
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default connectDB;
 