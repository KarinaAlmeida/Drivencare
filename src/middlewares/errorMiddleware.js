import httpStatus from "http-status";

export function handleApplicationErrors(err, req, res, next) {
    if (err.name === "ConflictError" || err.name === "DuplicatedEmailError") {
      return res
        .status(httpStatus.CONFLICT)
        .send({ message: err.message, email: err.email });
    }

  
    if (err.name === "InvalidCredentialsError") {
      return res.status(httpStatus.UNAUTHORIZED).send({
        message: err.message,
      });
    }
  
    if (err.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send({
        message: err.message,
      });
    }
  
    if (err.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send({
        message: err.message,
      });
    }

    if (err.name=== "AppointmentExists") {
      return res.status(httpStatus.CONFLICT).send({ message: err.message });
    }

    if (err.name=== "NoAppointmentsMade") {
      return res.status(httpStatus.CONFLICT).send({ message: err.message });
    }

    if (err.name==="DoctorNotAvailable") {
      return res.status(httpStatus.CONFLICT).send({ message: err.message});
    }

    if (err.name==="NotAllowed") {
      return res.status(httpStatus.CONFLICT).send({ message: err.message});
    }
  
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "InternalServerError",
      message: "Internal Server Error",
    });
  }