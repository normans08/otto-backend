import express from "express";
import { transcribe } from "../controllers/transcribe.js";
const router = express.Router();

router.post("/transcribe", (req, res) => {
  transcribe(req, res);
});

export default router;
