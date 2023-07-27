import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { MONGO_USER, MONGO_PASSWORD } = process.env;

const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@localhost:27017/?authMechanism=DEFAULT`;



mongoose.connect(uri);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to database");
  } catch (error) {
    console.error(error);
  }
};

export default connectToDatabase;
