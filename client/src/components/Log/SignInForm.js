import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../actions/auth.actions";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const errors = useSelector((state) => state.errorReducer);

  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    dispatch(loginUser(data));
  };
  return (
    <div className="form">
      <form action="" onSubmit={handleLogin} id="SignUpForm">
        <label htmlFor="email">E-mail</label>
        <br />
        <input
          type="text"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <div className="email error">
          {errors?.email || errors?.emailnotfound}
        </div>
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div className="password error">
          {errors?.password || errors?.passwordincorrect}
        </div>
        <br />
        <input type="submit" value="Se connecter" />
      </form>
    </div>
  );
};

export default SignIn;
