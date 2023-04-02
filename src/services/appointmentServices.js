import appointmentRepositories from "../repositories/appointmentRepositories.js";
import error from "../errors/index.js";
// import jwt from "jsonwebtoken";
// import "dotenv/config";

async function searchDoctor({name, address, specialty}){

    const result = await appointmentRepositories.searchDoctor({name, address, specialty})
    return result.rows
 }



 async function create({ doctor_id, user_id, day, time }) {
    const { rowCount } = await appointmentRepositories.findDuplicate({
      doctor_id,
      day,
      time,
    });

    if (rowCount) throw error.appointmentExists();
  
    await appointmentRepositories.checkDoctorAvailability(doctor_id, time);

    await appointmentRepositories.create({ doctor_id, user_id, day, time });
  }

 


async function getappointment ({id}) {
const date = dayjs().format("DD/MM/YYYY");
return await appointmentRepositories.findbyIdPatient({ date, id });
 }

export default {
    getappointment,
    searchDoctor,
    create
    
}