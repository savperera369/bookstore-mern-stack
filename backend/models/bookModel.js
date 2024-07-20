import mongoose from "mongoose";

// every schema maps to a collection, defines shape of objects in collections
const bookSchema = mongoose.Schema(
    // fields object
    {
        title: {
            type: String,
            required: true,
        }, 
        author: {
            type: String,
            required: true,
        }, 
        publishYear: {
            type: Number,
            required: true,
        },
    }, {
        timestamps: true
    }
);

export const Book = mongoose.model('Book', bookSchema);