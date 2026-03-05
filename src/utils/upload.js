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
  return (event, multiple = false) => {
    try {
      const files = Array.from(event.target.files || []);

      if (!files.length) {
        return null;
      }

      const filesToUpload = multiple ? files : [files[0]];

      for (const file of filesToUpload) {
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
      }

      const uploadedFiles = filesToUpload.map((file) => ({
        url: URL.createObjectURL(file),
        contentLength: file.size,
        contentType: file.type,
        file: file,
      }));

      resetInput(event);

      if (multiple) {
        return uploadedFiles;
      }

      return uploadedFiles[0] || null;
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
