# Hướng dẫn viết test cho project Threddit

## Quy định đặt file test

Cách đặt tên file test:

```text
<chức năng>.<phân lớp của file>.test.js (Nếu biết dùng TypeScript thì đặt là .ts)
```

Ví dụ:

```text
login.service.test.js
register.hook.test.js
comment.utils.test.js
notification.component.test.js
```

File test phải được tạo ở chính module mà mỗi người đảm nhận. Không tạo file test ở module của người khác hoặc ở thư mục không liên quan.

## Mẫu cây thư mục đặt file test

```text
src/
|-- features/
|   |-- auth/
|   |   |-- login/
|   |   |   `-- login.service.test.js
|   |   |-- register/
|   |   |   `-- register.service.test.js
|   |   `-- forgot/
|   |       `-- forgot.hook.test.js
|   |-- notification/
|   |   |-- hooks/
|   |   |   `-- unreadCount.hook.test.js
|   |   `-- components/
|   |       `-- notification.component.test.js
|   |-- friends/
|   |   |-- hooks/
|   |   |   `-- friendList.hook.test.js
|   |   `-- services/
|   |       `-- friend.service.test.js
|   |-- follow/
|   |   |-- hooks/
|   |   |   `-- follow.hook.test.js
|   |   `-- services.js
|   `-- post/
|       `-- components/
|           |-- search/
|           |   `-- hooks/
|           |       `-- search.hook.test.js
|           |-- comment/
|           |   `-- utils/
|           |       `-- comment.utils.test.js
|           `-- story/
|               `-- StoryCard/
|                   `-- storyCard.utils.test.js
`-- core/
    `-- block/
        |-- hooks/
        |   `-- blockUser.hook.test.js
        `-- services/
            `-- block.service.test.js
```

## Quy định khi làm bài

- Không được sửa trực tiếp mã nguồn.
- Chỉ được sửa file test mà mỗi người đã nhận.
- Nếu phát hiện lỗi trong quá trình chạy mã nguồn hoặc chạy test, hãy báo cáo lại lỗi đó thay vì tự ý sửa source code.
- Khi viết test, ưu tiên đặt file gần file đang được test để dễ kiểm tra và bảo trì.

## Phân công module

### Phạm Minh Dũng

- Auth module path: `src/features/auth`
- Notification module path: `src/features/notification`
- Searching module path: `src/features/post/components/search`

### Uyên Thy

- Friend module path: `src/features/friends`
- Follow module path: `src/features/follow`
- Block module path: `src/core/block`

### Huỳnh Thảo

- Comment module path: `src/features/post/components/comment`
- Story module path: `src/features/post/components/story`

## Cài đặt dependencies

Project đã có sẵn `package.json` và `package-lock.json`, nên chỉ cần chạy:

```powershell
npm install
```

Lệnh này sẽ tự cài đầy đủ dependencies và dev dependencies mà project đang sử dụng, bao gồm React, MUI, Vite, Vitest, Testing Library, jsdom,...

Nếu project chưa có bộ test hoặc bị thiếu package test, cài nhóm package test bằng:

```powershell
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitest/coverage-v8
```

## Chạy test

```powershell
npm run test
```

Chạy test ở chế độ watch:

```powershell
npm run test:watch
```

Chạy test kèm coverage:

```powershell
npm run test:coverage
```
