import err from "../errors/index.js";
import userRepositories from "../repositories/userRepositories.js";
import jwt from "jsonwebtoken";

export default async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) throw err.unauthorizedError();

  const parts = authorization.split(" ");
  if (parts.length !== 2) throw err.unauthorizedError();

  const [schema, token] = parts;
  if (schema !== "Bearer") throw err.unauthorizedError();

  jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
    try {
      if (error) throw err.unauthorizedError();


      const {
        rows: [user],
      } = await (decoded.type === "patient"
        ? userRepositories.findById(decoded.user_id)
        : userRepositories.findByIdDoc(decoded.user_id));

      if (!user) throw err.unauthorizedError();

      res.locals.user = { ...user, type: decoded.type };

      next();
    } catch (error) {
      next(error);
    }
  });
}