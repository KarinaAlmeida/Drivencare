import { Router } from "express";
import userControllers from "../controllers/userControllers.js";
import {validateSchema} from "../middlewares/schemaValidationMiddleware.js";
import userSchema from "../schemas/userSchema.js";

const userRoutes = Router();

userRoutes.post('/signup', validateSchema(userSchema.signup), userControllers.signup)

userRoutes.post('/signupdoc', validateSchema(userSchema.signupdoc), userControllers.signupdoc)

userRoutes.post("/signin", validateSchema(userSchema.signin), userControllers.signin)
userRoutes.post("/signindoc", validateSchema(userSchema.signin), userControllers.signindoc)


export default userRoutes;