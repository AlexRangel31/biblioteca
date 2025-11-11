import { useState } from 'react';
import axios from 'axios';

export default function EditBookForm({ book, onClose, onUpdated }) {
  const [form, setForm] = useState({ ...book });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:3000/books/${book.id}`, form)
      .then(() => {
        onUpdated();
        onClose();
      })
      .catch(err => console.error(err));
  };
  return (
    <form onSubmit={handleSubmit} className="p-4 mb-6 border rounded shadow bg-yellow-50">
      <h2 className="text-xl font-bold mb-4">✏️ Editar libro</h2>
      <div className="grid grid-cols-2 gap-4">
        <input name="title" value={form.title} onChange={handleChange} className="p-2 border rounded" required />
        <input name="author" value={form.author} onChange={handleChange} className="p-2 border rounded" required />
        <input name="published_year" value={form.published_year} onChange={handleChange} className="p-2 border rounded" required />
        <input name="genre" value={form.genre} onChange={handleChange} className="p-2 border rounded" required />
      </div>
      <div className="mt-4 flex gap-2">
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Guardar</button>
        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">Cancelar</button>
      </div>
    </form>
  );
}
