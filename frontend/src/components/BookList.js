import axios from 'axios';
import { useEffect, useState } from 'react';
import EditBookForm from './EditBookForm';

export default function BookList({ refreshTrigger }) {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  const fetchBooks = () => {
    axios.get('http://localhost:3000/books')
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchBooks();
  }, [refreshTrigger]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/books/${id}`)
      .then(() => fetchBooks())
      .catch(err => console.error(err));
  };

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const handleUpdated = () => {
    fetchBooks();
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">📖 Libros registrados</h2>

      {editingBook && (
        <EditBookForm
          book={editingBook}
          onClose={() => setEditingBook(null)}
          onUpdated={handleUpdated}
        />
      )}
      <ul className="space-y-4">
        {books.map(book => (
          <li key={book.id} className="bg-white border border-gray-300 p-4 rounded-lg shadow hover:shadow-lg transition">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-sm text-gray-600">{book.author} ({book.published_year})</p>
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">{book.genre}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(book)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
