import express from 'express';
import { Book } from '../models/bookModel.js';
// using express router for code splitting
const router = express.Router();

// route to save a new book
router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({ message: "Send all required fields."})
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }

        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

// route to get all books from database
router.get('/', async (req, res) => {
    try {
        // get list of all books from database
        const books = await Book.find({});
        return res.status(200).json(books);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

// route to get one books from database
router.get('/:bookId', async (req, res) => {
    try {
        // get list of all books from database
        const { bookId } = req.params;
        const book = await Book.findById(bookId);
        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

// route to update a book
router.put('/:bookId', async(req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({ message: "Send all required fields."})
        }

        const { bookId } = req.params;

        const result = await Book.findByIdAndUpdate(bookId, req.body);

        if(!result) {
            return res.status(404).send({ message: "Book not found" });
        }

        return res.status(200).send({ message: "book updated successfully"});
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

// route for deleting a book
router.delete("/:bookId", async(req, res) => {
    try {
        const { bookId } = req.params;
        const result = await Book.findByIdAndDelete(bookId);

        if (!result){
            return res.status(404).send({ message: "Book not found" });
        }

        return res.status(200).send({ message: "Book deleted successfully "});
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

export default router;