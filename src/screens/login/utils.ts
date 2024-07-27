const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return email.match(emailRegex) !== null;
};

const isValidPassword = (password: string): boolean => {
  return password.length >= 8;
};

export { isValidEmail, isValidPassword };
