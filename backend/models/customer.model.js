import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: [true, "Enter the name"], trim: true },
  gender: {
    type: String,
    required: true,
    lowercase: true,
    enum: ["male", "female"],
  },
  address: { type: String, required: true },
  date_of_birth: { type: String, required: true, minlength: 6 },
  username: { type: String, unique: true, required: true },
  password: { type: String, minlength: 8, required: true, unique: true },
  phone_number: { type: String, required: true },
  cnic_number: { type: String, unique: true, maxlength: 15, required: true },
  creation_date: { type: Date, default: Date.now() },
});

const Customer = mongoose.model("Customer", userSchema);
export default Customer;
