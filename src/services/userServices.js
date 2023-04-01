import bcrypt from "bcrypt";
import userRepositories from "../repositories/userRepositories.js";
import errors from "../errors/index.js";
import jwt from "jsonwebtoken";
import "dotenv/config";


async function signup({ name, email, password }) {
    const { rowCount } = await userRepositories.findByEmail(email);
    if (rowCount) throw errors.duplicatedEmailError(email);
  
    const hashPassword = await bcrypt.hash(password, 10);
    await userRepositories.signup({ name, email, password: hashPassword });
  }

async function signupdoc ({ name, email, password, specialty, address, checkin, checkout}) {
    const { rowCount } = await userRepositories.findByEmaildoc(email);
    if (rowCount) throw errors.duplicatedEmailError(email);
  
    const hashPassword = await bcrypt.hash(password, 10);
    await userRepositories.signupdoc({ name, email, password: hashPassword, specialty, address, checkin, checkout });
  }

async function signin ({email, password}) {
    const {
        rowCount,
        rows: [patients],
      } = await userRepositories.findByEmail(email);
      if (!rowCount) throw errors.invalidCredentialsError();
    
      const correctPassword = await bcrypt.compare(password, patients.password);
      if (!correctPassword) throw errors.invalidCredentialsError();
    
      const token = jwt.sign({ user_id: patients.id, type: "patient" }, process.env.SECRET_JWT);
    
      return token;

  }

async function signindoc ({email, password}) {
    const {
        rowCount,
        rows: [doctors],
      } = await userRepositories.findByEmaildoc(email);
      if (!rowCount) throw errors.invalidCredentialsError();
    
      const correctPassword = await bcrypt.compare(password, doctors.password);
      if (!correctPassword) throw errors.invalidCredentialsError();
    
      const token = jwt.sign({ user_id: doctors.id, type: "doctor" }, process.env.SECRET_JWT);
    
      return token;

}


  export default {
    signup,
    signupdoc,
    signin,
    signindoc
  }