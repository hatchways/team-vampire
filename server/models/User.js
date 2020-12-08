const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
    googleId:         { type: String, required: true },
    accessToken:      { type: String, required: true },
    refreshToken:     { type: String, required: true },
    userName:         { type: String, index: true, unique: true, sparse: true }, // not sure if this is the standard implementation to allow null to not be unique
    firstName:        { type: String, required: true },
    lastName:         { type: String, required: true },
    email:            { type: String, required: true, unique: true, lowercase: true }, 
    timezone:         String,
    profilePicture:   String,
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