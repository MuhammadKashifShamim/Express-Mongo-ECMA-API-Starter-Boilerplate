import { GeneralError } from "../helpers/errors";

export const handleErrors = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    // console.log("Error is getting handled here");
    return res.status(err.getCode()).json({
      status: "error",
      name: err.name,
      content: err.message,
    });
  }
  // console.log("Error 500 is getting handled here");
  return res.status(500).json({
    status: "error",
    name: err.name,
    content: err.message,
  });
};
