import connectionDb from "../config/database.js";

async function findByEmail(email) {
    return await connectionDb.query(
      `    
      SELECT * FROM patients WHERE email=$1
    `,
      [email]
    );
  }

  async function findByEmaildoc(email) {
    return await connectionDb.query(
      `    
      SELECT * FROM doctors WHERE email=$1
    `,
      [email]
    );
  }


async function signup ({name, email, password}) {
    return await connectionDb.query(
        `
        INSERT INTO patients (name, email, password)
        VALUES ($1, $2, $3)
        `, [name, email, password]
    )
    }
    
async function signupdoc ({name, email, password, specialty, address, checkin, checkout}) {
        return await connectionDb.query(
            `
            INSERT INTO doctors (name, email, password, specialty, address, checkin, checkout)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            `, [name, email, password, specialty, address, checkin, checkout]
            )
        
        }
    
    
    export default {
        signup, 
        signupdoc, 
        findByEmail,
        findByEmaildoc
    
    }

