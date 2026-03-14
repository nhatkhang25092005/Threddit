export const PINNED_STORY_GRID_ROWS = 2
export const PINNED_STORY_GRID_COLUMNS = 3
export const PINNED_STORY_VISIBLE_CAPACITY = PINNED_STORY_GRID_ROWS * PINNED_STORY_GRID_COLUMNS
export const PINNED_STORY_CARD_WIDTH_PX = 120
export const PINNED_STORY_CARD_GAP_PX = 14

export const EDIT_PINNED_STORY_MODAL_TEXT = {
  title: 'Chỉnh sửa tin nổi bật',
  subtitle: 'Xem nhanh và gỡ các story đang ghim trên trang cá nhân của bạn.',
  helperText: 'Danh sách được hiển thị theo dạng lưới 2 hàng. Dùng nút điều hướng để xem thêm từng story.',
  gridEyebrow: 'Tin đang ghim',
  gridCaption: 'Nhấn dấu X trên từng story để bỏ ghim khỏi hồ sơ.',
  closeAriaLabel: 'Đóng chỉnh sửa tin nổi bật',
  previousAriaLabel: 'Xem story ghim trước đó',
  nextAriaLabel: 'Xem story ghim tiếp theo',
  removeAriaLabel: 'Bỏ ghim tin',
  loadingTitle: 'Đang tải tin nổi bật',
  loadingText: 'Danh sách tin ghim của bạn đang được tải lên để chỉnh sửa.',
  emptyTitle: 'Chưa có tin nổi bật nào',
  emptyText: 'Khi bạn ghim story lên hồ sơ, chúng sẽ xuất hiện tại đây để bạn quản lý dễ hơn.',
  countLabel: (count) => (count > 0 ? `${count} tin đang ghim` : 'Chưa ghim tin nào'),
}
