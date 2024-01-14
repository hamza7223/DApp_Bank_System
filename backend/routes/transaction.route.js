import express from "express";
import {
  getAllTransactions,
  Withdraw,
  Deposit,
} from "../controllers/transaction.controller.js";

const userRouter = express.Router();

userRouter.post("/deposit", Deposit);
userRouter.post("/withdraw", Withdraw);
userRouter.post("/all", getAllTransactions);

export default userRouter;
