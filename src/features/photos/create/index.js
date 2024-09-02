import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPhoto } from '../photos.slice';

// Task 2: Import the `useDispatch()` method from the appropriate package
// Task 3: Import the `addPhoto()` action creator from the photos slice

import './create.css';

export default function CreatePhoto() {
  const [formData, setFormData] = useState({ imageUrl: '', caption: '' });
  // Task 4: Store a reference to the Redux store's dispatch method in a variable called `dispatch`
  const dispatch = useDispatch();

  function handleChange({ target: { name, value } }) {
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function validateFormData(formData) {
    if (!formData) {
      return false
    }

    try {
      const response = await fetch(formData.imageUrl, {
        method: 'HEAD'
      });
      if (response.ok) { return true }
    } catch {
      console.log(`Something went wrong, check url: ${formData.imageUrl}`)
      return false
    }
  }

  function handleSubmit(event) {
    if (validateFormData(formData)) {
      event.preventDefault();
      // Task 5: Dispatch the `addPhoto()` action creator, passing in the form data
      dispatch(addPhoto(formData)) // I think some redux magic includes the state everytime an action is dispatched.
      setFormData({ imageUrl: '', caption: '' });
    } else {
      const msg = "Form validation failed. Please check the form data and try again."
      console.log(msg);
      throw new Error(msg);
    }
  }

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <h2>Add a dog</h2>
      <div>
        <label htmlFor="url">Enter your image's url: </label>
        <input
          id="url"
          name="imageUrl"
          onChange={handleChange}
          placeholder="e.g., https://images.dog.ceo/breeds/australian-shepherd/pepper.jpg"
          type="text"
          value={formData.imageUrl}
        />
      </div>
      <div>
        <label htmlFor="caption">Enter your image's caption: </label>
        <input
          id="caption"
          name="caption"
          onChange={handleChange}
          placeholder="e.g., Australian Shepherd"
          type="text"
          value={formData.caption}
        />
      </div>
      <input type="submit" />
    </form>
  );
}
