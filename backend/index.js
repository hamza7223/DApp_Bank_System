import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoConnection from "./connection/db.js";
import customerRouter from "./routes/customer.route.js";
import managerRouter from "./routes/manager.route.js";
import accountRouter from "./routes/account.route.js";
import transactionRouter from "./routes/transaction.route.js";
import autoSalaryRouter from "./routes/autoSalary.route.js";

dotenv.config();

const app = express();
const port = 3003;

//Use for running both frontend and backend at the same time
app.use(cors());
app.use(bodyParser.json());
// Adding a Router
app.use("/managers", managerRouter);
app.use("/customers", customerRouter);
app.use("/customer/account", accountRouter);
app.use("/customer/account/transaction", transactionRouter);
app.use("/customer/account/autoSalary", autoSalaryRouter);

//Connection to Mongo Db database
mongoConnection();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
