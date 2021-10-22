import React from "react";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import Routes from "./routes/index";

import { setCurrentUser, logoutUser } from "./actions/auth.actions";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  // Check for token to keep user logged in
  if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser());

      // Redirect to login
      window.location.href = "/user";
    }
  }

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
