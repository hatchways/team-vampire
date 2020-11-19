const { Schema, model } = require("mongoose");
const MeetingType = require("./MeetingType");

const appointmentSchema = new Schema({
    meetingType:  { type: Schema.Types.ObjectId, ref: "MeetingType" },
    name:         { type: String, required: true, default: "My Appointment" },
    email:        { type: String, required: true, default: "nickfury@shield.com" },
    time:         { type: Date, required: true, default: Date.now },
    timezone:     { type: String, required: true, default: "UTC 0" },
    createdAt:    { type: Date, default: Date.now }, 
    updatedAt:    { type: Date, default: Date.now },  
  });
  
  const Appointment = model("Appointment", appointmentSchema);

  module.exports = Appointment;