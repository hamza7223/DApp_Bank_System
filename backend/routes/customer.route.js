import express from "express";

import {
  addCustomer,
  getCustomerByID,
  getCustomers,
  editCustomer,
  deleteCustomer,
  getAllTransactions,
  signin,
} from "../controllers/customer.controller.js";

const router = express.Router();

router.post("/add", addCustomer);
router.get("/all", getCustomers);
router.get("/transactions/all", getAllTransactions);
router.get("/:id", getCustomerByID);
router.put("/:id", editCustomer);
router.delete("/:id", deleteCustomer);
router.post("/signin", signin);

export default router;
