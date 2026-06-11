# Hướng dẫn viết Vitest cho luồng dữ liệu Threddit

Tài liệu này dùng để viết test cho cách dữ liệu được validate, map, gọi API, normalize, dispatch vào reducer/store, và đồng bộ giữa các module. Không dùng tài liệu này để viết test giao diện.

Mục tiêu là người viết test đọc được module mình phụ trách, biết dữ liệu nằm ở đâu, được xử lý qua những lớp nào, và biết cách mock dữ liệu theo shape thật của module thay vì chỉ mock mỗi field đang assert.

## 1. Phạm vi test

- Chỉ viết hoặc sửa file test trong module được phân công.
- Không sửa source code để ép test pass. Nếu phát hiện lỗi source, ghi lại input, output hiện tại và output mong đợi.
- Không viết test giao diện/component: không test render text, click nút, style, layout, icon, MUI, `screen`, DOM query.
- Nếu logic đang nằm trong component, ưu tiên test hook, service, reducer, model, mapper hoặc utils mà component đang dùng.
- Đặt file test gần file cần test.
- Tên file test nên theo lớp xử lý dữ liệu:

```text
<chuc-nang>.<layer>.test.js
<chuc-nang>.<layer>.test.jsx
<chuc-nang>.<layer>.test.ts
<chuc-nang>.<layer>.test.tsx
```

Ví dụ nên dùng:

```text
login.service.test.ts
register.validate.test.ts
postById.model.test.js
post.reducer.test.ts
commentTree.utils.test.ts
search.hook.test.jsx
notification.reducer.test.js
block.service.test.js
```

Ví dụ không nên tạo mới:

```text
notification.component.test.jsx
postCard.component.test.jsx
login.page.test.tsx
```

Mỗi chức năng nên có ít nhất:

- Case thành công với dữ liệu hợp lệ.
- Case input không hợp lệ hoặc thiếu dữ liệu bắt buộc.
- Case API/hệ thống trả lỗi.
- Case biên của luồng dữ liệu: danh sách rỗng, cursor/hasMore hết dữ liệu, dữ liệu trùng lặp, null/undefined, reaction đã tồn tại, comment nhiều cấp, loading/retry/abort nếu module có xử lý.

## 2. Chọn lớp để test

### Test validate/mapper/model/utils

Dùng cho các file validate form, map payload, normalize response, format, build tree, resolve id/type, tính toán state cục bộ.

Nên test:

- Raw input được chuyển thành output đúng shape.
- Field optional có fallback đúng.
- Null/undefined/sai type không làm crash.
- List/tree nested được merge, add, remove, update đúng.
- Hàm không mutate input cũ nếu logic yêu cầu immutable.

### Test service

Dùng cho các file `*.service.*` hoặc `services.js`.

Nên test:

- Validate trước khi gọi API.
- Mapper tạo payload đúng.
- Gọi đúng API với tham số/cursor/signal/payload đúng.
- Response thành công được map thành result đúng.
- Response lỗi, reject, 401/404/500, network error được map thành result lỗi đúng.
- Nếu service gọi nhiều API, test thứ tự và cách tổng hợp kết quả.

Thường mock:

```js
vi.mock(...)
vi.mocked(...)
mockResolvedValueOnce(...)
mockRejectedValueOnce(...)
```

### Test hook xử lý dữ liệu

Dùng cho hook `useSomething` khi hook nối service với dispatch/context/notify/router.

Không test DOM. Chỉ test giá trị trả về, service đã gọi, dispatch đã bắn action nào, loading/retry/abort/pendingRef xử lý ra sao.

Nên test:

- State/action ban đầu nếu hook có trả về state.
- Submit/fetch/action thành công dispatch đúng action và trả data đúng.
- Service lỗi thì không dispatch success, có gọi notify lỗi nếu hook có logic đó.
- Loading bật/tắt đúng thứ tự.
- Abort request cũ, retry backoff, debounce, duplicate guard, hasMore guard nếu hook có.

Có thể dùng `renderHook`, `act`, `vi.useFakeTimers`, wrapper context nếu cần. Vẫn không render component giao diện.

### Test reducer/action/casehandler/store

Dùng cho `reducer`, `actions`, `casehandler`, `handlers`, `initState`, `selectors`.

Nên test:

- Action creator tạo đúng `type`, `classType`/`actionClass`, `payload`.
- Reducer biến đổi state đúng với action.
- State cũ không bị mutate.
- Loading global/item/per-user/per-request cập nhật đúng.
- Normalized store cập nhật đúng: `byId` lưu object, list chỉ lưu id, hasMore/cursor đúng.
- Remove cascade đúng với comment con, room/post/story/comment id liên quan.

