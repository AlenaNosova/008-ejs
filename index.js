const express = require('express');
const app = express();
const port = 3000;
const booksRouter = require('./routes/books');
const userRouter = require('./routes/user');

// Middleware для обработки JSON
app.use(express.json());

// Подключение роутов
app.use('/api/books', booksRouter);
app.use('/api/user', userRouter);

// Роут для скачивания файла книги по id
app.get('/api/books/:id/download', (req, res) => {
    const bookId = req.params.id;
    const book = books.find(book => book.id === bookId);
    if (book) {
      const filePath = `uploads/${book.fileBook}`;
      res.download(filePath, book.fileName, (err) => {
        if (err) {
          res.status(500).json({ error: 'Ошибка загрузки файла' });
        }
      });
    } else {
      res.status(404).json({ error: 'Книга не найдена' });
    }
  });
  
// Обработчик маршрута для несуществующих маршрутов
app.use((req, res) => {
  res.status(404).json({ error: 'Страница не найдена' });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
