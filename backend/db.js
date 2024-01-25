const mongoose = require("mongoose");

// Uncomment and replace with your actual connection string
mongoose.connect("mongodb+srv://percyx:spaceadventure29@cluster0.snu0frv.mongodb.net/todoos");

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
});

const todo = mongoose.model('todos', todoSchema);

// Additional connection handling
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('connected', () => {
    console.log('Connected to MongoDB');
});

db.once('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log('MongoDB connection closed through app termination');
        process.exit(0);
    });
});

module.exports = {
    todo
};
