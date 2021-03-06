import axios from "axios";

// posts

export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const GET_PUBLIC_POSTS = "GET_PUBLIC_POSTS";
export const CREATE_POST = "CREATE_POST";
export const GET_POST = "GET_POST";
export const GET_RANDOM_POST = "GET_RANDOM_POST";
export const ADD_POST = "ADD_POST";
export const ADD_RESPONSE = "ADD_RESPONSE";
export const DELETE_POST = "DELETE_POST";
export const VOTE = "VOTE";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const PUBLISH = "PUBLISH";
export const GET_ERRORS = "GET_ERRORS";
export const CLOSE = "CLOSE";

export const getPost = (uid) => {
  return (dispatch) => {
    return axios
      .get(`api/post/getall/${uid}`)
      .then((res) => {
        dispatch({ type: GET_POST, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const getPosts = (num) => {
  return (dispatch) => {
    return axios
      .get(`api/post/`)
      .then((res) => {
        const array = res.data.slice(0, num);
        dispatch({ type: GET_PUBLIC_POSTS, payload: array });
        dispatch({ type: GET_ALL_POSTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const getRandomPost = () => {
  return (dispatch) => {
    return axios
      .get(`api/post/random`)
      .then((res) => {
        dispatch({ type: GET_RANDOM_POST, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const addPost = (data) => {
  return (dispatch) => {
    return axios.post(`api/post/`, data).then((res) => {
      dispatch({
        type: CREATE_POST,
        payload: res.data,
      });
    });
  };
};

export const deletePost = (postId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `api/post/${postId}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const Vote = (postId, respId, voterId) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `api/post/${postId}`,
      data: { respId, voterId },
    })
      .then((res) => {
        dispatch({ type: VOTE, payload: { postId, respId, voterId } });
      })
      .catch((err) => console.log(err));
  };
};

export const AddResponse = (postId, text, posterId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `api/post/add/${postId}`,
      data: { text, posterId },
    })
      .then((res) => {
        dispatch({ type: ADD_RESPONSE, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const likePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `api/post/like-post/` + postId,
      data: { id: userId },
    })
      .then((res) => {
        dispatch({ type: LIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};

export const unlikePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `api/post/unlike-post/` + postId,
      data: { id: userId },
    })
      .then((res) => {
        dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};

export const publish = (postId) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `api/post/publish/` + postId,
    })
      .then((res) => {
        dispatch({ type: PUBLISH, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const close = (postId, context) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `api/post/close/${postId}`,
      data: { context },
    })
      .then((res) => {
        dispatch({ type: CLOSE, payload: { postId, context } });
      })
      .catch((err) => console.log(err));
  };
};
