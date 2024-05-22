const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
 require('dotenv').config();
const app = express();
const port = process.env.PORT || 1000;
console.log(port)
// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(`${process.env.mongoDB}/bookdb`, { useNewUrlParser: true, useUnifiedTopology: true });

// Define a Book schema
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  publicationDate: { type: Date, required: true }
});

// Create a Book model
const Book = mongoose.model('Books', bookSchema);

// Create a new book
app.post('/books', async (req, res) => {
    try {
      const { title, author, isbn, publicationDate } = req.body;
  
      if (!title || !author || !isbn || !publicationDate) {
        return res.status(400).send('All fields are required');
      }
  
      const newBook = new Book({ title, author, isbn, publicationDate });
      await newBook.save();
      res.status(201).send(newBook);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  // Get all books
app.get('/books', async (req, res) => {
    try {
      const books = await Book.find();
      res.status(200).send(books);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  // Get a single book by ID
  app.get('/books/:id', async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).send('Book not found');
      }
      res.status(200).send(book);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
// Update a book
app.put('/books/:id', async (req, res) => {
    try {
      const { title, author, isbn, publicationDate } = req.body;
  
      if (!title || !author || !isbn || !publicationDate) {
        return res.status(400).send('All fields are required');
      }
  
      const book = await Book.findByIdAndUpdate(
        req.params.id,
        { title, author, isbn, publicationDate },
        { new: true, runValidators: true }
      );
  
      if (!book) {
        return res.status(404).send('Book not found');
      }
  
      res.status(200).send(book);// Delete a book
      app.delete('/books/:id', async (req, res) => {
        try {
          const book = await Book.findByIdAndDelete(req.params.id);
          if (!book) {
            return res.status(404).send('Book not found');
          }
          res.status(200).send('Book deleted successfully');
        } catch (error) {
          res.status(500).send(error.message);
        }
      });
      
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
    
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
