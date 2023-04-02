import appointmentServices from "../services/appointmentServices.js";

async function searchDoctor (req, res, next) {
    const {name, address, specialty} = req.query
    try {
       
        const result = await appointmentServices.searchDoctor({name, address, specialty})

        return res.send({result})
        
    } catch (error) {
        console.log(error)

        next(error)
    }
}

async function createappointment (req, res, next) {
    const { doctor_id, day, time } = req.body;
    const user = res.locals.user;
    try {
      await appointmentServices.create({
        doctor_id,
        user_id: user.id,
        day,
        time,
      });
      return res.sendStatus(201);
    } catch (error) {

      next(error);

    }

}


async function getappointment (req, res, next) {
    const user = res.locals.user;
    try {
      const { rows: schedule } = await appointmentServices.getappointment({
        id: user.id,
      });
      console.log(rows)
  
      return res.send({ schedule });
    } catch (error) {
        next (error);
    }

}

async function getappointmentdoc (req, res, next) {

}


async function confirmedappointment (req, res, next) {

}

async function gethistory (req, res, next) {

}

async function gethistorydoc (req, res, next) {

}


export default {
    searchDoctor,
    getappointment,
    getappointmentdoc,
    createappointment,
    confirmedappointment,
    gethistory,
    gethistorydoc

}