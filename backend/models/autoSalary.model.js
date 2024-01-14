import mongoose, { Schema } from "mongoose";

const autoSalarySchema = new Schema({
  account: { type: Schema.Types.ObjectId, ref: "Account", required: true }, // Reference to the Account model
  workflows: [
    {
      department: { type: String, required: true },
      account_numbers: {
        type: [String],
        validate: {
          validator: function (value) {
            // Custom validator to check uniqueness of account numbers within the array
            return value === undefined || new Set(value).size === value.length;
          },
          message: "Account numbers must be unique.",
        },
        default: undefined,
      },
      amount: { type: String, required: true },
      date: { type: Date, default: Date.now() },
    },
  ],
});

const AutoSalary = mongoose.model("AutoSalary", autoSalarySchema);

export default AutoSalary;
