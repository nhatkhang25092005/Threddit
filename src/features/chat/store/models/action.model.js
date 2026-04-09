export const createAction = (actionClass, type, payload) => {
  const action = { actionClass, type };

  if (payload !== undefined) {
    action.payload = payload;
  }

  return action;
};
