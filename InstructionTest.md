# Hướng dẫn viết Vitest cho Threddit

Tài liệu này dùng để chuyển phần mô tả hệ thống thành hướng dẫn viết test. Mục tiêu là mỗi người đọc được module mình phụ trách, biết nên test file nào, test những trường hợp nào và chạy test ra sao.

## 1. Nguyên tắc chung

- Chỉ viết hoặc sửa file test trong module được phân công.
- Không sửa trực tiếp mã nguồn để test pass. Nếu phát hiện lỗi ở source code, ghi lại lỗi và báo cáo.
- Đặt file test cùng thư mục hoặc gần file đang được test.
- Tên file test theo mẫu:

```text
<chức năng>.<phân lớp của file>.test.js
```

Nếu file gốc dùng TypeScript thì có thể đặt:

```text
<chức năng>.<phân lớp của file>.test.ts
```

Ví dụ:

```text
login.service.test.ts
register.hook.test.ts
comment.utils.test.ts
notification.component.test.jsx
```

Mỗi chức năng nên có tối thiểu các nhóm case sau:

- Case thành công: dữ liệu hợp lệ, API hoặc hàm xử lý trả về đúng kết quả.
- Case dữ liệu không hợp lệ: thiếu input, sai định dạng, mật khẩu không khớp, nội dung rỗng,...
- Case lỗi từ API/hệ thống: API reject, trả lỗi 401/404/500, không có quyền, dữ liệu không tồn tại.
- Case biên nếu có: danh sách rỗng, media không có, nhiều cấp bình luận, token hết hạn,...

## 2. Cách chọn loại test

### Test service

Dùng cho các file gọi API hoặc xử lý nghiệp vụ trước khi gọi API, ví dụ `login.service.ts`, `register.service.ts`, `services.js`.

Nên test:

- Hàm có gọi đúng API với payload đúng không.
- Khi input sai thì không gọi API.
- Khi API thành công thì trả result đúng.
- Khi API lỗi thì trả message hoặc trạng thái lỗi đúng.

Thường dùng:

```js
vi.mock(...)
vi.mocked(...)
mockResolvedValueOnce(...)
mockRejectedValueOnce(...)
```

### Test hook

Dùng cho các file `useSomething`.

Nên test:

- State ban đầu.
- State sau khi gọi action trong hook.
- Có gọi service/context/notify/navigate đúng không.
- Trường hợp loading, success, error.

Thường dùng `renderHook`, `act` từ Testing Library.

### Test component

Dùng cho các file giao diện `.jsx`, `.tsx`.

Nên test:

- Render đúng nội dung chính.
- Người dùng nhập/click thì gọi đúng handler.
- Hiển thị loading/empty/error state.
- Hiển thị dữ liệu sau khi mock hook/service.

Không cần test quá sâu style MUI. Chỉ cần kiểm tra hành vi người dùng thấy được.

### Test utils/reducer/actions

Dùng cho hàm thuần, reducer hoặc action.

Nên test:

- Input nào tạo output/state nào.
- Không mutate state cũ nếu reducer cần immutable.
- Trường hợp input rỗng/null/undefined nếu hàm có xử lý.

## 3. Cài đặt và chạy test

Cài dependencies:

```powershell
npm install
```

Chạy toàn bộ test:

```powershell
npm run test
```

Chạy một file test cụ thể:

```powershell
npx vitest run src/features/auth/register/register.test.ts
```

Chạy watch mode:

```powershell
npm run test:watch
```

Project đã cấu hình Vitest trong `vite.config.js` với:

- `environment: "jsdom"`
- `setupFiles: "./src/test/setup.ts"`
- `globals: true`

## 4. Module path cần chú ý

# Cấu trúc chức năng dự án

