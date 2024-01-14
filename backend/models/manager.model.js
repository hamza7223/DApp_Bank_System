import mongoose from "mongoose";

const { Schema } = mongoose;

const managerSchema = new Schema({
  name: { type: String, trim: true },
  date_of_birth: { type: String, minlength: 6 },
  username: { type: String, unique: true, required: true },
  password: { type: String, maxlength: 10, required: true, unique: true },
  phone_number: { type: String, required: true },
  creation_date: { type: Date, default: Date.now() },
});

const Manager = mongoose.model("manager", managerSchema);
export default Manager;
