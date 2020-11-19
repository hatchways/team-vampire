const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    userName:         { type: String, index: true, unique: true, sparse: true }, // not sure if this is the standard implementation to allow null to not be unique
    firstName:        String,
    lastName:         String,
    email:            { type: String, required: true, unique: true, lowercase: true }, 
    timezone:         String,
    profilePicture:   String,
    accessToken:      { type: String, required: true },
    stripeCustomerId: String,
    createdAt:        { type: Date, default: Date.now }, 
    updatedAt:        { type: Date, default: Date.now },
});
  
const User = model("User", userSchema);

module.exports = { userSchema, User };