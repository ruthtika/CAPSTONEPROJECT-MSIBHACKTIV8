import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      navigate(`/search?q=${searchTerm}`);  // Navigasi ke halaman pencarian dengan query di URL
    } else {
      alert('Please enter a search term!');
    }
  };

  return (
    <nav>
      <div className="navbar-left">
        <ul>
          <li><a href="/">Indonesia</a></li>
          <li><a href="/programming">Programming</a></li>
          <li><a href="/covid">COVID</a></li>
          <li><a href="/saved">Saved</a></li>
        </ul>
      </div>
      <div className="navbar-right">
        <input
          type="text"
          placeholder="Search news..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}><b>Search</b></button>
      </div>
    </nav>
  );
};

export default Navbar;
