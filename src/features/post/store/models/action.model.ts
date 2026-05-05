import type { ClassType, ActionMap, Action } from "../type"
export const createAction = <
  C extends ClassType & keyof ActionMap,
  T
>(
  actionClass: C,
  type: ActionMap[C],
  payload: T
):Action<C, T> => {
  const action:Action<C, T> = { actionClass, type }

  if (payload !== undefined) {
    action.payload = payload
  }

  return action
}
