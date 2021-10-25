import { DELETE_USER } from "../actions/user.actions";
import { GET_USERS } from "../actions/users.actions";

const initialState = [];

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.payload;
    case DELETE_USER:
      return state.filter((uid) => uid._id !== action.payload._id);
    default:
      return state;
  }
}
