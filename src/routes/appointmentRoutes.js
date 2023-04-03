import { Router } from "express";
import appointmentControllers from "../controllers/appointmentControllers.js";
import authValidation from "../middlewares/authMiddleware.js";


const appointmentRoutes = Router();


appointmentRoutes.get('/search', authValidation, appointmentControllers.searchDoctor)

appointmentRoutes.post('/', authValidation, appointmentControllers.createappointment)


appointmentRoutes.get('/patients', authValidation, appointmentControllers.getappointment)

appointmentRoutes.get('/doctors', authValidation, appointmentControllers.getappointmentdoc)

appointmentRoutes.post('/doctors', authValidation, appointmentControllers.confirmappointment)


// appointmentRoutes.get('/', appointmentControllers.getappointmentdoc)

// appointmentRoutes.patch("/", appointmentControllers.confirmedappointment)

// appointmentRoutes.get("/", appointmentControllers.gethistory)
// appointmentRoutes.get("/", appointmentControllers.gethistorydoc)



export default appointmentRoutes;

// appointmentsRoutes.post(
//     "/patient",
//     authentication,
//     userTypeValidate("patient"),
//     schemaValidate(appointSchemas.create),
//     hourAndDateValidation,
//     appointmentsControllers.create
//   );