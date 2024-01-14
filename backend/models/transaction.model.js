import mongoose, { Schema } from 'mongoose';

const transactionSchema = new Schema({
  account: { type: Schema.Types.ObjectId, ref: 'Account'},
  amount: { type: Number, required: true },
  account_number: { type: Number, length: 6 },
  type: { type: String, enum: ['deposit', 'withdrawal'], required: true },
  date: { type: Date, default: Date.now() },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
