import express from 'express';
import { PORT, mongoDbUrl } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoutes.js';
import cors from 'cors';
// mongoose is popular object data modelling library for mongodb

const app = express();
app.use(express.json());

// allow all origins to access server
app.use(cors());

// allowing custom origins
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
// }));

// http method to get resource from server
app.get('/', (req, res) => {
    return res.status(200).send('welcome to mern');
});

app.use('/books', booksRoute);

mongoose
    .connect(mongoDbUrl)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            console.log(`App is listening on ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
