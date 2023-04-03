import connectionDb from "../config/database.js";
import error from "../errors/index.js";
import dayjs from 'dayjs';



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

async function findbyIdPatient({id}) {
    const today = dayjs().format('YYYY-MM-DD'); 
  
    return await connectionDb.query(
      `
        SELECT 
          a.id, a.day, a.time, d.name, d.specialty
        FROM appointments a
        JOIN doctors d ON a.doctor_id= d.id
        WHERE a.patient_id = $1 AND a.day >= $2
      `,
      [id, today]
    );
}

async function findbyIdDoctor({id}) {
    const today = dayjs().format('YYYY-MM-DD'); 
  
    return await connectionDb.query(
      `
    SELECT 
      a.id, a.day, a.time, p.name, d.specialty
    FROM appointments a
    JOIN doctors d ON a.doctor_id = d.id
    JOIN patients p ON a.patient_id = p.id
    WHERE a.doctor_id = $1 AND a.day >= $2
      `,
      [id, today]
    );
}


async function getAppointmentById ({id}) {
    const {rows} = await connectionDb.query(
    `SELECT * 
    FROM appointments 
    WHERE id = $1`,
    [id]
)
    return rows[0];
}

async function confirmAppointment ({id}) {
    const {rows} = await connectionDb.query (
        `
        UPDATE appointments 
        SET confirmed = true 
        WHERE id = $1 
        RETURNING *
        `,
        [id]

    )
    return rows[0];
}

async function cancelAppointment ({id}) {

    const {rows} = await connectionDb.query (
        `
        DELETE 
        FROM appointments 
        WHERE id = $1 
        `,
        [id]

    )
    return rows[0];

}

async function findHistoryPatient ({id}) {
    const today = dayjs().format('YYYY-MM-DD'); 
  
    return await connectionDb.query(
      `
        SELECT 
          a.id, a.day, a.time, d.name, d.specialty
        FROM appointments a
        JOIN doctors d ON a.doctor_id= d.id
        WHERE a.patient_id = $1 AND a.day < $2
      `,
      [id, today]
    );
}

async function findHistoryDoctor ({id}) {
    const today = dayjs().format('YYYY-MM-DD'); 
  
    return await connectionDb.query(
      `
    SELECT 
      a.id, a.day, a.time, p.name, d.specialty
    FROM appointments a
    JOIN doctors d ON a.doctor_id = d.id
    JOIN patients p ON a.patient_id = p.id
    WHERE a.doctor_id = $1 AND a.day < $2
      `,
      [id, today]
    );

}


export default {
    searchDoctor,
    create,
    findDuplicate,
    checkDoctorAvailability,
    findbyIdPatient,
    findbyIdDoctor,
    findHistoryPatient,
    findHistoryDoctor,
    getAppointmentById,
    confirmAppointment,
    cancelAppointment

}