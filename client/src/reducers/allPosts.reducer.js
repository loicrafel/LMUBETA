import {
  DELETE_POST,
  GET_PUBLIC_POSTS,
  LIKE_POST,
  PUBLISH,
  UNLIKE_POST,
  VOTE,
} from "../actions/post.actions";

const initialState = [];

export default function allPostsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PUBLIC_POSTS:
      return action.payload;
    case LIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: [action.payload.userId, ...post.likers],
          };
        }
        return post;
      });
    case UNLIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: post.likers.filter((id) => id !== action.payload.userId),
          };
        }
        return post;
      });
    case DELETE_POST:
      return state.filter((post) => post._id !== action.payload.postId);
    case VOTE:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            respId: action.payload.respId,
          };
        }
        return post;
      });
    case PUBLISH:
      return state.filter((post) => post._id !== action.payload.postId);
    default:
      return state;
  }
}
