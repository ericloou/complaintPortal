import mongoose from "mongoose";
import bcrypt from "bcryptjs";

//create a function to get an object
const usersSchema = new mongoose.Schema({
  username: { type: String, default: null },
  password: { type: String },
  token: { type: String },
});


// password encryption
usersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    const salt = await bcrypt.genSalt(15);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

// password decryption
usersSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const users = mongoose.model("users", usersSchema);

export default users;
