import express from "express";
import { validateBody } from "../middlewares/validator.js";
import tokenRepository from "../repositories/tokenRepository.js";

const router = express.Router();

router.post("/", validateBody, (req, res) => {
  const tokens = req.body;
  const pans = tokenRepository.getPanBy(tokens);

  return res.send(pans);
});

export default router;
