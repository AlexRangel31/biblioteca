import { useState } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleBookAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 text-gray-800">
      <header className="bg-blue-600 text-white p-6 shadow-md">
        <h1 className="text-3xl font-bold text-center">📚 Biblioteca ICO-29</h1>
        <p className="text-center text-sm mt-1">CRUD completo con React, Tailwind y Cassandra</p>
      </header>
      <main className="max-w-3xl mx-auto mt-8 px-4">
        <BookForm onBookAdded={handleBookAdded} />
        <BookList refreshTrigger={refresh} />
      </main>
    </div>
  );
}

export default App;
