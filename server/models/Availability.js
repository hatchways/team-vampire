const { Schema, model } = require("mongoose");

const availabilitySchema = new Schema({
    user:       { type: Schema.Types.ObjectId, ref: "User" },
    day:        { type: Number, required: true },
    startTime:  { type: Number, required: true, default: 540 },
    endTime:    { type: Number, required: true, default: 1020 },
    createdAt:  { type: Date, default: Date.now }, 
    updatedAt:  { type: Date, default: Date.now },  
});

// Format objects returned by Mongoose
availabilitySchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
  
const Availability = model("Availability", availabilitySchema);

module.exports = Availability;