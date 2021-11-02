import { combineReducers } from "redux";
import usersReducer from "./users.reducer";
import postReducer from "./post.reducer";
import allPostsReducer from "./allPosts.reducer";
import errorReducer from "./error.reducer";
import authReducer from "./auth.reducer";
import randomReducer from "./random.reducer";

export default combineReducers({
  usersReducer,
  postReducer,
  allPostsReducer,
  errorReducer,
  authReducer,
  randomReducer,
});
