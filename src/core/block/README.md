# Block Feature - Documentation

## Cấu Trúc Thư Mục

```
src/features/block/
├── Block.jsx                 # Main component
├── BlockProvider.jsx         # State provider
├── context.js               # Context API
├── style.js                 # Styles
├── index.js                 # Entry point / Documentation
│
├── store/                   # State Management
│   ├── type.js             # Action types
│   ├── actions/            # Action creators
│   │   └── index.js
│   ├── reducer/            # Reducer functions
│   │   └── index.js
│   ├── casehandler/        # Case handlers
│   │   └── index.js
│   └── model/              # Data models
│       └── block.model.js
│
├── services/               # Business Logic
│   ├── api.service.js      # API calls
│   ├── domain.service.js   # Domain logic
│   └── index.js
│
├── hooks/                  # Custom Hooks
│   ├── useGetBlockList.js
│   ├── useBlockUser.js
│   ├── useUnblockUser.js
│   ├── useGetBlockStatus.js
│   ├── useBlockContext.js
│   └── index.js
│
└── components/             # UI Components
    ├── BlockedList.jsx
    ├── UnblockButton.jsx
    ├── BlockUserButton.jsx
    ├── ContainerForList.jsx
    └── index.js
```

## Sử Dụng

### 1. Setup Provider
```jsx
import BlockProvider from '@features/block/BlockProvider'

function App() {
  return (
    <BlockProvider>
      {/* Your app */}
    </BlockProvider>
  )
}
```

### 2. Sử dụng trong Component
```jsx
import { useBlockContext } from '@features/block/hooks'

function MyComponent() {
  const { state, actions } = useBlockContext()
  
  // Fetch block list
  useEffect(() => {
    actions.getBlockList()
  }, [])
  
  // Block user
  const handleBlock = (username) => {
    actions.blockUser(username)
  }
  
  // Unblock user
  const handleUnblock = (username) => {
    actions.unblockUser(username)
  }
}
```

## API Được Sử Dụng

- `getBlockList()` - Lấy danh sách người bị block
- `blockUser(username)` - Chặn user
- `unblockUser(username)` - Gỡ chặn user
- `getBlockStatus(username)` - Kiểm tra block status

## ⚠️ TODO / Chưa Rõ Ràng

### Data Structure
- [ ] API response structure chính xác từ backend
- [ ] BlockedUser model có fields nào khác (blockedAt, reason, etc.)

### Features
- [ ] Block feature integrate ở đâu trong app?
- [ ] Cần infinite scroll pagination?
- [ ] Cần search/filter blocked users?
- [ ] Có real-time updates (Socket.io)?

### UI/UX
- [ ] Layout: card, row, hay grid?
- [ ] Hiển thị avatar, bio không?
- [ ] Có action khác ngoài unblock?
- [ ] Confirmation dialog trước unblock?

### Business Logic
- [ ] Khi block user -> remove từ follow list?
- [ ] Khi unblock -> refresh follow list?
- [ ] Optimistic updates?
- [ ] Cache management strategy?

### Integration
- [ ] Block button integrate vào user card?
- [ ] Check block status vào profile view?
- [ ] Biểu thị "người này chặn bạn"?
- [ ] Notification khi bị block?

### Error Handling
- [ ] Error state trong store?
- [ ] Error boundary?
- [ ] Retry strategy chi tiết?

## Ghi Chú

- Cấu trúc được xây dựng theo pattern của friend feature
- Sử dụng async/await với error mapping
- Có retry mechanism với exponential backoff
- Dùng axios.CancelToken để cancel request cũ
