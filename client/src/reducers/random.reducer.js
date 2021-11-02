import { GET_RANDOM_POST } from "../actions/post.actions";

const initialState = [];

export default function randomReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RANDOM_POST:
      return action.payload;
    default:
      return state;
  }
}
