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
const {rows, rowCount} = await appointmentRepositories.findbyIdPatient({id})

if (!rowCount) throw error.appointmentExists()

return rows
 }

 async function getappointmentdoc ({id}) {
    const {rows, rowCount} = await appointmentRepositories.findbyIdDoctor({id})
    
    if (!rowCount) throw error.appointmentExists()
    
    return rows
     }

export default {
    getappointment,
    getappointmentdoc,
    searchDoctor,
    create
    
}