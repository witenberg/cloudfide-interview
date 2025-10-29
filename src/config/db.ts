import mongoose from "mongoose";

const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/cloudfide-interview";

    if (!mongoURI) {
        throw new Error("MONGO_URI is not set");
    }

    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

export default connectDB;