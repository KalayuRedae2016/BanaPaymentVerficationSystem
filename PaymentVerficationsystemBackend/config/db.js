const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
            serverSelectionTimeoutMS: 50000, // Increase timeout to 50 seconds
        });
         console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