| 🧩 Nhóm chức năng    | 📂 Path chính                          |
| -------------------- | -------------------------------------- |
| 🔐 Auth              | `src/features/auth`                    |
| 👤 Account           | `src/features/account`                 |
| 📝 Bài viết          | `src/features/post`                    |
| 📖 Tin / Story       | `src/features/post/components/story`   |
| 💬 Bình luận         | `src/features/post/components/comment` |
| 👥 Bạn bè            | `src/features/friends`                 |
| ➕ Theo dõi           | `src/features/follow`                  |
| 🚫 Chặn              | `src/core/block`                       |
| 🔔 Thông báo         | `src/features/notification`            |
| 📰 Feed              | `src/features/post/components/feed`    |
| 🎬 Thước phim / Reel | `src/features/post/components/reel`    |
| 🌐 Đổi ngôn ngữ      | `src/constant/text/runtime`            |
| 🔍 Tìm kiếm          | `src/features/post/components/search`  |


## 5. Phân công theo README

### Phạm Minh Dũng

Module phụ trách:

- Auth: `src/features/auth`
- Notification: `src/features/notification`
- Searching: `src/features/post/components/search`

### Uyên Thy

Module phụ trách:

- Friend: `src/features/friends`
- Follow: `src/features/follow`
- Block: `src/core/block`

### Huỳnh Thảo

Module phụ trách:

- Comment: `src/features/post/components/comment`
- Story: `src/features/post/components/story`

Các nhóm như Account, Bài viết, Feed, Reel, Đổi ngôn ngữ nếu được giao thêm thì dùng path ở mục 4.

## 6. Gợi ý test case theo nhóm chức năng

### 6.1. Auth

Path: `src/features/auth`

Nên ưu tiên test service và hook trước, component sau.

Đăng nhập:

- Thành công khi email và mật khẩu hợp lệ.
- Không gọi API khi email sai định dạng hoặc mật khẩu rỗng.
- Trả lỗi khi API báo sai email/mật khẩu.
- Sau khi thành công có lưu trạng thái đăng nhập hoặc trả data user/token đúng theo logic hiện có.

Đăng kí:

- Thành công với đầy đủ thông tin hợp lệ.
- Lỗi khi thiếu email, username, display name, ngày sinh hoặc giới tính.
- Lỗi khi email sai định dạng.
- Lỗi khi mật khẩu không đúng rule hoặc xác nhận mật khẩu không khớp.
- Lỗi khi API báo email/username đã tồn tại.

Gửi yêu cầu đặt lại mật khẩu:

- Thành công khi email hợp lệ.
- Không gọi API khi email sai định dạng.
- Trả lỗi khi API báo email không tồn tại.

Xác thực đặt lại mật khẩu:

- Thành công khi token/mã xác thực và mật khẩu mới hợp lệ.
- Lỗi khi token/mã xác thực rỗng hoặc sai.
- Lỗi khi mật khẩu mới và xác nhận mật khẩu không khớp.
- Trả lỗi khi API báo token hết hạn.

Đăng xuất:

- Thành công thì gọi API/logout handler đúng.
- Sau khi logout thì xóa trạng thái đăng nhập theo logic hiện có.
- Nếu logout lỗi thì trả hoặc hiển thị lỗi phù hợp.

### 6.2. Account

Path: `src/features/account`

Xem thông tin tài khoản:

- Thành công thì trả/hiển thị thông tin tài khoản.
- Lỗi khi API trả unauthorized hoặc không tải được dữ liệu.
- Loading và empty state nếu component có hỗ trợ.

Đổi tên hiển thị:

- Thành công khi tên hợp lệ.
- Lỗi khi tên rỗng hoặc quá ngắn/quá dài nếu có validate.
- Lỗi khi API reject.

Đổi mật khẩu:

- Thành công khi mật khẩu hiện tại, mật khẩu mới và xác nhận hợp lệ.
- Lỗi khi mật khẩu mới không đúng rule.
- Lỗi khi xác nhận mật khẩu không khớp.
- Lỗi khi API báo mật khẩu hiện tại sai.

Yêu cầu xóa tài khoản:

- Thành công khi email hợp lệ.
- Lỗi khi email rỗng/sai định dạng.
- Lỗi khi API reject.

