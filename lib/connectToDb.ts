import mongoose from "mongoose";

const connectToDb = async () => {
    let isConnected = false;

    if (isConnected) {
        console.log("Already connected to MongoDB");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log("Connected to MongoDB");
        isConnected = true;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
  
export default connectToDb;