import Customer from "../models/customer.model.js";
import Account from "../models/account.model.js";

async function getCustomerId(uName) {
  try {
    let customer;
    customer = await Customer.findOne({ username: uName });
    if (!customer) {
      throw new Error("Customer not found");
    }
    return customer._id;
  } catch (error) {
    throw new Error("Failed to get customer ID: " + error.message);
  }
}

export async function addAccount(req, res) {
  console.log(req.body);
  try {
    const customerId = await getCustomerId(req.body.username);
    if (!customerId) {
      return res.status(404).json({ error: "Customer not found" });
    }

    // Check if the customer already has an account
    const existingAccount = await Account.findOne({ customer: customerId });
    if (existingAccount) {
      return res.status(400).json({ error: "Customer already has an account" });
    }

    const account = new Account({
      account_number: req.body.account_number,
      account_type: req.body.account_type,
      customer: customerId,
      balance: req.body.balance,
    });

    const savedAccount = await account.save();
    res
      .status(200)
      .json({ message: "Account created successfully", account: savedAccount });
  } catch (error) {
    console.error("Error creating account:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the account" });
  }
}

export async function getAccountByCustomerID(req, res) {
  console.log(req.body);
  try {
    // Check if the customer already has an account
    const existingAccount = await Account.findOne({
      account_number: req.body.account_number,
      customer: req.body.customerID,
    });

    if (!existingAccount) {
      return res.status(400).json({
        error: `The account with account number does not belong to customer`,
        account: false,
      });
    }

    return res.status(200).json({
      message: `The account with account number belong to customer`,
      account: true,
      ExistingAccount: existingAccount,
    });
  } catch (error) {
    console.error("Error getting account:", error);
    res.status(500).json({
      error:
        "An error occurred while getting the account through account number and customer id",
      account: false,
    });
  }
}

export async function getAllAccounts(req, res) {
  try {
    const accounts = await Account.find();
    if (accounts) {
      return res.status(200).json({
        message: "Successfully get all the account information.",
        account: accounts,
      });
    } else {
      return res
        .status(400)
        .json({ message: "Failed to get all accounts informtion!!" });
    }
  } catch (error) {
    return res.status(500).json({ error: "External Service Error!!" });
  }
}
export async function checkAccountByAccountID(req, res) {
  try {
    const existingAccount = await Account.findOne({
      account_number: req.body.account_number,
    });

    if (!existingAccount) {
      return res.status(400).json({
        error: `Sender Account Not Found`,
        account: false,
      });
    }

    return res.status(200).json({
      message: `Sender Account Found`,
    });
  } catch (error) {
    console.error("Error getting account:", error);
    res.status(500).json({
      error: "An error occurred while getting the account through account id",
      account: false,
    });
  }
}
