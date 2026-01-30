export const upload = {
  image : (e) => {
    try {
      const file = e.target.files?.[0];
      
      if (!file) {
        return null;
      }

      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        e.target.value = ''
        return null;
      }

      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        alert('File size must be less than 5MB.')
        e.target.value = ''
        return null;
      }

      const imageUrl = URL.createObjectURL(file);
      
      e.target.value = ''

      return {
        url: imageUrl,
        contentLength: file.size,
        contentType: file.type,
        file: file
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('An error occurred while uploading the image.');
      e.target.value = ''
      return null
    }
  }
}