### Test API helper

Dùng cho `src/api/helper/*` và API wrapper khi cần.

Nên test:

- `mapResponse` lấy đúng `message`, `status`, `data`, `success`.
- `mapErrResponse` phân loại abort, network, client, server error đúng.
- `handleRequest` trả `{ success, message, data }` khi API thành công và trả shape lỗi khi reject.
- API wrapper build đúng URL, method, params, payload nếu có mock axios.

## 3. Bản đồ dữ liệu trong dự án

Bảng này dựa trên cấu trúc hiện tại của project. Khi viết test, hãy đọc đúng file trong module trước, vì một số module có pattern riêng.

| Module | Nơi dữ liệu/API vào | Nơi xử lý nghiệp vụ | Nơi giữ/cập nhật state | Nơi nên ưu tiên test |
| --- | --- | --- | --- | --- |
| API helper | `src/api/axios.js`, `src/api/helper` | `handleRequest`, `mapResponse`, `mapErrResponse`, `getErrMessage` | Không có store | helper test, API wrapper test |
| Auth | `src/api/auth/auth.api.ts`, `src/api/auth/auth.mapper.ts` | `src/features/auth/*/*.service.ts`, `validate.ts`, `types/*` | `src/core/auth/AuthProvider.jsx`, hook `useLogin`, `useRegister`, `useVerify`, `useVerifyAccount` | validate, mapper, service, hook |
| Account | `src/api/account/account.api.js`, `account.map.js` | `src/features/account/account.service.js`, `validate.js` | `src/features/account/info/reducer.js`, `actions.js`, hooks info/delete/update password | service, reducer, hook |
| Profile | `src/api/profile/profile.api.js`, `profile.map.js` | `src/features/profile/services.js` | `src/features/profile/reducer.js`, `actions.js`, provider/hooks | mapper upload, service, reducer, hook |
| Post/content | `src/api/content/post`, `story`, `comments`, `reaction`, `storage` | `src/features/post/services`, `src/features/post/utils` | `src/features/post/store`: `initState`, `reducer`, `actions`, `casehanlders`, `models`, `selectors` | model, casehandler, reducer, service, hook |
| Feed | `postService.getFeed` | `src/features/post/hooks/post/useGetFeed.js` | `contentList.home.feeds`, `postById`, `feedHasMore`, loading | hook, combine action, feed handler |
| Search | `postService.search`, `profileApi.search_profile` | `src/features/post/hooks/post/useSearch.js`, `components/search/hooks` | `contentList.searchList`, `searchUsers`, `searchKeyword`, `searchHasMore`, `searchUsersHasMore` | search service, hook, debounce utils |
| Comment | `commentApi`, `commentService` | `src/features/post/hooks/comment`, `components/comment/utils`, `CommentBlock/hooks` | `commentById`, `commentList`, `subCommentList`, item loading | comment model, tree utils, comment handlers, hooks |
| Story | `storyApi`, `storyService` | `hooks/story`, `components/story/*/utils` | `storyById`, `storyList`, `currentStory`, `friendStories`, pinned story state | story model, hook, handler, utils |
| Reel | `postService.getReel` | `components/reel/hooks`, `components/reel/utils` | `contentList.reel`, `reelHasMore`, loading | reel hook/utils, hasMore/duplicate logic |
| Friends | `src/api/friend/friend.api.js` | `src/features/friends/services/api.service.js`, `domain.service.js` | `src/features/friends/store`: lists, counts, hasMore, loading global/perFriend/perRequest | service, reducer/casehandler, hooks |
| Follow | `src/api/follow/follow.api.js` | `src/features/follow/services.js` | `src/features/follow/reducer.js`, `actions.js`, `handlers`, provider/hooks | reducer/handler, hook, service |
| Block | `src/api/block/block.api.js` | `src/core/block/services`, `utils/extractUsernameFromUrl.js` | `src/core/block/store`: blockList, hasMore, loading global/perBlock | service, reducer, hook, utils |
| Notification | `src/api/notification/notification.api.js` | `src/features/notification/services.js`, `notification.utils.js` | `src/features/notification/reducer.js`, `actions.js`, provider/hooks | reducer, hook, service, utils |
| Chat | `src/api/chat/chat.api.js` | `src/features/chat/services.js`, hooks | `src/features/chat/store`: `roomById`, `roomList`, `directRoomByUser`, hasMore/loading | model/action/handler, hook, service |
| Text/runtime | `src/constant/text/runtime`, `src/constant/text/source`, `src/constant/text/vi`, `en` | locale registry/hook | Không có store riêng | runtime/fallback logic |
| Common hooks/utils | `src/hooks`, `src/utils`, `src/model` | validate, format, retry, mention, event bus, action model | Tùy file | pure utils/hook data behavior |

