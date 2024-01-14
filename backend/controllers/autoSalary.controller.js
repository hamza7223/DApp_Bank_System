// Import necessary modules and models
import AutoSalary from "../models/autoSalary.model.js";
import Account from "../models/account.model.js";

async function getAccountId(accNumber) {
  try {
    // Find the customer based on the identifier
    console.log(accNumber, "I AM HERE ");
    let account;
    account = await Account.findOne({ account_number: accNumber });
    // Check if the customer exists
    if (!account) {
      throw new Error("Account not found");
    }
    // Return the customer's ObjectId
    console.log(account._id);
    return account._id;
  } catch (error) {
    throw new Error("Failed to get customer ID: " + error.message);
  }
}
// Controller to add or update AutoSalary entry
export const addAutoSalary = async (req, res) => {
  try {
    const { account_number, department, accountNumbers, amount } = req.body;

    let accountId = await getAccountId(account_number); // Await the getAccountId function call
    if (!accountId) {
      return res.status(404).json({ error: "Account not found" });
    }
    // Find the account by ID
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: "Account not found." });
    }

    // Check if the account numbers are unique within the array
    const uniqueAccountNumbers = new Set(accountNumbers);
    if (uniqueAccountNumbers.size !== accountNumbers.length) {
      return res
        .status(400)
        .json({ message: "Account numbers must be unique." });
    }

    // Check if the account numbers exist in the Account collection
    const existingAccounts = await Account.find({
      account_number: { $in: accountNumbers },
    });

    if (existingAccounts.length !== uniqueAccountNumbers.size) {
      return res.status(400).json({
        message: "All account numbers must exist in the Account collection.",
      });
    }

    // Check if an AutoSalary entry already exists for the account
    let autoSalaryEntry = await AutoSalary.findOne({ account: account._id });

    // If an entry exists, update it; otherwise, create a new entry
    if (autoSalaryEntry) {
      // Update the existing AutoSalary entry by pushing the new workflow details
      autoSalaryEntry.workflows.push({
        department,
        account_numbers: accountNumbers,
        amount,
      });
    } else {
      // Create a new AutoSalary entry
      autoSalaryEntry = await AutoSalary.create({
        account: account._id,
        workflows: [{ department, account_numbers: accountNumbers, amount }],
      });
    }

    // Save the updated or new AutoSalary entry
    await autoSalaryEntry.save();

    res.status(201).json(autoSalaryEntry);
  } catch (error) {
    console.error("Error in adding or updating AutoSalary:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to get AutoSalary entry by ID
export const getAutoSalaryByAccountId = async (req, res) => {
  try {
    const { account_number } = req.body; // Use req.body for accountId
    console.log(account_number);
    let accountId = await getAccountId(account_number); // Await the getAccountId function call
    if (!accountId) {
      return res.status(404).json({ error: "Account not found" });
    }
    // Find the AutoSalary entry by account Id
    const autoSalaryEntry = await AutoSalary.find({ account: accountId });

    if (!autoSalaryEntry) {
      return res.status(404).json({ message: "accountId entry not found." });
    }

    res.status(200).json(autoSalaryEntry);
  } catch (error) {
    console.error("Error in fetching accountId by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};












// export const addAutoSalary = async (req, res) => {
//   try {
//     const { account_number, department, accountNumbers, amount } = req.body;

//     let accountId = await getAccountId(account_number);
//     if (!accountId) {
//       return res.status(404).json({ error: "Account not found" });
//     }

//     // Check if the account numbers are unique within the array
//     const uniqueAccountNumbers = new Set(accountNumbers);
//     if (uniqueAccountNumbers.size !== accountNumbers.length) {
//       return res.status(400).json({ message: "Account numbers must be unique." });
//     }

//     // Check if the account numbers exist in the Account collection
//     const existingAccounts = await Account.find({
//       account_number: { $in: Array.from(uniqueAccountNumbers) },
//     });

//     if (existingAccounts.length !== uniqueAccountNumbers.size) {
//       return res.status(400).json({ message: "All account numbers must exist in the Account collection." });
//     }

//     // Retrieve or create an AutoSalary entry
//     let autoSalaryEntry = await AutoSalary.findOne({ account: accountId });
//     if (autoSalaryEntry) {
//       autoSalaryEntry.workflows.push({ department, account_numbers: accountNumbers, amount });
//     } else {
//       autoSalaryEntry = new AutoSalary({
//         account: accountId,
//         workflows: [{ department, account_numbers: accountNumbers, amount }]
//       });
//     }

//     await autoSalaryEntry.save();
//     res.status(201).json(autoSalaryEntry);

//   } catch (error) {
//     console.error("Error in adding or updating AutoSalary:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };