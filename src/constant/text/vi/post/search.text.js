export const searchText = {
  field: {
    submitAriaLabel: "Gửi tìm kiếm",
    placeholder: "Tìm kiếm...",
    keywordAriaLabel: "Từ khóa tìm kiếm",
    closeAriaLabel: "Đóng tìm kiếm",
    previewEyebrow: "Đang tìm kiếm",
  },
  page: {
    eyebrow: "Tìm kiếm bài viết",
    titleWithQuery: (query) => `Kết quả cho "${query}"`,
    emptyTitle: "Bắt đầu bằng một từ khóa cụ thể",
    promptDescription:
      "Mở slot tìm kiếm ở thanh bên và gửi một từ khóa để xem danh sách bài viết phù hợp.",
    resultsDescription: (count) => `${count} bài viết đang được hiển thị cho từ khóa này.`,
    pendingDescription: "Hệ thống đang truy vấn và sắp xếp kết quả phù hợp nhất.",
    emptyDescription: "Không tìm thấy bài viết phù hợp với từ khóa này.",
    promptMessage: "Nhập từ khóa ở khung tìm kiếm để bắt đầu xem bài viết.",
    noResultMessage: (query) => `Không tìm thấy bài viết phù hợp với "${query}".`,
  },
}
