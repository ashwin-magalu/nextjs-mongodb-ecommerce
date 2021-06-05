const validate = (name, email, password, cf_password) => {
  if (!name || !email || !password) return "Please fill  all fields.";

  if (!validateEmail(email)) return "Invalid Email.";

  if (password.length < 6)
    return "Password length should be more than 6 characters.";

  if (password !== cf_password)
    return "Confirm password is not same as your password.";
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default validate;
