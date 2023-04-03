import { Router } from "express";
import appointmentControllers from "../controllers/appointmentControllers.js";
import authValidation from "../middlewares/authMiddleware.js";
import typeValidate from "../middlewares/typeMiddleware.js";


const appointmentRoutes = Router();


appointmentRoutes.get('/search', authValidation, appointmentControllers.searchDoctor)

appointmentRoutes.post('/', authValidation, appointmentControllers.createappointment)


appointmentRoutes.get('/patients', authValidation, typeValidate("patient"), appointmentControllers.getappointment)

appointmentRoutes.get('/doctors', authValidation, typeValidate("doctor"), appointmentControllers.getappointmentdoc)

appointmentRoutes.post('/doctors/:id', authValidation, typeValidate("doctor"), appointmentControllers.confirmappointment)

appointmentRoutes.delete('/doctors/:id', authValidation, typeValidate("doctor"), appointmentControllers.cancelappointment)


appointmentRoutes.get("/historydoctor",typeValidate("doctor"), appointmentControllers.gethistorydoc)

appointmentRoutes.get("/history",typeValidate("patient"), appointmentControllers.gethistory)



export default appointmentRoutes;

