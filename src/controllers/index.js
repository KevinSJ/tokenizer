import express from 'express';

import tokenizeController from './tokenize.js';
import detokenizeController from './detokenize.js';

const router = express.Router();

router.use('/tokenize', tokenizeController);
router.use('/detokenize', detokenizeController);

export default router;
