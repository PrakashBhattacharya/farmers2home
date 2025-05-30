const mongoose = require('mongoose')
require('dotenv').config();
const connectDB = async () => {
    try {
        // Use local MongoDB connection string
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1); // Exit process with failure code
    }
}
module.exports = connectDB;

