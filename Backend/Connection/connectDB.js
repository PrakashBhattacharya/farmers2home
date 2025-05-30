const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        // Use local MongoDB connection string
        await mongoose.connect('mongodb://localhost:27017/farmers2home');
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1); // Exit process with failure code
    }
}
module.exports = connectDB;