## 4. Lưu ý luồng dữ liệu theo module

### Auth

Luồng chính: form -> `validate.ts` -> mapper trong `api/auth/auth.mapper.ts` -> `authApi` -> `mapResponse`/`mapErrResponse` -> service result -> hook cập nhật auth/notify/navigate.

Can test:

- `loginService`, `registerService`, `forgot.service`, `verify.service`, `verifyAccount.service`.
- Validate email/password/otp/repass.
- Mapper payload: `display_name` thành `displayName`, `date_of_birth` thành `dateOfBirth`, otp thành string.
- Hook chỉ cần assert service được gọi, helperText/result/notify/auth action đúng; không test form UI.

### Account và Profile

Account quản lý thông tin tài khoản, mật khẩu, xóa tài khoản, logout. Profile quản lý profile public, avatar/background, bio, follow/friend counters.

Can test:

- `account.service.js`: validate update password, map update/delete payload, request/verify/logout success/failure.
- `info/reducer.js`: `SET_ACCOUNT_DATA`, loading get/update username.
- `profile.map.js`: presign/confirm/avatar/background/update profile chỉ gửi field có giá trị.
- `profile/reducer.js`: set profile đầy đủ field, cache-busting avatar/background, counters follow/friend không giảm dưới 0.
- Hook upload: presign thành công, upload S3 lỗi, confirm lỗi.

### Post, Feed, Search, Reel

Store post normalize dữ liệu theo `postById`, `storyById`, `commentById`; các list trong `contentList` chủ yếu lưu id. Đây là điểm cần test kỹ.

Can test:

- `postByIdModel`, `storyByIdModel`, `commentModel`, `mediaModel`: raw API -> normalized object.
- `casehanlders`: add/set timeline id, dedupe id, update reaction/save/share/pin, remove post/story/comment, set loading/hasMore.
- `useGetFeed`, `useGetReel`, `useGetPostList`, `useGetSavedPost`: cursor/hasMore, duplicate batch, loading, abort.
- `useSearch` và search recommend: keyword trim, reset khi keyword rỗng, scope `all/content/users`, cursor profile/content riêng, duplicate user/post, debounce.
- `reel.utils`: media type, primary media, handle username/count.

### Comment

Comment có hai kiểu dữ liệu cần phân biệt:

- Normalized store: `commentById`, `commentList[postId]`, `subCommentList[parentCommentId]`.
- Tree cho logic: `CommentNode` trong `commentTree.utils.ts`.

Can test:

- Tạo comment root và reply: payload text/media/mention/uploadSessionId, dispatch add comment id vào đúng list.
- Xóa comment cha phải xóa cả nhánh con trong `commentById`, `commentList`, `subCommentList`, loading item.
- `addCommentToTree`, `removeCommentFromTree`, `editCommentInTree`, `updateCommentReactionInTree`, `mergeCommentPage`, `findCommentByIdInTree`.
- Reaction comment tăng/giảm đúng khi thêm, đổi, hủy reaction.

### Friends, Follow, Block

Ba module này có nhiều đồng bộ chéo với profile/orchestrate.

Can test:

- Friends: request/accept/reject/cancel/delete friend cập nhật list, count, loading `perRequest`/`perFriend`, `hasMore`.
- Friends domain sync: `createFriendListSync` dispatch add/remove đúng.
- Follow: `followerList`, `followingList`, `canFollow`, `hasMore`, reset, loading. Lưu ý follow action dùng `classType`, không phải `actionClass`.
- Block: block/unblock/get status/get list, retry với `shouldRetry`, loading `global` và `perBlock.cancelBlock`, sync add/remove blocked user.
- `extractUsernameFromUrl`: absolute URL, relative URL, query/hash, URL rỗng/sai type.

### Notification

Notification có state riêng cho all/unread/count/loading.

Can test:

- Reducer: append all/unread, read one, delete one, read all, increment/decrement unread count, realtime notification.
- Hook: fetch all/unread/unreadCount với cursor, abort, retry, loading; API lỗi không append data.
- Utils: `resolveNotificationItem`, `resolveNotificationList`, message theo `target.type`, fallback khi thiếu template/actor.
- Không viết test render notification item.

