const { Schema, model } = require("mongoose");

const meetingTypeSchema = new Schema({
    user:         { type: Schema.Types.ObjectId, ref: "User" },
    name:         { type: String, default: "60 Minute Meeting" },
    description:  { type: String, default: "One-on-One" },
    duration:     { type: Number, required: true, default: 60 },
    appointments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Appointment"
        }
    ], 
    createdAt:    { type: Date, default: Date.now }, 
    updatedAt:    { type: Date, default: Date.now },  
});

// Format objects returned by Mongoose
meetingTypeSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
  
const MeetingType = model("MeetingType", meetingTypeSchema);

module.exports = { meetingTypeSchema, MeetingType };