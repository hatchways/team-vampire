const { Schema, model } = require("mongoose");
const User = require("./User");

const availabilitySchema = new Schema({
    user:       { type: Schema.Types.ObjectId, ref: "User" },
    day:        { type: Number, required: true },
    startTime:  { type: Number, required: true, default: 540 },
    endTime:    { type: Number, required: true, default: 1020 },
    createdAt:  { type: Date, default: Date.now }, 
    updatedAt:  { type: Date, default: Date.now },  
  });
  
  const Availability = model("Availability", availabilitySchema);

  module.exports = Availability;