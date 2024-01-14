import mongoose, { Schema } from "mongoose";

const accountSchema = new Schema({
  account_number: { type: String, required: true, unique: true },
  account_type: {
    type: String,
  },
  username: { type: String },
  customer: { type: Schema.Types.ObjectId, ref: "Customer", unique: true },
  balance: { type: Number, default: 0 },
  transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
});

const Account = mongoose.model("Account", accountSchema);

export default Account;
