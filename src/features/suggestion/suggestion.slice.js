import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSuggestion =
  createAsyncThunk(/* Task 15: Complete the `createAsyncThunk()` function to load a suggestion from this URL: http://localhost:3004/api/suggestion */
    'suggestions/fetchSuggestion',
    async (arg, thunkAPI) => {
      const response = await fetch("http://localhost:3004/api/suggestion");
      // Normally I would try catch all of this and right here check the response status but
      // I think thunk basically handles that under the hood and provides those pending/fulfilled/rejected apis/methods/actions??? not exactly sure how to think of them just yet.
      const { data } = await response.json(); 
      return data;
    }
  );

const initialState = {
  suggestion: '',
  loading: false,
  error: true,
};

const options = {
  name: 'suggestion',
  initialState,
  reducers: {},
  extraReducers: {
    /* Task 16: Inside `extraReducers`, add reducers to handle all three promise lifecycle states - pending, fulfilled, and rejected - for the `fetchSuggestion()` call */
    [fetchSuggestion.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [fetchSuggestion.fulfilled]: (state, { payload: { imageUrl, caption } }) => {
      state.suggestion = { imageUrl, caption };
      state.loading = false;
      state.error = false;
    },
    [fetchSuggestion.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
  },
};

const suggestionSlice = createSlice(options);

export default suggestionSlice.reducer;

// Task 17: Create a selector, called `selectSuggestion`, for the `suggestion` state variable and export it from the file
export const selectSuggestion = (state) => state.suggestion.suggestion;
export const selectLoading = (state) => state.suggestion.loading;
export const selectError = (state) => state.suggestion.error;
