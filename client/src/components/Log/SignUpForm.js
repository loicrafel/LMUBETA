import React, { useState } from "react";
import SignInForm from "./SignInForm";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../actions/auth.actions";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const dispatch = useDispatch();

  const { errors } = useSelector((state) => state.errorReducer);

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );
    const termsError = document.querySelector(".terms.error");

    passwordConfirmError.innerHTML = "";
    termsError.innerHTML = "";

    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML =
          "Les mots de passe ne correspondent pas";

      if (!terms.checked)
        termsError.innerHTML = "Veuillez valider les conditions générales";
    } else {
      const newUser = {
        pseudo: pseudo,
        email: email,
        password: password,
      };
      dispatch(registerUser(newUser));
      setFormSubmit(true);
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>
          <p className="success">
            Enregistrement réussi, veuillez-vous connecter
          </p>
        </>
      ) : (
        <div className="form">
          <form action="" onSubmit={handleRegister} id="sign-up-form">
            <label htmlFor="pseudo">Pseudo</label>
            <br />
            <input
              type="text"
              name="pseudo"
              id="pseudo"
              onChange={(e) => setPseudo(e.target.value)}
              value={pseudo}
            />
            <div className="pseudo error">{errors?.pseudo}</div>
            <br />
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="text"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <div className="email error">{errors?.email}</div>
            <br />
            <label htmlFor="password">Mot de passe</label>
            <br />
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div className="password error">{errors?.password}</div>
            <br />
            <label htmlFor="password-conf">Confirmer mot de passe</label>
            <br />
            <input
              type="password"
              name="password"
              id="password-conf"
              onChange={(e) => setControlPassword(e.target.value)}
              value={controlPassword}
            />
            <div className="password-confirm error"></div>
            <br />
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              J'accepte les{" "}
              <a href="/about" target="_blank" rel="noopener noreferrer">
                conditions générales
              </a>
            </label>
            <div className="terms error"></div>
            <br />
            <input type="submit" value="S'inscrire" />
          </form>
        </div>
      )}
    </>
  );
};

export default SignUpForm;
