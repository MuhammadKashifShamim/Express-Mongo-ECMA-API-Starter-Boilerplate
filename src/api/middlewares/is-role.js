import {
  ADMIN_ROLE,
  OPERATOR_ROLE,
  CUSTOMER_ROLE,
} from "../resources/user/user.model";
import { UnAuthorized } from "../helpers/errors";

export const isAdminResearcher = (req, res, next) => {
  if (req.user.role === CUSTOMER_ROLE) {
    return next(new UnAuthorized("AuthorizationError", "Access Denied"));
  }
  next();
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== ADMIN_ROLE) {
    return next(
      new UnAuthorized("AuthorizationError", "Not an Admin. Access Denied")
    );
  }
  next();
};

export const isReseacher = (req, res, next) => {
  if (req.user.role !== OPERATOR_ROLE) {
    return next(
      new UnAuthorized("AuthorizationError", "Not a Operator. Access Denied")
    );
  }
  next();
};
