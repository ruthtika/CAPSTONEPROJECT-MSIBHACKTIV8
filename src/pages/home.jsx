import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles, saveArticle, removeSavedArticle } from '../features/articlesSlice';
import ArticleList from '../components/ArticleList';

const Home = () => {
  const dispatch = useDispatch();
  const { articles, saved, status } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchArticles('Indonesia'));
  }, [dispatch]);

  return (
    <div>
      <h1 className="news-title">News</h1>
      <div className="article-list">
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : (
        <ArticleList 
          articles={articles} 
          savedArticles={saved} 
          onSave={(article) => dispatch(saveArticle(article))} // Kirimkan fungsi save
          onRemove={(article) => dispatch(removeSavedArticle(article))}
          isSaved={false} // Menandakan artikel ini belum disimpan
        />
      )}
      </div>
    </div>
  );
};

export default Home;
