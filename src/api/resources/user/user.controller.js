import userService from "./user.service";
import User, { RESPONDENT_ROLE } from "./user.model";
import jwt from "../../helpers/jwt";
import logger from "../../helpers/logger";
import {
  Validation,
  UnAuthorized,
  Conflict,
  GeneralError,
} from "../../helpers/errors";

export default {
  async signup(req, res, next) {
    try {
      logger.info(JSON.stringify(req.body));
      const { value, error } = userService.validateSignup(req.body);
      if (error) {
        return next(new Validation(error.name, error.details[0].message));
      }
      const encryptedPass = userService.encryptPassword(value.password);

      const user = value;
      user.password = encryptedPass;
      user.role = value.role || RESPONDENT_ROLE;

      const newUser = await User.create(user);
      logger.info(JSON.stringify(newUser));
      return res.json({
        status: "success",
        message: "SignUp Successful",
        content: { user: newUser },
      });
    } catch (err) {
      if (err.code == 11000) {
        logger.error(err);
        var str = err.errmsg;
        var mySubString = str.substring(
          str.lastIndexOf("{") + 1,
          str.lastIndexOf(":")
        );
        logger.warn(mySubString);
        let errString = mySubString + " already exists! Please use a new one. ";
        logger.info(errString);
        return next(new Conflict("Duplication Error", errString));
      } else {
        return next(new GeneralError("Internal Error", "Something went wrong"));
      }
    }
  },

  async login(req, res, next) {
    try {
      const { value, error } = userService.validateLogin(req.body);
      if (error) {
        return next(new Validation(error.name, error.details[0].message));
      }
      const user = await User.findOne({ email: value.email });
      if (!user) {
        return next(
          new UnAuthorized("Authorization Error", "Access not Allowed")
        );
      }
      const authenticted = userService.comparePassword(
        value.password,
        user.password
      );
      if (!authenticted) {
        return next(
          new UnAuthorized("Authorization Error", "Access not Allowed")
        );
      }
      const token = jwt.issue({ id: user._id }, "1d");
      return res.json({
        status: "success",
        message: "Login Successful",
        content: { accessToken: token },
      });
    } catch (err) {
      console.error(err);
      return next(new GeneralError("Internal Error", "Something went wrong"));
    }
  },
  authenticate(req, res) {
    return res.json({
      status: "success",
      message: "User Found",
      content: req.user,
    });
  },
};
