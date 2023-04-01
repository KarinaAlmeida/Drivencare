import userServices from "../services/userServices.js";

async function signup(req, res, next) {
  const { name, email, password } = req.body;
  try {
    await userServices.signup({ name, email, password });
    return res.sendStatus(201);
  } catch (err) {
    next(err);
    console.log(err)
  }
}

async function signupdoc(req, res, next) {
    const { name, email, password, specialty, address, checkin, checkout } = req.body;
    try {
      await userServices.signupdoc({ name, email, password, specialty, address, checkin, checkout });
      return res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  }

async function signin(req, res, next) {
  const { email, password } = req.body;
  try {
    const token = await userServices.signin({ email, password });
    return res.send({ token });

  } catch (err) {
    next(err);
  }

}

async function signindoc(req, res, next) {
    const { email, password } = req.body;
    try {
      const token = await userServices.signindoc({ email, password });
      return res.send({ token });
    } catch (err) {
      next(err);
    }
  }



export default {
    signup,
    signupdoc,
    signin,
    signindoc
};