### Chat

Chat normalize phòng chat vào `roomById`, list id trong `roomList`, và map phòng chat trực tiếp theo user trong `directRoomByUser`.

Can test:

- `getChatRooms`: set/append mode, cursor, hasMore, loading bật/tắt.
- `getDirectChatRoom`: lưu room vào `roomById` và `directRoomByUser`.
- Handler/action: dedupe room id, prepend/remove, update room.

## 5. Nguyên tắc viết dữ liệu giả lập

Khi mock data, hãy xây dựng object gần với shape thật của module. Không chỉ viết mỗi field đang test nếu object thật có nhiều prop quan trọng.

Quy tắc:

- Tạo factory cho mỗi loại dữ liệu: `makeUser`, `makePostRaw`, `makePostModel`, `makeComment`, `makeNotification`, `makeFriend`, `makeRoom`.
- Factory phải có default hợp lệ và đầy đủ prop thường dùng. Mỗi test chỉ override field cần thay đổi.
- Phân biệt raw API data và normalized model data.
- Nếu test service/API helper, mock response theo shape Axios: `{ status, statusText, config, data: { message, data } }`.
- Nếu test reducer/model, mock data theo shape mà reducer/model thật sự nhận.
- Thêm đủ field liên quan đến id, timestamp, author, viewer, stats, media, mentioned users, cursor, hasMore, loading.
- Nếu model có dùng `Date.now()` để thêm `?t=...` hoặc tạo id local, dùng `vi.spyOn(Date, "now")` hoặc fake timers để test ổn định.
- Dùng data rỗng/null/sai type trong case riêng, không trộn với data hợp lệ mặc định.

Ví dụ factory nên dùng:

```ts
const makeUser = (overrides = {}) => ({
  username: "murad",
  displayName: "Murad",
  avatarUrl: "https://cdn.example.com/avatar.png",
  ...overrides,
});

const makeMedia = (overrides = {}) => ({
  id: 10,
  type: "image",
  contentType: "image/png",
  contentLength: 1024,
  name: "image.png",
  url: "https://cdn.example.com/image.png",
  sortOrder: 0,
  ...overrides,
});

const makePostRaw = (overrides = {}) => ({
  id: 1,
  contentId: 1,
  type: "post",
  text: "Hello Threddit",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  isPinned: false,
  isOwner: true,
  author: makeUser(),
  sharer: null,
  mentionedUsers: ["thy"],
  mediaFiles: [makeMedia()],
  commentNumber: 2,
  saveNumber: 1,
  shareNumber: 0,
  reactionNumber: 3,
  isSaved: false,
  reaction: null,
  isShare: false,
  isShared: false,
  shareMessage: null,
  sharedPost: null,
  shareId: null,
  ...overrides,
});
```

Ví dụ không nên dùng nếu đang test post/model/reducer:

```ts
const post = { id: 1 };
```

Ví dụ notification nên có đủ target:

```ts
const makeNotification = (overrides = {}) => ({
  id: 1,
  isRead: false,
  createdAt: "2026-01-01T00:00:00.000Z",
  target: {
    type: "comment",
    actorUsername: "murad",
    actorDisplayName: "Murad",
    contentId: 99,
    commentId: 100,
  },
  ...overrides,
});
```

## 6. Mẫu test service

```ts
import { beforeEach, describe, expect, it, vi } from "vitest";
import { loginService } from "./login.service";
import { authApi } from "../../../api/auth/auth.api";
import { getbaseinfo } from "./getbaseinfo.service";

vi.mock("../../../api/auth/auth.api", () => ({
  authApi: {
    login: vi.fn(),
  },
}));

vi.mock("./getbaseinfo.service", () => ({
  getbaseinfo: vi.fn(),
}));

const makeAxiosResponse = (data, status = 200) => ({
  status,
  statusText: status === 200 ? "OK" : "Error",
  config: { method: "post" },
  data: {
    message: "success",
    data,
  },
});

describe("loginService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns validation error and does not call api when form is invalid", async () => {
    const result = await loginService({
      email: "wrong-email",
      password: "",
    });

    expect(authApi.login).not.toHaveBeenCalled();
    expect(result.kind).toBe("validation_error");
  });

  it("calls api with mapped payload when form is valid", async () => {
    vi.mocked(authApi.login).mockResolvedValueOnce(
      makeAxiosResponse({ accessToken: "token" })
    );
    vi.mocked(getbaseinfo).mockResolvedValueOnce({
      is_success: true,
      success: true,
      message: "success",
      data: {
        username: "murad",
        displayName: "Murad",
        avatarUrl: "https://cdn.example.com/avatar.png",
      },
    });

    const result = await loginService({
      email: "user@example.com",
      password: "Password123!",
    });

    expect(authApi.login).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "Password123!",
    });
    expect(result.kind).toBe("success");
  });
});
```

