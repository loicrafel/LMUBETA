const isEmpty = require("is-empty");
const emailIsValid = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

module.exports.validateLoginInput = (err) => {
  let errors = { email: "", password: "" };

  if (isEmpty(err.email)) {
    errors.email = "Email field is required";
  } else if (!emailIsValid(err.email)) {
    errors.email = "Email is invalid";
  }

  if (isEmpty(err.password))
    errors.password = "Le mot de passe ne correspond pas";

  return {
    errors,
    isValid: isEmpty(errors.email) && isEmpty(errors.password),
  };
};
