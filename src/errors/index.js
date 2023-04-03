function conflictError(message) {
    return {
      name: "ConflictError",
      message,
    };
  }

  function appointmentExists () {
    return {
      name:"AppointmentExists",
      message:"This date and time already has a scheduled appointment",
    }
  }
  

  function doctorNotAvailable () {
    return {
      name:"DoctorNotAvailable",
      message:"The doctor is not available at this time"
    }
  }

  function duplicatedEmailError(email) {
    return {
      name: "DuplicatedEmailError",
      message: "There is already an user with this email",
      email,
    };
  }

  function unauthorizedError() {
    return {
      name: "UnauthorizedError",
      message: "You must be signed in to continue",
    };
  }
  
  function notFoundError() {
    return {
      name: "NotFoundError",
      message: "No result for this search!",
    };
  }

  function noAppointments() {
    return {
      name: "NoAppointmentsMade",
      message: "There is no appointments made!",
    };
  }
  
  function invalidCredentialsError() {
    return {
      name: "InvalidCredentialsError",
      message: "Incorrect email or password",
    };
  }
  
  export default {
    conflictError,
    duplicatedEmailError,
    unauthorizedError,
    notFoundError,
    invalidCredentialsError,
    appointmentExists,
    doctorNotAvailable,
    noAppointments
  };