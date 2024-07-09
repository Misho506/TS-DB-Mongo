import validator from 'validator';

export const validateSignUpInput = (name: string, email: string, password: string) => {
  let errors: any = {};
  if (validator.isEmpty(name)) {
    errors = 'Name must not be empty';
  }
  if (!validator.isEmail(email)) {
    errors = 'Email must be a valid email address';
  }
  if (validator.isEmpty(password)) {
    errors = 'Password must not be empty';
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

export const validateLoginInput = (email: string, password: string) => {
  let errors: any;
  if (!validator.isEmail(email)) {
    errors = 'Email must be a valid email address';
  }
  if (!validator.isEmpty(password)) {
    errors = 'Password must not be empty';
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};
