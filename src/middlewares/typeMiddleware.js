import errors from "../errors/index.js";

function typeValidate(type) {
  return async (req, res, next) => {
    const user = res.locals.user;
    if (user.type !== type) throw errors.notAllowed();
    next();
  };
}

export default typeValidate;