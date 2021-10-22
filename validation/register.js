const isEmpty = require("is-empty");
const emailIsValid = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

module.exports.validateRegisterInput = (err) => {
  let errors = { pseudo: "", email: "", password: "" };

  if (isEmpty(err.pseudo)) {
    errors.pseudo = "pseudo field is required";
  }

  // Email checks
  if (isEmpty(err.email)) {
    errors.email = "Email field is required";
  } else if (emailIsValid(err.email)) {
    errors.email = "Email is invalid";
  }

  // Password checks
  if (emailIsValid(err.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid:
      isEmpty(errors.password) &&
      isEmpty(errors.pseudo) &&
      isEmpty(errors.email),
  };
};
