import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeSavedArticle } from '../features/articlesSlice';

const Saved = () => {
  const savedArticles = useSelector((state) => state.articles.saved);
  const dispatch = useDispatch();

  const handleRemove = (article) => {
    dispatch(removeSavedArticle(article));
  };

  if (savedArticles.length === 0) {
    return <p>No saved articles yet.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Source</th>
          <th>Title</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {savedArticles.map((article) => (
          <tr key={article._id}>
            <td>{article.source}</td>
            <td>
              <a href={article.web_url} target="_blank" rel="noopener noreferrer">
                {article.headline.main}
              </a>
            </td>
            <td>{article.snippet}</td>
            <td>
              <button className="remove-button" onClick={() => handleRemove(article)}>Remove</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Saved;