Xác thực xóa tài khoản:

- Thành công khi mã xác thực hợp lệ.
- Lỗi khi mã rỗng/sai/hết hạn.
- Sau khi xóa thành công thì xử lý đăng xuất hoặc điều hướng theo logic hiện có.

Chỉnh sửa thông tin cơ bản:

- Thành công khi cập nhật giới tính, ngày sinh, học vấn, mối quan hệ hợp lệ.
- Lỗi khi dữ liệu không hợp lệ.
- Lỗi khi API reject.

### 6.3. Bài viết

Path: `src/features/post`

Tạo bài viết:

- Thành công khi có nội dung hợp lệ.
- Thành công khi có nội dung kèm hình ảnh/video.
- Lỗi khi nội dung rỗng và không có media, nếu hệ thống không cho phép.
- Lỗi khi upload hoặc API tạo bài viết thất bại.

Chỉnh sửa bài viết:

- Thành công khi cập nhật nội dung/media hợp lệ.
- Lỗi khi bài viết không tồn tại hoặc không có quyền sửa.
- Lỗi khi API reject.

Thả cảm xúc bài viết:

- Thành công khi chọn loại cảm xúc.
- Đổi cảm xúc cũ sang cảm xúc mới đúng.
- Lỗi khi API reject.

Chia sẻ bài viết:

- Thành công khi chia sẻ không có nội dung bổ sung.
- Thành công khi chia sẻ có nội dung bổ sung.
- Lỗi khi bài viết gốc không tồn tại hoặc API reject.

Lưu/hủy lưu bài viết:

- Lưu thành công thì trạng thái saved đổi đúng.
- Hủy lưu thành công thì trạng thái saved đổi đúng.
- Lỗi khi API reject.

Xóa bài viết:

- Thành công khi người dùng là chủ bài viết.
- Lỗi khi không có quyền hoặc API reject.

Ghim bài viết:

- Thành công khi ghim một bài viết.
- Khi ghim bài mới thì bài cũ không còn được ghim nếu logic có hỗ trợ.
- Lỗi khi API reject.

Bình luận bài viết:

- Thành công khi nội dung bình luận hợp lệ.
- Lỗi khi nội dung rỗng và không có media.
- Lỗi khi API reject.

### 6.4. Tin/Story

Path: `src/features/post/components/story`

Tạo tin:

- Thành công khi có nội dung hoặc một media hợp lệ.
- Lỗi khi vượt quá số lượng media cho phép.
- Lỗi khi upload/API thất bại.

Chỉnh sửa tin:

- Thành công khi cập nhật nội dung/media.
- Lỗi khi tin không tồn tại hoặc không có quyền sửa.

Xóa tin:

- Thành công khi người dùng là chủ tin.
- Lỗi khi API reject.

Tin nổi bật:

- Thêm tin vào danh sách nổi bật thành công.
- Xóa tin khỏi danh sách nổi bật thành công.
- Lỗi khi tin không tồn tại hoặc API reject.

Xem danh sách tin:

- Hiển thị danh sách tin khi có dữ liệu.
- Hiển thị empty state khi danh sách rỗng.
- Hiển thị lỗi khi tải danh sách thất bại.

Xem tin của bạn bè:

- Hiển thị tin của bạn bè.
- Không hiển thị tin khi API trả danh sách rỗng.
- Hiển thị lỗi khi API reject.

### 6.5. Bình luận

Path: `src/features/post/components/comment`

Tạo bình luận:

- Thành công khi có nội dung hợp lệ.
- Thành công khi có media hợp lệ.
- Lỗi khi nội dung rỗng và không có media.
- Lỗi khi API reject.

Trả lời bình luận:

- Thành công khi trả lời một bình luận.
- Hỗ trợ dữ liệu trả lời lồng nhau nhiều cấp nếu utils có xử lý tree.
- Lỗi khi bình luận cha không tồn tại hoặc API reject.

Xem danh sách bình luận:

