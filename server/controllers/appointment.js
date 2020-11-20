const appointmentsRouter = require("express").Router();
const { Appointment, MeetingType } = require("../models/");

// Create Appointments
// How to make this an authenticated route?
appointmentsRouter.post("/", async (request, response) => {
    const body = request.body;
    const meetingType = await MeetingType.findById(body.meetingTypeId);
    const time = new Date(body.time * 1000); // time entered in unix time stamp

    const appointment = new Appointment({
        meetingType: meetingType._id,
        name:       body.name,
        email:      body.email,
        time:       time,
        timezone:   body.timezone
    });

    const savedAppointment = await appointment.save();
    meetingType.appointments = meetingType.appointments.concat(savedAppointment._id);
    await meetingType.save();

    response.json(savedAppointment);
});

// Fetch/Read All Appointmentss
appointmentsRouter.get("/", async (request, response) => {
    const appointments = await Appointment.find({});
    response.json(appointments);
});

// Update Appointments
appointmentsRouter.patch("/:id", async (request, response) => {
    const body = request.body;

    const appointment = await Appointment.findById(request.params.id);

    if (appointment) { // Update appointment if the following keys exist in body
        if (body.name) {
            appointment.name = body.name;
        }
        if (body.email) {
            appointment.email = body.email;
        }
        if (body.time) {
            appointment.time = body.time;
        }
        if (body.timezone) {
            appointment.timezone = body.timezone;
        }

        appointment.updatedAt = Date(Date.now());

        await appointment.save();
        response.json(appointment);

    } else {
        response.status(404)
            .json({
                "status":"error",
                "message": "appointment does not exist"
            }).end();
    }
});

// Delete Appointments
appointmentsRouter.delete("/:id", async (request, response) => {
    await Appointment.findByIdAndRemove(request.params.id);
    response.status(204).end();
});

module.exports = appointmentsRouter;