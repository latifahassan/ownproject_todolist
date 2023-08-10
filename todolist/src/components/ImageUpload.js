import React from 'react';
import supabase from '../supabaseClient';

export default function ImageUpload() {
  const [image, setImage] = React.useState(null);

  function handleImage(e) {
    setImage(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Check if an image is selected
    if (!image) {
      console.error('No image selected');
      return;
    }

    // Create a FormData object to send the image
    const formData = new FormData();
    formData.append('image', image);

    // Upload the image to Supabase storage
    try {
      const { data, error } = await supabase.storage
        .from('images')
        .upload(`images/${image.name}`, formData);

      if (error) {
        console.error('Error uploading image:', error);
      } else {
        console.log('Image uploaded successfully:', data);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" onChange={handleImage} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}