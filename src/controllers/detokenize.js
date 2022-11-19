import express from 'express';
import { validateBody } from '../middlewares/validator.js';
import tokenStorage from '../repositories/tokenStorage.js';

const router = express.Router();

router.post('/', validateBody, (req, res) => {
  const tokens = req.body;
  const pans = tokenStorage.getPanBy(tokens);

  return res.send(pans);
});

export default router;
