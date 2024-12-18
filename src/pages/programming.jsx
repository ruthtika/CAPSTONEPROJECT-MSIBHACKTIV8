import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles, saveArticle } from '../features/articlesSlice';
import ArticleList from '../components/ArticleList';

const Programming = () => {
  const dispatch = useDispatch();
  const { articles, status } = useSelector((state) => state.articles);  // Pastikan nama state sesuai

  useEffect(() => {
    dispatch(fetchArticles('Programming'));  // Panggil fetchArticles dengan query yang sesuai
  }, [dispatch]);

  return (
    <div>
      <h1 className="news-title">Programming News</h1>
      <div className="article-list">
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && (
        <ArticleList articles={articles} onSave={(article) => dispatch(saveArticle(article))} />
      )}
      </div>
    </div>
  );
};

export default Programming;