- Hiển thị danh sách bình luận.
- Hiển thị empty state khi chưa có bình luận.
- Sắp xếp hoặc build cây bình luận đúng nếu có utils tương ứng.
- Hiển thị lỗi khi tải danh sách thất bại.

Bày tỏ cảm xúc bình luận:

- Thành công khi chọn cảm xúc.
- Đổi/hủy cảm xúc đúng theo logic hiện có.
- Lỗi khi API reject.

Chỉnh sửa bình luận:

- Thành công khi cập nhật nội dung/media.
- Lỗi khi không có quyền sửa hoặc API reject.

Xóa bình luận:

- Thành công khi xóa bình luận.
- Lỗi khi không có quyền hoặc API reject.

### 6.6. Bạn bè

Path: `src/features/friends`

Xem danh sách bạn bè:

- Hiển thị danh sách bạn bè khi API thành công.
- Hiển thị empty state khi không có bạn bè.
- Hiển thị lỗi khi tải danh sách thất bại.

Gửi lời mời kết bạn:

- Thành công khi gửi lời mời tới user hợp lệ.
- Lỗi khi gửi cho chính mình, đã là bạn bè hoặc API reject.

Chấp nhận lời mời kết bạn:

- Thành công khi chấp nhận request hợp lệ.
- Sau khi chấp nhận thì request được xóa khỏi danh sách chờ nếu reducer/hook có xử lý.
- Lỗi khi request không tồn tại hoặc API reject.

Từ chối lời mời kết bạn:

- Thành công khi từ chối request hợp lệ.
- Sau khi từ chối thì request được xóa khỏi danh sách chờ nếu reducer/hook có xử lý.
- Lỗi khi API reject.

Xóa bạn bè:

- Thành công khi xóa một bạn bè.
- Danh sách bạn bè cập nhật đúng sau khi xóa.
- Lỗi khi API reject.

Nhắc bạn bè:

- Tìm/gợi ý bạn bè đúng theo keyword nếu có utils/hook.
- Chèn mention đúng định dạng.
- Lỗi hoặc danh sách rỗng khi không tìm thấy bạn bè.

### 6.7. Theo dõi

Path: `src/features/follow`

Theo dõi người khác:

- Thành công khi follow user hợp lệ.
- Trạng thái follower/following cập nhật đúng nếu reducer/hook có xử lý.
- Lỗi khi follow chính mình, user không tồn tại hoặc API reject.

Hủy theo dõi:

- Thành công khi unfollow user đang theo dõi.
- Trạng thái cập nhật đúng sau khi unfollow.
- Lỗi khi API reject.

Xem danh sách theo dõi:

- Hiển thị danh sách followers.
- Hiển thị danh sách followings.
- Hiển thị empty state khi danh sách rỗng.
- Hiển thị lỗi khi tải danh sách thất bại.

### 6.8. Chặn

Path: `src/core/block`

Chặn người dùng:

- Thành công khi block user hợp lệ.
- User bị chặn được thêm vào danh sách block nếu store có xử lý.
- Lỗi khi block chính mình, user không tồn tại hoặc API reject.

Gỡ chặn:

- Thành công khi unblock user đã bị chặn.
- User được xóa khỏi danh sách block nếu store có xử lý.
- Lỗi khi API reject.

Xem danh sách chặn:

- Hiển thị danh sách user đã chặn.
- Hiển thị empty state khi danh sách rỗng.
- Hiển thị lỗi khi tải danh sách thất bại.

Điều hướng khi bị chặn:

- `useCanNavigateToUser` hoặc utils liên quan trả đúng khi được phép/không được phép.
- `extractUsernameFromUrl` xử lý đúng URL hợp lệ, URL thiếu username và URL rỗng.

### 6.9. Thông báo

Path: `src/features/notification`

Xem toàn bộ thông báo:

- Hiển thị danh sách thông báo khi tải thành công.
- Hiển thị empty state khi không có thông báo.
- Hiển thị lỗi khi API reject.

Xem thông báo mới/chưa đọc:

