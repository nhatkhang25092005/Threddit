export const createPerRequestLoading = () => ({
  // These actions are identified by friendshipId in API calls → separate per-request loading state
  accept_request: false,
  reject_request: false,
  cancel_request: false,
})
