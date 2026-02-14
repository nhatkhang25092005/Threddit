import { friendListActions } from '../store/actions'
import { createFriend } from '../store/model/friend.model'

export const domain = {
	createFriendListSync: (dispatch) => {
		return {
			appendFriend(requester) {
				dispatch(friendListActions.addFriend(createFriend(requester)))
			},

			deleteFriend(username) {
				dispatch(friendListActions.removeFriend(username))
			}
		}
	}
}