Hãy điều chỉnh sample theo service thật của module. Nếu service có gọi thêm API khác, mock đầy đủ API đó.

## 7. Mẫu test reducer/model

```ts
import { describe, expect, it } from "vitest";
import { reducer } from "../reducer/reducer";
import { initState } from "../reducer/initState";
import { postByIdActions } from "../actions";
import { postByIdModel } from "../models/postById.model";

describe("post reducer", () => {
  it("adds normalized post by id without mutating previous state", () => {
    const previous = initState;
    const post = postByIdModel(makePostRaw({ id: 11, contentId: 11 }));

    const next = reducer(previous, postByIdActions.addPost(post));

    expect(next.postById[11]).toEqual(post);
    expect(previous.postById[11]).toBeUndefined();
    expect(next).not.toBe(previous);
  });
});
```

## 8. Mẫu test hook data flow

```ts
import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useGetFeed } from "./useGetFeed";
import { postService } from "../../services";

vi.mock("../../services", () => ({
  postService: {
    getFeed: vi.fn(),
  },
}));

vi.mock("../../../../hooks/useNotify", () => ({
  useNotify: () => ({
    withLoading: (task, setLoading) => {
      setLoading?.(true);
      return task().finally(() => setLoading?.(false));
    },
    popup: vi.fn(),
  }),
}));

describe("useGetFeed", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("dispatches normalized feed data when request succeeds", async () => {
    const dispatch = vi.fn();
    vi.mocked(postService.getFeed).mockResolvedValueOnce({
      success: true,
      message: "success",
      data: {
        feedItems: [makePostRaw({ id: 1, contentId: 1 })],
        hasMore: true,
      },
    });

    const { result } = renderHook(() => useGetFeed(dispatch, undefined, []));

    await act(async () => {
      await result.current();
    });

    expect(dispatch).toHaveBeenCalled();
    expect(postService.getFeed).toHaveBeenCalledOnce();
  });
});
```

Hook test chỉ cần kiểm tra luồng dữ liệu, action, service, loading, retry/abort. Không render component.

## 9. Chạy test

Cài dependencies:

```powershell
npm install
```

Chạy toàn bộ test:

```powershell
npm run test
```

Chạy watch mode:

```powershell
npm run test:watch
```

Chạy coverage:

```powershell
npm run test:coverage
```

Chạy một file:

```powershell
npx vitest run src/features/post/components/comment/utils/commentTree.utils.test.ts
```

Project đã cấu hình Vitest trong `vite.config.js`:

- `environment: "jsdom"`
- `setupFiles: "./src/test/setup.ts"`
- `globals: true`
- alias `@` trỏ đến `src`

## 10. Phân công module

### Phạm Minh Dũng

- Auth: `src/features/auth`
- Notification: `src/features/notification`
- Searching: `src/features/post/components/search`, liên quan thêm `src/features/post/hooks/post/useSearch.js`

### Uyên Thy

- Friend: `src/features/friends`
- Follow: `src/features/follow`
- Block: `src/core/block`

### Huỳnh Thảo

- Comment: `src/features/post/components/comment`, liên quan thêm `src/features/post/hooks/comment` và `src/features/post/store/casehanlders/comment.handlers.ts`
- Story: `src/features/post/components/story`, liên quan thêm `src/features/post/hooks/story`, `story.service.js`, `storyById.model.js`

Nếu được giao thêm Account, Profile, Post, Feed, Reel, Chat hoặc Text runtime thì dùng bản đồ dữ liệu ở mục 3.

## 11. Checklist trước khi nộp

- File test nằm đúng module được giao.
- Test tập trung vào data flow, không test UI/render/click/style.
- Có success case và failure case.
- Có case input invalid/null/empty nếu module có xử lý.
- Có mock API/service thay vì gọi backend thật.
- Fake data đủ prop theo shape thật của module; field cần thay đổi được override qua factory.
- Phân biệt raw API response và normalized model/state.
- Có assert action/state/result quan trọng, không chỉ assert "function called".
- Nếu có timer/debounce/retry, dùng fake timers và cleanup.
- Chạy được file test riêng bằng `npx vitest run <path-file-test>`.
- Nếu test fail do bug source code, ghi lại bug, input gây lỗi và kết quả mong đợi.
