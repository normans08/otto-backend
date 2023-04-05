import express from "express";
import { transcribe, transcribeGpt } from "../controllers/transcribe.js";
const router = express.Router();

router.post("/transcribe", (req, res) => {
  transcribe(req, res);
});
router.post("/gpt", (req, res) => {
  transcribeGpt(req, res);
});
export default router;