- Trả đúng danh sách unread.
- Đếm unread đúng nếu test `useUnreadCount`.
- Lỗi khi API reject.

Đọc nhanh tất cả:

- Thành công thì tất cả thông báo chuyển sang đã đọc.
- Lỗi khi API reject.

Xóa thông báo:

- Thành công thì thông báo bị xóa khỏi danh sách.
- Lỗi khi API reject.

Điều hướng đến nguồn thông báo:

- Điều hướng đúng tới bài viết, tin, bình luận hoặc profile theo loại thông báo.
- Không điều hướng và báo lỗi nếu thông báo thiếu dữ liệu nguồn.

Gửi thông báo:

- Khi người đang theo dõi đăng bài, tạo notification đúng payload nếu có service/hàm xử lý.
- Khi có lời mời kết bạn, comment, mention hoặc bạn bè tạo nội dung mới, notification được build đúng loại.
- Lỗi khi API reject.

### 6.10. Thao tác hệ thống

Feed path: `src/features/post/components/feed`

Xem feed:

- Hiển thị danh sách bài viết/tin khi tải thành công.
- Hiển thị loading trong lúc tải.
- Hiển thị empty state khi không có nội dung.
- Hiển thị lỗi khi API reject.

Reel path: `src/features/post/components/reel`

Xem thước phim:

- Hiển thị danh sách reel khi tải thành công.
- Chuyển reel trước/sau đúng nếu có hook navigation.
- Tạm dừng/phát video đúng nếu test playback hook.
- Hiển thị empty/error state.

Đổi ngôn ngữ path: `src/constant/text/runtime`

Đổi ngôn ngữ:

- Trả text tiếng Việt khi locale là `vi`.
- Trả text tiếng Anh khi locale là `en`.
- Fallback đúng khi thiếu key hoặc locale không hợp lệ.

### 6.11. Tìm kiếm

Path: `src/features/post/components/search`

Tìm kiếm người dùng và bài viết:

- Thành công khi nhập keyword hợp lệ.
- Gọi API/service với keyword đúng.
- Hiển thị user results và post results nếu có dữ liệu.
- Hiển thị empty state khi không có kết quả.
- Không gọi API khi keyword rỗng nếu logic hiện có yêu cầu.
- Hiển thị lỗi khi API reject.
- Test debounce/dismiss/recommend nếu hook có xử lý riêng.

## 7. Mẫu test service tham khảo

```ts
import { beforeEach, describe, expect, it, vi } from "vitest";
import { someService } from "./some.service";
import { someApi } from "@/api/some.api";

vi.mock("@/api/some.api", () => ({
  someApi: {
    create: vi.fn(),
  },
}));

const mockedCreate = vi.mocked(someApi.create);

describe("someService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return validation error when input is invalid", async () => {
    const result = await someService({ content: "" });

    expect(mockedCreate).not.toHaveBeenCalled();
    expect(result.success).toBe(false);
  });

  it("should return success when api is success", async () => {
    mockedCreate.mockResolvedValueOnce({
      data: { message: "ok", data: { id: 1 } },
    });

    const result = await someService({ content: "hello" });

    expect(mockedCreate).toHaveBeenCalledOnce();
    expect(result.success).toBe(true);
  });

  it("should return error when api is failed", async () => {
    mockedCreate.mockRejectedValueOnce({
      response: { data: { message: "Something went wrong" } },
    });

    const result = await someService({ content: "hello" });

    expect(mockedCreate).toHaveBeenCalledOnce();
    expect(result.success).toBe(false);
  });
});
```

## 8. Mẫu checklist trước khi nộp

- File test nằm đúng module được giao.
- Tên file đúng format.
- Có ít nhất success case và failure case.
- Có mock API/service thay vì gọi thật backend.
- Chạy được file test riêng bằng `npx vitest run <path-file-test>`.
- Không sửa source code để ép test pass.
- Nếu test fail do bug source code, ghi lại lỗi, input gây lỗi và kết quả mong đợi.

