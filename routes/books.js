const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');

// Пример начальных данных о книгах
let books = [
    {
      id: "1",
      title: "Book 1",
      description: "Description 1",
      authors: "Author 1",
      favorite: "Favorite 1",
      fileCover: "File Cover 1",
      fileName: "File Name 1"
    },
    {
      id: "2",
      title: "Book 2",
      description: "Description 2",
      authors: "Author 2",
      favorite: "Favorite 2",
      fileCover: "File Cover 2",
      fileName: "File Name 2"
    }
  ];

// Метод GET для получения всех книг
router.get('/', (req, res) => {
    res.json(books);
  });
  
  // Метод GET для получения книги по ID
  router.get('/:id', (req, res) => {
    const bookId = req.params.id;
    const book = books.find(book => book.id === bookId);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ error: 'Книга не найдена' });
    }
  });
  
  // Метод POST для создания книги (обновлен с middleware)
  router.post('/', upload.single('fileBook'), (req, res) => {
      const { id, title, description, authors, favorite, fileCover, fileName} = req.body;
      const fileBook = req.file;
      const newBook = {
          id,
          title,
          description,
          authors,
          favorite,
          fileName,
          fileBook: fileBook.filename
      }
      
      books.push(newBook);
      res.json(newBook);
  });
  
  // Метод PUT для редактирования книги по ID
  router.put('/:id', (req, res) => {
    const bookId = req.params.id;
    const updatedBook = req.body;
    const index = books.findIndex(book => book.id === bookId);
    if (index !== -1) {
      books[index] = { ...books[index], ...updatedBook };
      res.json(books[index]);
    } else {
      res.status(404).json({ error: 'Книга не найдена' });
    }
  });
  
  // Метод DELETE для удаления книги по ID
  router.delete('/:id', (req, res) => {
    const bookId = req.params.id;
    const index = books.findIndex(book => book.id === bookId);
    if (index !== -1) {
        books.splice(index, 1);
        res.json({ message: 'ok' });
    } else {
        res.status(404).json({ error: 'Книга не найдена' });
    }
  });

  module.exports = router;
  
