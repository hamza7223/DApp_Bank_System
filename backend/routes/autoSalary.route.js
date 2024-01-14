import express from "express";

import {
  getAutoSalaryByAccountId,
  addAutoSalary,
} from "../controllers/autoSalary.controller.js";

const router = express.Router();

router.post("/accountNo", getAutoSalaryByAccountId);
router.post("/add", addAutoSalary);

export default router;
