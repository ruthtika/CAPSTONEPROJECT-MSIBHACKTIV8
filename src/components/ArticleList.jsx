import React from 'react';
import { useDispatch } from 'react-redux';
import { saveArticle, removeSavedArticle } from '../features/articlesSlice';

const ArticleList = ({ articles, isSaved }) => {
  const dispatch = useDispatch();

  const handleSave = (article) => {
    dispatch(saveArticle(article));
  };

  const handleRemove = (article) => {
    dispatch(removeSavedArticle(article));
  };

  if (!articles || articles.length === 0) {
    return <p>No articles found.</p>;
  }

  return (
    <div className="article-list">
      {articles.map((article) => {
        const imageUrl =
          article.multimedia && article.multimedia.length > 0
            ? `https://www.nytimes.com/${article.multimedia[0].url}`
            : 'https://via.placeholder.com/300x200'; // Placeholder jika tidak ada gambar
        return (
          <div key={article._id} className="article">
            <img src={imageUrl} alt={article.headline.main} className="article-image" />
            <h2>{article.headline.main}</h2>
            <p>{article.abstract}</p>
            <div className="article-buttons">
              <button
                onClick={() => window.open(article.web_url, '_blank')}
                className="read-more-button"
              >
                <b>Read More</b>
              </button>
              {isSaved ? (
                <button
                  onClick={() => handleRemove(article)}
                  className="save-button"
                >
                  Remove
                </button>
              ) : (
                <button
                  onClick={() => handleSave(article)}
                  className="save-button"
                >
                  <b>Save</b>
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ArticleList;
