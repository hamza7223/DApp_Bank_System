import express from "express";

import {
  getManagers,
  signin,
  signup,
} from "../controllers/manager.controller.js";

const router = express.Router();

router.get("/all", getManagers);
router.post("/signin", signin);
router.post("/signup", signup);

export default router;
