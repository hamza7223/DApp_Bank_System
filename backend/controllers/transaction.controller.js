// Assuming you have the Customer, Account, and Transaction models imported and available
import Customer from "../models/customer.model.js";
import Account from "../models/account.model.js";
import Transaction from "../models/transaction.model.js";

async function getAccountId(accNumber) {
  try {
    // Find the customer based on the identifier
    console.log(accNumber, "I AM HERE ");
    let account;
    account = await Account.findOne({ account_number: accNumber });
    // Check if the customer exists
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }
    // Return the customer's ObjectId
    console.log(account._id);
    return account._id;
  } catch (error) {
    return res.status(404).json({ error: "Failed to get customer ID" });
  }
}

export async function Deposit(req, res) {
  try {
    const amount = req.body.amount; // Retrieve the amount from the request body

    let accountId = await getAccountId(req.body.account_number); // Await the getAccountId function call
    if (!accountId) {
      return res.status(404).json({ error: "Account not found" });
    }

    // Find the customer by customerId
    let account = await Account.findById(accountId);
    let customer = await Customer.findById(account.customer._id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    // Update the account balance
    account.balance += amount;
    await account.save();

    console.log(account.balance);
    // Refresh the account balance
    account = await Account.findById(accountId);

    // Create a transaction for the deposit
    const transaction = new Transaction({
      account: account._id,
      amount: amount,
      type: "deposit",
    });
    await transaction.save();

    res.status(200).json({ message: "Deposit successful" });
  } catch (error) {
    res.status(500).json({ error: "Deposit failed! " });
  }
}

export async function Withdraw(req, res) {
  try {
    const amount = req.body.amount; // Retrieve the amount from the request body

    let accountId = await getAccountId(req.body.account_number); // Await the getAccountId function call
    if (!accountId) {
      return res.status(404).json({ error: "Account not found" });
    }

    // Find the customer by customerId
    let account = await Account.findById(accountId);
    let customer = await Customer.findById(account.customer._id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    // Check if the account has sufficient balance for withdrawal
    if (account.balance < amount) {
      return res.status(404).json({ error: "Insufficient Balance!!" });
    }

    // Update the account balance
    account.balance -= amount;
    await account.save();

    // Refresh the account balance
    account = await Account.findById(accountId);

    // Create a transaction for the withdrawal
    const transaction = new Transaction({
      account: account._id,
      amount: amount,
      type: "withdrawal",
    });
    await transaction.save();

    res.status(200).json({ message: "Withdrawal successful" });
  } catch (error) {
    res.status(500).json({ error: "Withdrawal failed!" });
  }
}

export async function getAllTransactions(req, res) {
  try {
    let accountId = await getAccountId(req.body.account_number); // Await the getAccountId function call
    if (!accountId) {
      return res.status(404).json({ error: "Account not found" });
    }

    // Find the transactions by account ID
    let transactions = await Transaction.find({ account: accountId });

    res.status(200).json({ transactions });
  } catch (error) {
    return res.status(404).json({ error: "Not found" });
    throw new Error("Failed to get transactions: " + error.message);
  }
}
