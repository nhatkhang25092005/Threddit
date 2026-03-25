import { friendListActions } from '../store/actions'

export const domain = {
	createFriendListSync: (dispatch) => {
		return {
			appendFriend(requester) {
				dispatch(friendListActions.addFriend(requester))
			},

			deleteFriend(username) {
				dispatch(friendListActions.removeFriend(username))
			}
		}
	}
}
