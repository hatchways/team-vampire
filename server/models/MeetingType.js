const { Schema, model } = require("mongoose");
const User = require("./User");

const meetingTypeSchema = new Schema({
    user:         { type: Schema.Types.ObjectId, ref: "User" },
    name:         { type: String, default: "60 Minute Meeting" },
    description:  { type: String, default: "One-on-One" },
    duration:     { type: Number, required: true, default: 60 },
    createdAt:    { type: Date, default: Date.now }, 
    updatedAt:    { type: Date, default: Date.now },  
});
  
const MeetingType = model("MeetingType", meetingTypeSchema);

module.exports = { meetingTypeSchema, MeetingType };