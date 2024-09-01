import { createSlice } from '@reduxjs/toolkit';
import { selectSearchTerm } from '../search/search.slice';
import photos from './photos.data.js';

const initialState = {
  photos,
};

const options = {
  name: 'photos',
  initialState,
  reducers: {
    // Task 1: Create an `addPhoto()` case reducer that adds a photo to state.photos. 
    // Task 1 Hint: You can use state.photos.unshift()
    // `unshift()` documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift
    addPhoto(state, action) {
      state.photos.unshift(action.payload) // unshift returns a new list, and immur is in play as well
    },
   
    // Task 6: Create an `removePhoto()` case reducer that removes a photo from state.photos
    // Task 6 Hint: You can use state.photos.splice()
    // `splice()` documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    removePhoto(state, action) {
      const { id, caption } = action.payload;
      const index = state.photos.findIndex(photo => photo.id === id && photo.caption === caption);
      if (index !== -1) {
        state.photos.splice(index, 1);
      }
    }
  },
};

const photosSlice = createSlice(options);

export const { addPhoto, removePhoto } = photosSlice.actions;

export default photosSlice.reducer;

export const selectAllPhotos = (state) => state.photos.photos;
export const selectFilteredPhotos = (state) => {
  // Task 12: Complete `selectFilteredPhotos()` selector to return a filtered list of photos whose captions match the user's search term
  const filtered = selectAllPhotos(state).filter((photo => { return photo.caption.toLowerCase().includes(selectSearchTerm(state).toLowerCase()) }))
  // console.log(`BUT SNATCHER | ${filtered} | SELECTED PHOTOS = ${JSON.stringify(selectAllPhotos(state)filter())} | ${JSON.stringify(state.photos)}`);
  return filtered;
};
