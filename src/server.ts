import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/db";

dotenv.config();

const startServer = async () => {
    try {
        await connectDB();
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running on port ${process.env.PORT || 3000}`);
        });
    }
    catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
}

startServer();