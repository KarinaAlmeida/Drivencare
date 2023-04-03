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
      const result = await appointmentServices.getappointment({
        id: user.id,
      });
  
      return res.send({ result });
    } catch (error) {
        next (error);
    }

}

async function getappointmentdoc (req, res, next) {

    const user = res.locals.user;
    try {
      const result = await appointmentServices.getappointmentdoc({
        id: user.id,
      });
  
      return res.send({ result });
    } catch (error) {
        next (error);
    }
}

async function confirmappointment (req, res, next) {
        try {
         
          const id = +req.params.id;
          const user = res.locals.user;
     
          await appointmentServices.confirm({ doctor_id: user.id, id});
      
          
          return res.sendStatus(202);
        } catch (err) {
          next(err);
        }
      

}


async function cancelappointment (req, res, next){
    try {
        const id = +req.params.id;
        const user = res.locals.user;
    
        const appointment = await appointmentServices.cancel({ doctor_id: user.id, id});
    
        return res.status(202).send(appointment);
      } catch (err) {
        console.log(err)
        next(err);
      }
}


async function gethistory (req, res, next) {

    const user = res.locals.user;
    try {
      const result = await appointmentServices.gethistory({
        id: user.id,
      });
  
      return res.send({ result });
    } catch (error) {
        next (error);
    }

}

async function gethistorydoc (req, res, next) {

    const user = res.locals.user;
    try {
      const result = await appointmentServices.gethistorydoc({
        id: user.id,
      });
  
      return res.send({ result });
    } catch (error) {
        next (error);
    }

}


export default {
    searchDoctor,
    getappointment,
    getappointmentdoc,
    createappointment,
    confirmappointment,
    gethistory,
    gethistorydoc,
    cancelappointment

}