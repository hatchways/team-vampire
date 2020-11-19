const appointmentsRouter = require("express").Router();
const { Appointment } = require("../models/");

// Create Appointments
// How to make this an authenticated route?
appointmentsRouter.post("/", (request, response, next) => {
    const body = request.body;
    const time = new Date(body.time);
    console.log(typeof time)
    console.log(time);
    const appointment = new Appointment({
        name:       body.name,
        email:      body.email,
        time:       time,
        timezone:   body.timezone
    });

    // Need to add logic for connecting Appointments to users meeting

    appointment.save()
        .then(savedAppointments => {
            console.log(savedAppointments);
            response.json(savedAppointments);
        })
        .catch(error => {
            console.error(error);
            response.json(error);
            next(error)
        });
});

// Fetch/Read All Appointmentss
appointmentsRouter.get("/", (request, response) => {
    Appointment.find({}).then(appointments => {
        response.json(appointments);
    });
});

module.exports = appointmentsRouter;