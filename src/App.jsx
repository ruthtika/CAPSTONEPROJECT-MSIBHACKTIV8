import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import Programming from './pages/programming';
import Covid19 from './pages/Covid19';
import Saved from './pages/saved';
import Search from './pages/search';


const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/programming" element={<Programming />} />
      <Route path="/saved" element={<Saved />} />
      <Route path="/covid" element={<Covid19 />} />
      <Route path="/search" element={<Search />} /> {/* Halaman pencarian */}
    </Routes>
  </Router>
);

export default App;
