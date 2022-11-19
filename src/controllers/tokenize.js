import express from 'express';
import { validateBody } from '../middlewares/validator.js';
import tokenStorage from '../repositories/tokenStorage.js';

const router = express.Router();

router.post('/', validateBody, (req, res) => {
  const pans = req.body;

  // Assumption: tokens are reuseable, no need to generate new tokens
  // if they are already in the storage
  const tokens = tokenStorage.generateTokensFor(pans);

  return res.send(tokens);
});

export default router;
