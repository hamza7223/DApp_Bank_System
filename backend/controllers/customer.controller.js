import Customer from "../models/customer.model.js";
import Account from "../models/account.model.js";
import Transaction from "../models/transaction.model.js";
import jwt from "jsonwebtoken";

export const getCustomers = (req, res) => {
  Customer.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error" + err));
};

export const addCustomer = (req, res) => {
  const name = req.body.name;
  const gender = req.body.gender;
  const address = req.body.address;
  const date_of_birth = req.body.date_of_birth;
  const username = req.body.username;
  const password = req.body.password;
  const phone_number = req.body.phone_number;
  const cnic_number = req.body.cnic_number;
  const creation_date = req.body.creation_date;

  const newUser = new Customer({
    name,
    gender,
    address,
    date_of_birth,
    username,
    password,
    phone_number,
    cnic_number,
    creation_date,
  });
  console.log(newUser);
  newUser
    .save()
    .then(() => res.json("User added"))
    .catch((err) => res.status(400).json("Error " + err));
};

export const getCustomerByID = (req, res) => {
  Customer.findById(req.params.id)

    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error" + err));
};

export const editCustomer = (req, res) => {
  let customer = req.body;
  const edituser = new Customer(customer);
  Customer.updateOne({ _id: req.params.id }, edituser)
    .then(() => res.json(edituser))
    .catch((err) => res.status(400).json("Error" + err));
};

export const deleteCustomer = (req, res) => {
  Customer.deleteOne({ _id: req.params.id })
    .then(() => res.json("The customer is deleted successfully"))
    .catch((err) => res.status(400).json("Error" + err));
};

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    const transactionData = await Promise.all(
      transactions.map(async (transaction) => {
        const account = await Account.findById(transaction.account);
        if (!account) {
          return null;
        }
        const customer = await Customer.findById(account.customer);
        if (!customer) {
          return null;
        }
        const transactionDetails = {
          username: customer.username,
          accountNumber: account.account_number,
          accountType: account.account_type,
          amount: transaction.amount,
          type: transaction.type,
          date: transaction.date,
        };
        return transactionDetails;
      })
    );
    const validTransactions = transactionData.filter(
      (transaction) => transaction !== null
    );
    res.json(validTransactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export async function signin(req, res) {
  let { username, password } = req.body;
  Customer.findOne({ username: username })
    .then((founduser) => {
      if (!founduser) {
        res.status(404).send({ Messege: "User does not exist" });
        console.log(res.status);
      } else {
        if ((password == founduser.password)) {
          let token = jwt.sign(
            {
              id: founduser._id,
              address: founduser.address,
            },
            process.env.SECRET_KEY,
            { expiresIn: "21h" }
          );
          res.status(200).send({ user: founduser, token: token });
        } else {
          res.status(400).send({ Messege: "Password not match" });
        }
      }
    })
    .catch((e) => {
      res.status(500).send({ e: e });
    });
}
