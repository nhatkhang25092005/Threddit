/**
 * ==================================================
 * BLOCK FEATURE - NỀN MÓNG
 * ==================================================
 * 
 * Cấu trúc:
 * - Block.jsx: Main component hiển thị block feature
 * - BlockProvider.jsx: Provider quản lý state
 * - context.js: Context để chia sẻ state
 * - style.js: Styles cho feature
 * 
 * Store (src/features/block/store/):
 * - type.js: Action types
 * - reducer/: Reducer function
 * - actions/: Action creators
 * - casehandler/: Case handlers
 * - model/: Data models
 * 
 * Services (src/features/block/services/):
 * - api.service.js: API calls
 * - domain.service.js: Business logic
 * 
 * Hooks (src/features/block/hooks/):
 * - useGetBlockList.js: Fetch block list
 * - useBlockUser.js: Block action
 * - useUnblockUser.js: Unblock action
 * - useGetBlockStatus.js: Check block status
 * - useBlockContext.js: Access context
 * 
 * Components (src/features/block/components/):
 * - BlockedList.jsx: Display block list
 * - UnblockButton.jsx: Unblock button
 * - BlockUserButton.jsx: Block button
 * - ContainerForList.jsx: Container wrapper
 * 
 * ==================================================
 * TODO ITEMS / CHƯA RÕ RÀNG:
 * ==================================================
 * 
 * 1. DATA STRUCTURE:
 *    - API response structure từ backend chính xác là gì?
 *    - BlockedUser model có fields nào khác?
 * 
 * 2. FEATURES / FUNCTIONALITY:
 *    - Block feature có tab/view riêng hay tích hợp vào profile?
 *    - Cần infinite scroll pagination?
 *    - Cần search/filter blocked users?
 *    - Có real-time updates (socket.io)?
 * 
 * 3. UI/UX:
 *    - Blocked list layout: card, row, grid?
 *    - Hiển thị avatar, bio, follow status?
 *    - Có action như "view profile" hay chỉ unblock?
 *    - Confirmation dialog trước unblock?
 * 
 * 4. OPTIMIZATION:
 *    - Cần optimistic updates?
 *    - Cần cache management?
 *    - Khi block user -> remove từ follow list?
 *    - Khi unblock -> refresh follow list?
 * 
 * 5. ERROR HANDLING:
 *    - Error state trong store?
 *    - Error boundary?
 *    - Retry strategy chi tiết?
 * 
 * 6. INTEGRATION:
 *    - Cần integrate block button vào user card components?
 *    - Cần integrate check block status vào profile view?
 *    - Cần biểu thị "người này chặn bạn" trên profile?
 * 
 * ==================================================
 */

export { default as Block } from './Block'
export { default as BlockProvider } from './BlockProvider'
export { BlockContext } from './context'
export * as blockStore from './store'
export * as blockServices from './services'
export * as blockHooks from './hooks'
export { style } from './style'
