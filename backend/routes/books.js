const express = require('express');
const router = express.Router();
const client = require('../db/cassandra');
const { v4: uuidv4 } = require('uuid');

// GET all books
router.get('/', async (req, res) => {
  const result = await client.execute('SELECT * FROM books');
  res.json(result.rows);
});

// POST new book
router.post('/', async (req, res) => {
  const { title, author, published_year, genre } = req.body;
  const id = uuidv4();
  await client.execute(
    'INSERT INTO books (id, title, author, published_year, genre) VALUES (?, ?, ?, ?, ?)',
    [id, title, author, published_year, genre],
    { prepare: true }
  );
  res.json({ id });
});

// PUT update book
router.put('/:id', async (req, res) => {
  const { title, author, published_year, genre } = req.body;
  const { id } = req.params;
  await client.execute(
    'UPDATE books SET title = ?, author = ?, published_year = ?, genre = ? WHERE id = ?',
    [title, author, published_year, genre, id],
    { prepare: true }
  );
  res.sendStatus(200);
});

// DELETE book
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await client.execute('DELETE FROM books WHERE id = ?', [id], { prepare: true });
  res.sendStatus(200);
});

module.exports = router;

