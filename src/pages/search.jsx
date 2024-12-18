import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../features/articlesSlice';
import ArticleList from '../components/ArticleList';

const Search = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q'); // Ambil query dari URL
  const dispatch = useDispatch();
  const { articles, status } = useSelector((state) => state.articles);
  const [filteredArticles, setFilteredArticles] = useState([]);

  // Fetch artikel berdasarkan query di URL
  useEffect(() => {
    if (query) {
      dispatch(fetchArticles(query)); 
      document.title = `Search Results for "${query}"`;  
    }
  }, [dispatch, query]);

  // Menyaring artikel berdasarkan query setelah artikel dimuat
  useEffect(() => {
    if (query && articles.length > 0) {
      const filtered = articles.filter((article) =>
        article.headline.main.toLowerCase().includes(query.toLowerCase()) ||
        article.abstract.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredArticles(filtered);
    }
  }, [articles, query]);

  return (
    <div>
      {/* <h1>Search Results for: "{query}"</h1> */}
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : (
        <ArticleList articles={filteredArticles} />
      )}
    </div>
  );
};

export default Search;
