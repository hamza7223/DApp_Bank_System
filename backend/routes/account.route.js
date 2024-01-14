import {
  addAccount,
  getAccountByCustomerID,
  getAllAccounts,
  checkAccountByAccountID,
} from "../controllers/account.controller.js";
import express from "express";

const userRouter = express.Router();

userRouter.post("/add", addAccount);
userRouter.post("/checkAccountNumber", getAccountByCustomerID);
userRouter.post("/get", checkAccountByAccountID);
userRouter.get("/all", getAllAccounts);

export default userRouter;
