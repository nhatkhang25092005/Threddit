export const story = {
  createStoryModal: {
    loadingDuration: "Đang đọc...",
    modeLabel: {
      empty: "Đang trống",
      text: "Văn bản",
      image: "Hình ảnh",
      video: "Video",
      sound: "Âm thanh",
      image_text: "Hình ảnh + văn bản",
      video_text: "Video + văn bản",
      sound_text: "Văn bản + âm thanh",
    },
    header: {
      title: "Tạo tin",
      subtitle: "Có thể tải lên tối đa 1 file ảnh, video hoặc âm thanh",
      closeAriaLabel: "Đóng modal tạo tin",
    },
    mediaButtons: {
      status: {
        active: "Đang chọn",
        disabled: "Khóa",
        add: "Thêm",
      },
      actions: {
        image: {
          label: "Thêm ảnh",
          removeLabel: "Xóa ảnh",
          caption: "Chọn 1 ảnh từ máy tính",
        },
        video: {
          label: "Thêm video",
          removeLabel: "Xóa video",
          caption: "Chọn 1 video từ máy tính",
        },
        sound: {
          label: "Thêm âm thanh",
          removeLabel: "Xóa âm thanh",
          caption: "Chọn 1 đoạn âm thanh từ máy tính",
        },
      },
    },
    preview: {
      eyebrow: "Bản xem trước",
      playbackPrefix: (durationLabel) => `Phát ${durationLabel}`,
      playLabel: "Phát story",
      pauseLabel: "Tạm dừng story",
      progressLabel: "Thanh tiến trình story",
      imageAlt: "Story image preview",
      placeholder: "Bắt đầu bằng văn bản hoặc thêm 1 file để xem bố cục tin.",
      soundCanvasTitle: "Story âm thanh",
      descriptionLabel: "Văn bản",
      defaultAudioTitle: "Audio story",
      soundAutoplayCaption: (durationLabel) => `Tự phát nền ${durationLabel}.`,
    },
    formPanel: {
      content: {
        title: "Chỉnh sửa tin",
        textareaPlaceholder: "Nhập văn bản, gõ @ để tag bạn bè...",
        mentionButton: "Tag bạn bè",
        emojiButton: "Chèn emoji",
      },
      media: {
        eyebrow: "Media",
      },
      fileSummary: {
        defaultTitle: "Local file",
        unknownType: "Không rõ định dạng",
        staticSourceDuration: (seconds) => `${seconds}s cố định`,
        durationCaption: (durationLabel) => `Thời lượng ${durationLabel}`,
        staticCaption: "Story sẽ phát 5s",
      },
      footer: {
        closeButton: "Đóng",
        submitButton: "Đăng tin",
      },
    },
  },
};
