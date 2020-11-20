const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
    userName:         { type: String, index: true, unique: true, sparse: true }, // not sure if this is the standard implementation to allow null to not be unique
    firstName:        String,
    lastName:         String,
    email:            { type: String, required: true, unique: true, lowercase: true }, 
    timezone:         String,
    profilePicture:   String,
    accessToken:      { type: String, required: true },
    stripeCustomerId: String,
    availabilities: [
        { 
            type: Schema.Types.ObjectId, 
            ref: "Availability" 
        }
    ],
    meetingTypes: [
        {
            type: Schema.Types.ObjectId,
            ref: "MeetingType"
        }
    ],
    createdAt:        { type: Date, default: Date.now }, 
    updatedAt:        { type: Date, default: Date.now },
});

userSchema.plugin(uniqueValidator);

// Format objects returned by Mongoose
userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
  
const User = model("User", userSchema);

module.exports = { userSchema, User };