const express = require('express');
const router = express.Router();

// Метод POST для авторизации пользователя
router.post('/login', (req, res) => {
    res.status(201).json({ id: 1, mail: "test@mail.ru" });
  });

  module.exports = router;