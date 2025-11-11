import { useState } from 'react';
import axios from 'axios';

export default function BookForm({ onBookAdded }) {
  const [form, setForm] = useState({
    title: '',
    author: '',
    published_year: '',
    genre: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:3000/books', form)
      .then(() => {
        setForm({ title: '', author: '', published_year: '', genre: '' });
        onBookAdded();
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-bold mb-4">➕ Agregar nuevo libro</h2>
      <div className="grid grid-cols-2 gap-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Título" className="p-2 border rounded" required />
        <input name="author" value={form.author} onChange={handleChange} placeholder="Autor" className="p-2 border rounded" required />
        <input name="published_year" value={form.published_year} onChange={handleChange} placeholder="Año" className="p-2 border rounded" required />
        <input name="genre" value={form.genre} onChange={handleChange} placeholder="Género" className="p-2 border rounded" required />
      </div>
      <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Guardar</button>
    </form>
  );
}
