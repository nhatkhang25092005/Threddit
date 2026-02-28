const resetInput = (event) => {
  event.target.value = "";
};

const createUploadHandler = ({
  typePrefix,
  typeErrorMessage,
  maxSize,
  sizeErrorMessage,
  errorLogLabel,
  unknownErrorMessage,
}) => {
  return (event) => {
    try {
      const file = event.target.files?.[0];

      if (!file) {
        return null;
      }

      if (!file.type.startsWith(typePrefix)) {
        alert(typeErrorMessage);
        resetInput(event);
        return null;
      }

      if (file.size > maxSize) {
        alert(sizeErrorMessage);
        resetInput(event);
        return null;
      }

      const fileUrl = URL.createObjectURL(file);
      resetInput(event);

      return {
        url: fileUrl,
        contentLength: file.size,
        contentType: file.type,
        file: file,
      };
    } catch (error) {
      console.error(errorLogLabel, error);
      alert(unknownErrorMessage);
      event.target.value = "";
      return null;
    }
  };
};

export const upload = {
  image: createUploadHandler({
    typePrefix: "image/",
    typeErrorMessage: "Please upload an image file.",
    maxSize: 500 * 1024 * 1024,
    sizeErrorMessage: "File size must be less than 5MB.",
    errorLogLabel: "Error uploading image:",
    unknownErrorMessage: "An error occurred while uploading the image.",
  }),
  video: createUploadHandler({
    typePrefix: "video/",
    typeErrorMessage: "Please upload a video file.",
    maxSize: 500 * 1024 * 1024,
    sizeErrorMessage: "File size must be less than 50MB.",
    errorLogLabel: "Error uploading video:",
    unknownErrorMessage: "An error occurred while uploading the video.",
  }),
  sound: createUploadHandler({
    typePrefix: "audio/",
    typeErrorMessage: "Please upload an audio file.",
    maxSize: 500 * 1024 * 1024,
    sizeErrorMessage: "File size must be less than 200MB.",
    errorLogLabel: "Error uploading audio:",
    unknownErrorMessage: "An error occurred while uploading the audio.",
  }),
};
