const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
            serverSelectionTimeoutMS: 50000, // Increase timeout to 50 seconds
            socketTimeoutMS: 45000,         // Set socket timeout to 45 seconds
        });
    //console.log('Connecting to MongoDB at:', process.env.MONGODB_URI);

    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
