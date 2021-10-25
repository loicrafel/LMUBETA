import axios from "axios";

export const GET_USER = "GET_USER";
export const DELETE_USER = "DELETE_USER";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteUser = (uid) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `api/user/${uid}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_USER, payload: { uid } });
      })
      .catch((err) => console.log(err));
  };
};
