export class GeneralError {
  constructor(name, message) {
    this.name = name;
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return 400;
    }
    if (this instanceof UnAuthorized) {
      return 401;
    }
    if (this instanceof NotFound) {
      return 404;
    }
    if (this instanceof NotAllowed) {
      return 405;
    }
    if (this instanceof Conflict) {
      return 409;
    }
    if (this instanceof Validation) {
      return 422;
    }
    return 500;
  }
}

export class BadRequest extends GeneralError {}
export class UnAuthorized extends GeneralError {}
export class NotFound extends GeneralError {}
export class NotAllowed extends GeneralError {}
export class Conflict extends GeneralError {}
export class Validation extends GeneralError {}
