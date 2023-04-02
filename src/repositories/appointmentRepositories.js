import connectionDb from "../config/database.js";
import error from "../errors/index.js";


async function searchDoctor ({name, address, specialty}) {
        return await connectionDb.query(`
        SELECT 
            d.id, 
            d.name,
            d.address,
            d.specialty 
        FROM 
            doctors d
        WHERE 
        CASE 
                WHEN $1 <> '' THEN d.name LIKE '%' || $1 || '%'
                WHEN $2 <> '' THEN d.address = $2
                WHEN $3 <> '' THEN d.specialty = $3
                ELSE TRUE
        END
        `, [name, address, specialty])
    }

async function create({ doctor_id, user_id, day, time }) {
    return await connectionDb.query(
        `
        INSERT INTO appointments
        (doctor_id, patient_id, day, time)
        VALUES ($1, $2, $3, $4)
        `,
        [doctor_id, user_id, day, time]
        );
      }


      async function findDuplicate({ doctor_id, day, time }) {
        return await connectionDb.query(
          `
          SELECT *
          FROM appointments
          WHERE 
            doctor_id = $1 and 
            day = $2 and 
            (time BETWEEN $3::time - interval '59 minutes' AND $3::time + interval '59 minutes')
          `,
          [doctor_id, day, time]
        );
      }

      async function checkDoctorAvailability(doctor_id, time) {
        const { rows } = await connectionDb.query(
          `
          SELECT checkin, checkout FROM doctors WHERE id = $1
          `,
          [doctor_id]
        );
      
        const { checkin, checkout } = rows[0];
      
        if (time < checkin || time > checkout) {
          throw error.doctorNotAvailable();
        }
      }


async function findbyIdPatient({ date, id }) {
    return await db.query(
      `
      SELECT 
        a.id, p.name as patient, d.name as doctor,
        d.specialty, a.day, a.time,
      FROM appointments a 
      JOIN patients p ON p.id = a.patient_id
      JOIN doctors d ON d.id = a.doctor_id
      WHERE a.day>=$1 AND a."patient_id"=$2
      ORDER BY a.day ASC
      `,
      [date, id]
    );
  }

// async function getappointmentdoc (req, res, next) {

// }

// async function postappointment (req, res, next) {

// }

// async function confirmedappointment (req, res, next) {

// }

// async function gethistory (req, res, next) {

// }

// async function gethistorydoc (req, res, next) {

// }


export default {
    searchDoctor,
    create,
    findDuplicate,
    checkDoctorAvailability,
    findbyIdPatient
    // getappointment,
    // getappointmentdoc,
    // postappointment,
    // confirmedappointment,
    // gethistory,
    // gethistorydoc

}