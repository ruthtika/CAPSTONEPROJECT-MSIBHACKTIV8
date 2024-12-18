import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}?q=${query}&api-key=${API_KEY}`);
      return response.data.response.docs.map((article) => ({
        ...article,
        multimedia: article.multimedia || [],
      }));
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    saved: JSON.parse(localStorage.getItem('savedArticles')) || [],  // Ambil dari localStorage
    status: 'idle',
    error: null,
  },
  reducers: {
    saveArticle: (state, action) => {
      const articleExists = state.saved.some((article) => article._id === action.payload._id);
      if (!articleExists) {
        state.saved.push(action.payload);
        // Simpan artikel yang disimpan ke localStorage
        localStorage.setItem('savedArticles', JSON.stringify(state.saved));
      }
    },
    removeSavedArticle: (state, action) => {
      state.saved = state.saved.filter((article) => article._id !== action.payload._id);
      // Perbarui localStorage setelah artikel dihapus
      localStorage.setItem('savedArticles', JSON.stringify(state.saved));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch articles';
      });
  },
});

export const { saveArticle, removeSavedArticle } = articlesSlice.actions;
export default articlesSlice.reducer;
