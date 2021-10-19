import Joi from "joi";
import bcrypt from "bcryptjs";

export default {
  encryptPassword(plainText) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainText, salt);
  },
  comparePassword(plainText, encrypedPassword) {
    return bcrypt.compareSync(plainText, encrypedPassword);
  },
  validateSignup(body) {
    const schema = Joi.object()
      .keys({
        userName: Joi.string()
          .required()
          .error((errors) => {
            errors.forEach((err) => {
              switch (err.type) {
                case "string.empty":
                  err.message = "'Username' should not be empty!";
                  break;
                case "any.required":
                  err.message = `'Username' is a required field`;
                  break;
                default:
                  break;
              }
            });
            return errors;
          }),
        firstName: Joi.string()
          .required()
          .error((errors) => {
            errors.forEach((err) => {
              switch (err.type) {
                case "string.empty":
                  err.message = "'First Name' should not be empty!";
                  break;
                case "any.required":
                  err.message = `'First Name' is a required field`;
                  break;
                default:
                  break;
              }
            });
            return errors;
          }),
        lastName: Joi.string()
          .required()
          .error((errors) => {
            errors.forEach((err) => {
              switch (err.type) {
                case "string.empty":
                  err.message = "'Last Name' should not be empty!";
                  break;
                case "any.required":
                  err.message = `'Last Name' is a required field`;
                  break;
                default:
                  break;
              }
            });
            return errors;
          }),
        email: Joi.string()
          .email()
          .required()
          .error((errors) => {
            errors.forEach((err) => {
              switch (err.type) {
                case "string.empty":
                  err.message = "'Email' should not be empty!";
                  break;
                case "string.email":
                  err.message = `'Email' must be a valid email address`;
                  break;
                case "any.required":
                  err.message = `'Email' is a required field`;
                  break;
                default:
                  break;
              }
            });
            return errors;
          }),
        password: Joi.string()
          .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)
          .required()
          .error((errors) => {
            errors.forEach((err) => {
              switch (err.type) {
                case "string.empty":
                  err.message = "'Password' should not be empty!";
                  break;
                case "string.regex":
                  err.message = `'Password' must be a more than 8 characters and contains atleast 1 number and 1 special characters`;
                  break;
                case "any.required":
                  err.message = `'Password' is a required field`;
                  break;
                default:
                  break;
              }
            });
            return errors;
          }),
        role: Joi.number().integer(),
      })
      .unknown(true);
    const { value, error } = Joi.validate(body, schema);
    if (error && error.details) {
      return { error };
    }
    return { value };
  },
  validateLogin(body) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email()
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case "string.empty":
                err.message = "'Email' should not be empty!";
                break;
              case "string.email":
                err.message = `'Email' must be a valid email address`;
                break;
              case "any.required":
                err.message = `'Email' is a required field`;
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      password: Joi.string()
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case "string.empty":
                err.message = "'Password' should not be empty!";
                break;
              case "string.regex":
                err.message = `'Password' must be a more than 8 characters and contains atleast 1 number and 1 special characters`;
                break;
              case "any.required":
                err.message = `'Password' is a required field`;
                break;
              default:
                break;
            }
          });
          return errors;
        }),
    });
    const { value, error } = Joi.validate(body, schema);
    if (error && error.details) {
      return { error };
    }
    return { value };
  },
};
